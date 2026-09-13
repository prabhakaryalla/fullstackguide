# Find Orders Placed in the Last 30 Days

## Example

Assume the current date is 2025-06-15.

### Input: `orders`

| order_id | customer_id | order_date | total_amount |
|---|---|---|---|
| 100 | 1 | 2025-06-10 | 50.00 |
| 101 | 2 | 2025-04-01 | 75.00 |
| 102 | 1 | 2025-05-20 | 40.00 |

### Expected Output

Order 101 falls outside the last 30 days (before 2025-05-16) and is excluded.

| order_id | customer_id | order_date | total_amount |
|---|---|---|---|
| 100 | 1 | 2025-06-10 | 50.00 |
| 102 | 1 | 2025-05-20 | 40.00 |

## Solution

The date arithmetic syntax varies by SQL database.

### SQL Server

```sql
SELECT order_id, customer_id, order_date, total_amount
FROM orders
WHERE order_date >= DATEADD(day, -30, CURRENT_TIMESTAMP)
ORDER BY order_date DESC;
```

### PostgreSQL

```sql
SELECT order_id, customer_id, order_date, total_amount
FROM orders
WHERE order_date >= CURRENT_TIMESTAMP - INTERVAL '30 days'
ORDER BY order_date DESC;
```

## Tricky Interview Question

**Q: Why avoid `CAST(order_date AS date)` in the filter?**

**A:** Applying a function to the column can stop an index seek. Compare the timestamp column directly with a calculated boundary instead.