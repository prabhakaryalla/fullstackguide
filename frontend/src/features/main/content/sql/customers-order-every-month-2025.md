# Customers Who Ordered Every Month in 2025

## Example

### Input: `orders` (summarized by month for readability)

| customer_id | months_ordered_in_2025 |
|---|---|
| 1 | Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec |
| 2 | Jan, Feb, Mar |

Customer 1 has at least one order in every one of the 12 months. Customer 2 only ordered in 3 months.

### Expected Output

| customer_id |
|---|
| 1 |

## Solution

Count distinct order months in the year and require all 12 months.

### PostgreSQL

```sql
SELECT customer_id
FROM orders
WHERE order_date >= DATE '2025-01-01'
  AND order_date < DATE '2026-01-01'
GROUP BY customer_id
HAVING COUNT(DISTINCT DATE_TRUNC('month', order_date)) = 12;
```

### SQL Databases Supporting `EXTRACT`

If `DATE_TRUNC` is unavailable, compare the year and month parts and count distinct month numbers:

```sql
SELECT customer_id
FROM orders
WHERE EXTRACT(YEAR FROM order_date) = 2025
GROUP BY customer_id
HAVING COUNT(DISTINCT EXTRACT(MONTH FROM order_date)) = 12;
```

### SQL Server

```sql
SELECT customer_id
FROM orders
WHERE order_date >= '20250101'
  AND order_date < '20260101'
GROUP BY customer_id
HAVING COUNT(DISTINCT MONTH(order_date)) = 12;
```

## Tricky Interview Question

**Q: Why count distinct months instead of counting orders?**

**A:** A customer can place many orders in one month. Distinct month values make sure all 12 different months are represented.