# Get Total Sales and Order Count per Customer

## Example

### Input: `customers`

| customer_id | customer_name |
|---|---|
| 1 | Alice |
| 2 | Ben |

### Input: `orders`

| order_id | customer_id | total_amount |
|---|---|---|
| 100 | 1 | 50.00 |
| 101 | 1 | 30.00 |

### Expected Output

Ben has no orders, so his count is 0 and his total is 0 rather than missing entirely.

| customer_id | customer_name | order_count | total_sales |
|---|---|---|---|
| 1 | Alice | 2 | 80.00 |
| 2 | Ben | 0 | 0.00 |

## Solution

Aggregate orders after joining customers so customers with no orders remain visible.

```sql
SELECT c.customer_id, c.customer_name,
       COUNT(o.order_id) AS order_count,
       COALESCE(SUM(o.total_amount), 0) AS total_sales
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.customer_id
GROUP BY c.customer_id, c.customer_name;
```

## Tricky Interview Question

**Q: Why use `COUNT(o.order_id)` instead of `COUNT(*)`?**

**A:** With a left join, `COUNT(*)` counts the customer row even when no order exists. The nullable order ID counts only real orders.