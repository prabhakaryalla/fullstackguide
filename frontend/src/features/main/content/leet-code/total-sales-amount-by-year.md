# 1384. Total Sales Amount by Year

**Difficulty:** Hard
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given `Product` (`product_id`, `product_name`, `average_daily_sales`) and `Sales` (`product_id`, `period_start`, `period_end`), write a query that reports, for every product and every calendar year overlapped by its sale period, the total sales amount for that year (`average_daily_sales` multiplied by the number of overlapping days).

### Schema

```
Product: product_id (PK), product_name, average_daily_sales
Sales: product_id, period_start, period_end
```

## Approach

Generate the sequence of calendar years spanned by all sale periods with a recursive CTE. Join each sale to every year it overlaps, and for each `(sale, year)` pair compute the day count of the intersection between the sale period and that calendar year using `GREATEST`/`LEAST` bounds, then multiply by the product's average daily sales.

## SQL Solution

```sql
WITH RECURSIVE years AS (
    SELECT YEAR(MIN(period_start)) AS yr FROM Sales
    UNION ALL
    SELECT yr + 1 FROM years WHERE yr < (SELECT YEAR(MAX(period_end)) FROM Sales)
)
SELECT p.product_id, p.product_name,
       CAST(y.yr AS CHAR) AS report_year,
       p.average_daily_sales *
       (DATEDIFF(
           LEAST(s.period_end, MAKEDATE(y.yr, 1) + INTERVAL 1 YEAR - INTERVAL 1 DAY),
           GREATEST(s.period_start, MAKEDATE(y.yr, 1))
       ) + 1) AS total_amount
FROM Sales s
JOIN Product p ON s.product_id = p.product_id
JOIN years y ON y.yr BETWEEN YEAR(s.period_start) AND YEAR(s.period_end)
ORDER BY p.product_id, report_year;
```

## Complexity

- **Time:** `O(n * years spanned)`.
- **Space:** `O(n * years spanned)` for the joined result.
