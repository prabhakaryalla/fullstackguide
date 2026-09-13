# First and Last Order Date of Each Customer

## Example

### Input: `customers`

| customer_id | customer_name |
|---|---|
| 1 | Alice |
| 2 | Ben |

### Input: `orders`

| order_id | customer_id | order_date |
|---|---|---|
| 100 | 1 | 2025-01-05 |
| 101 | 1 | 2025-03-15 |

### Expected Output

Ben has no orders, so both date columns are `NULL` rather than the row being dropped.

| customer_id | customer_name | first_order_date | last_order_date |
|---|---|---|---|
| 1 | Alice | 2025-01-05 | 2025-03-15 |
| 2 | Ben | NULL | NULL |

## Solution

`MIN` and `MAX` provide the first and most recent order dates in one grouped query.

```sql
SELECT c.customer_id, c.customer_name,
       MIN(o.order_date) AS first_order_date,
       MAX(o.order_date) AS last_order_date
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.customer_id
GROUP BY c.customer_id, c.customer_name;
```

## Tricky Interview Question

**Q: What does a `NULL` last order date mean?**

**A:** It means the customer has no matching order. The left join keeps customers with no order history.