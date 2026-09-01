# 3580. Find Consistently Improving Employees

**Difficulty:** Medium
**Category:** Database

## Problem
Table `employees` has columns `employee_id`, `name`.

Table `performance_reviews` has columns `review_id`, `employee_id`, `review_date`, `rating` (1-5 scale).

Write a solution to find employees who have consistently improved their performance over their last three reviews:
- An employee must have at least 3 reviews to be considered.
- The employee's last 3 reviews (by `review_date`) must show strictly increasing ratings.
- Calculate the improvement score as the difference between the latest rating and the earliest rating among the last 3 reviews.

Return the result table ordered by improvement score descending, then by name ascending.

### Example

```
Output:
| employee_id | name          | improvement_score |
| 2           | Bob Smith     | 3                 |
| 1           | Alice Johnson | 2                 |
| 3           | Carol Davis   | 2                 |
```

## Approach
For each employee, rank their reviews by `review_date` descending using `ROW_NUMBER()`. Pivot the top 3 ranked reviews into columns (latest, second, third) via conditional aggregation, along with the total review count. Filter to employees with at least 3 reviews and strictly increasing ratings from oldest to newest among the top 3 (`third < second < latest`), then compute the improvement score as `latest - third`.

## SQL Solution

```sql
WITH RankedReviews AS (
    SELECT 
        employee_id,
        rating,
        ROW_NUMBER() OVER (PARTITION BY employee_id ORDER BY review_date DESC) AS rn,
        COUNT(*) OVER (PARTITION BY employee_id) AS total_reviews
    FROM performance_reviews
),
LastThree AS (
    SELECT
        employee_id,
        MAX(CASE WHEN rn = 1 THEN rating END) AS latest_rating,
        MAX(CASE WHEN rn = 2 THEN rating END) AS second_rating,
        MAX(CASE WHEN rn = 3 THEN rating END) AS third_rating,
        MAX(total_reviews) AS total_reviews
    FROM RankedReviews
    WHERE rn <= 3
    GROUP BY employee_id
)
SELECT 
    e.employee_id,
    e.name,
    (lt.latest_rating - lt.third_rating) AS improvement_score
FROM LastThree lt
JOIN employees e ON e.employee_id = lt.employee_id
WHERE lt.total_reviews >= 3
  AND lt.latest_rating > lt.second_rating
  AND lt.second_rating > lt.third_rating
ORDER BY improvement_score DESC, e.name ASC;
```

## Complexity

- **Time:** O(n log n), for the window function ranking and final sort.
- **Space:** O(n), for the intermediate ranked and pivoted rows.
