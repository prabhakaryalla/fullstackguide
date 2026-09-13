# Find the Moving Average of Sales over 2 Days

## Example

### Input: `orders`

| order_id | order_date | total_amount |
|---|---|---|
| 100 | 2025-06-01 | 100.00 |
| 101 | 2025-06-02 | 150.00 |
| 102 | 2025-06-02 | 50.00 |
| 103 | 2025-06-03 | 200.00 |

### Expected Output

Daily revenue is 100.00, 200.00, and 200.00 for June 1-3. Each row's moving average includes the current day and the one before it.

| sales_day | daily_revenue | two_day_moving_average |
|---|---|---|
| 2025-06-01 | 100.00 | 100.00 |
| 2025-06-02 | 200.00 | 150.00 |
| 2025-06-03 | 200.00 | 200.00 |

## Solution

First aggregate sales per day; then average the current and previous day. The date conversion syntax differs by database.

### SQL Server

```sql
WITH daily_sales AS (
  SELECT CAST(order_date AS date) AS sales_day, SUM(total_amount) AS daily_revenue
  FROM orders
  GROUP BY CAST(order_date AS date)
)
SELECT sales_day, daily_revenue,
       AVG(daily_revenue) OVER (
         ORDER BY sales_day ROWS BETWEEN 1 PRECEDING AND CURRENT ROW
       ) AS two_day_moving_average
FROM daily_sales
ORDER BY sales_day;
```

### PostgreSQL

```sql
WITH daily_sales AS (
  SELECT order_date::date AS sales_day, SUM(total_amount) AS daily_revenue
  FROM orders
  GROUP BY order_date::date
)
SELECT sales_day, daily_revenue,
       AVG(daily_revenue) OVER (
         ORDER BY sales_day ROWS BETWEEN 1 PRECEDING AND CURRENT ROW
       ) AS two_day_moving_average
FROM daily_sales
ORDER BY sales_day;
```

`ROWS` averages the two previous rows, so missing calendar days are not treated as zero-sales days.

## Tricky Interview Question

**Q: Does this always represent two calendar days?**

**A:** No. `ROWS` uses the previous result row. If a calendar day has no sales, it is skipped unless you first create a calendar table.