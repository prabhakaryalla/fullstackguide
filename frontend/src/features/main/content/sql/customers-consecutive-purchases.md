# Retrieve Customers with Consecutive Purchases

## Example

### Input: `orders`

| order_id | customer_id | order_date |
|---|---|---|
| 100 | 1 | 2025-06-01 |
| 101 | 1 | 2025-06-02 |
| 102 | 1 | 2025-06-05 |
| 103 | 2 | 2025-06-01 |

### Expected Output

Customer 1 ordered on both 2025-06-01 and 2025-06-02 (adjacent days). Customer 2 has only one order.

| customer_id |
|---|
| 1 |

## Solution

Use `LAG` to compare each order date with the customer's previous order date. Date arithmetic differs by database.

### SQL Server

```sql
WITH ordered AS (
  SELECT customer_id, CAST(order_date AS date) AS order_day,
         LAG(CAST(order_date AS date)) OVER (
           PARTITION BY customer_id ORDER BY order_date
         ) AS previous_order_day
  FROM orders
)
SELECT DISTINCT customer_id
FROM ordered
WHERE order_day = DATEADD(day, 1, previous_order_day);
```

### PostgreSQL

```sql
WITH ordered AS (
  SELECT customer_id, order_date::date AS order_day,
         LAG(order_date::date) OVER (
           PARTITION BY customer_id ORDER BY order_date
         ) AS previous_order_day
  FROM orders
)
SELECT DISTINCT customer_id
FROM ordered
WHERE order_day = previous_order_day + 1;
```

This finds purchases on adjacent calendar days; adjust the interval for a different definition of consecutive.

## Tricky Interview Question

**Q: Does `LAG` compare orders or calendar days?**

**A:** It compares the previous order for that customer. Missing days are not included, so add a calendar table for a full calendar-day analysis.