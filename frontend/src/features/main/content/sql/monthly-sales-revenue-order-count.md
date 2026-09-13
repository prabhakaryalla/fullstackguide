# Get Monthly Sales Revenue and Order Count

## Example

### Input: `orders`

| order_id | order_date | total_amount |
|---|---|---|
| 100 | 2025-01-05 | 50.00 |
| 101 | 2025-01-20 | 30.00 |
| 102 | 2025-02-10 | 40.00 |

### Expected Output

| month | order_count | sales_revenue |
|---|---|---|
| 2025-01-01 | 2 | 80.00 |
| 2025-02-01 | 1 | 40.00 |

## Solution

The month-grouping function varies by SQL database.

### SQL Server

```sql
SELECT DATEFROMPARTS(YEAR(order_date), MONTH(order_date), 1) AS month,
       COUNT(*) AS order_count,
       SUM(total_amount) AS sales_revenue
FROM orders
GROUP BY DATEFROMPARTS(YEAR(order_date), MONTH(order_date), 1)
ORDER BY month;
```

### PostgreSQL

Use `DATE_TRUNC` to group by the month while retaining a date-like value.

```sql
SELECT DATE_TRUNC('month', order_date)::date AS month,
       COUNT(*) AS order_count,
       SUM(total_amount) AS sales_revenue
FROM orders
GROUP BY DATE_TRUNC('month', order_date)
ORDER BY month;
```

## Tricky Interview Question

**Q: Why group by a month value instead of only grouping by month number?**

**A:** Month number alone combines January from different years. Include the year or use a complete month value.