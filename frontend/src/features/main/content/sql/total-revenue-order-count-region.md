# Get Total Revenue and Order Count per Region

## Example

### Input: `customers`

| customer_id | customer_name | region |
|---|---|---|
| 1 | Alice | East |
| 2 | Ben | West |
| 3 | Carla | East |

### Input: `orders`

| order_id | customer_id | total_amount |
|---|---|---|
| 100 | 1 | 50.00 |
| 101 | 2 | 75.00 |
| 102 | 3 | 25.00 |

### Expected Output

| region | order_count | total_revenue |
|---|---|---|
| East | 2 | 75.00 |
| West | 1 | 75.00 |

## Solution

Group order facts by the customer region.

```sql
SELECT c.region,
       COUNT(o.order_id) AS order_count,
       COALESCE(SUM(o.total_amount), 0) AS total_revenue
FROM customers AS c
JOIN orders AS o ON o.customer_id = c.customer_id
GROUP BY c.region
ORDER BY total_revenue DESC;
```

## Tricky Interview Question

**Q: Why use `COUNT(o.order_id)` rather than `COUNT(*)`?**

**A:** Counting the order ID counts orders, while `COUNT(*)` can count joined customer rows even when no order exists.