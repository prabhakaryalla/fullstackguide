# 3214. Year on Year Growth Rate

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
A table records user purchase transactions, each associated with a product, a spend amount, and a transaction date. For each product and year, compute the total spend for that year, the total spend for the previous year (if any), and the year-over-year growth rate as a percentage.

### Schema
```sql
Create table If Not Exists user_transactions (transaction_id int, product_id int, spend decimal(10,2), transaction_date date)
```

## Approach
First, aggregate total spend per product per year. Then, self-join this yearly aggregation table against itself, matching each row (representing the "current" year) to the row representing the immediately preceding year for the same product (using a left join, so products/years without prior-year data still appear with a null previous spend). Compute the year-over-year growth rate as the percentage change between current and previous year spend, rounded to 2 decimal places.

## SQL Solution
```sql
WITH
  YearlySpends AS (
    SELECT
      product_id,
      YEAR(transaction_date) AS year,
      SUM(spend) AS spend
    FROM user_transactions
    GROUP BY product_id, YEAR(transaction_date)
  )
SELECT
  CurrYear.year,
  CurrYear.product_id,
  CurrYear.spend AS curr_year_spend,
  PrevYear.spend AS prev_year_spend,
  ROUND(100 * (CurrYear.spend - PrevYear.spend) / PrevYear.spend, 2) AS yoy_rate
FROM YearlySpends AS CurrYear
LEFT JOIN YearlySpends AS PrevYear
  ON CurrYear.product_id = PrevYear.product_id
  AND CurrYear.year - 1 = PrevYear.year
ORDER BY product_id, year;
```

## Complexity
- Time: O(n log n) due to grouping and self-join
- Space: O(n)
