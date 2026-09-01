# 3564. Seasonal Sales Analysis

**Difficulty:** Medium
**Category:** Database

## Problem
Table `sales` has columns `sale_id`, `product_id`, `sale_date`, `quantity`, `price`.

Table `products` has columns `product_id`, `product_name`, `category`.

Write a solution to find the most popular product category for each season. The seasons are defined as:
- Winter: December, January, February
- Spring: March, April, May
- Summer: June, July, August
- Fall: September, October, November

The popularity of a category is determined by the total quantity sold in that season. If there is a tie, select the category with the highest total revenue (`quantity × price`). If there is still a tie, return the lexicographically smaller category.

Return the result table ordered by `season` in ascending order.

### Example

```
Output:
| season  | category | total_quantity | total_revenue |
| Fall    | Apparel  | 10              | 120.00        |
| Spring  | Kitchen  | 3               | 54.00         |
| Summer  | Tech     | 5               | 100.00        |
| Winter  | Apparel  | 9               | 110.00        |
```

## Approach
Join `sales` with `products` on `product_id`, derive the season from the month of `sale_date` using a `CASE` expression, and group by `(season, category)` to get total quantity and total revenue per group. Then use `ROW_NUMBER()` partitioned by `season` and ordered by `total_quantity DESC, total_revenue DESC, category ASC` to pick the top category per season.

## SQL Solution

```sql
WITH SeasonalData AS (
    SELECT
        CASE 
            WHEN MONTH(s.sale_date) IN (12, 1, 2) THEN 'Winter'
            WHEN MONTH(s.sale_date) IN (3, 4, 5) THEN 'Spring'
            WHEN MONTH(s.sale_date) IN (6, 7, 8) THEN 'Summer'
            ELSE 'Fall'
        END AS season,
        p.category,
        SUM(s.quantity) AS total_quantity,
        SUM(s.quantity * s.price) AS total_revenue
    FROM sales s
    JOIN products p ON s.product_id = p.product_id
    GROUP BY season, p.category
),
Ranked AS (
    SELECT *,
        ROW_NUMBER() OVER (
            PARTITION BY season
            ORDER BY total_quantity DESC, total_revenue DESC, category ASC
        ) AS rn
    FROM SeasonalData
)
SELECT season, category, total_quantity, total_revenue
FROM Ranked
WHERE rn = 1
ORDER BY season ASC;
```

## Complexity

- **Time:** O(n log n), dominated by the grouping and window function sort.
- **Space:** O(n), for the intermediate grouped rows.
