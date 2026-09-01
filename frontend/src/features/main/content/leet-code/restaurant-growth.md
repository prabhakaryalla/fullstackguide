# 1321. Restaurant Growth

**Difficulty:** Medium
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Customer` table (`customer_id`, `name`, `visited_on`, `amount`), write a query that reports, for every date starting from the 7th recorded day, the total `amount` and the average daily `amount` (rounded to two decimals) over that date's trailing 7-day window.

### Schema

```
Customer: customer_id, name, visited_on, amount
```

## Approach

First collapse the table to one row per calendar day with the day's total spend. Then, for each day at or after the 7th distinct day on record, join that day against every day within the trailing 6-day window and sum the totals to get the 7-day rolling `amount`, dividing by 7 for the average.

## SQL Solution

```sql
WITH daily AS (
    SELECT visited_on, SUM(amount) AS day_amount
    FROM Customer
    GROUP BY visited_on
)
SELECT d1.visited_on,
       SUM(d2.day_amount) AS amount,
       ROUND(SUM(d2.day_amount) / 7, 2) AS average_amount
FROM daily d1
JOIN daily d2
    ON d2.visited_on BETWEEN DATE_SUB(d1.visited_on, INTERVAL 6 DAY) AND d1.visited_on
WHERE d1.visited_on >= (SELECT DATE_ADD(MIN(visited_on), INTERVAL 6 DAY) FROM daily)
GROUP BY d1.visited_on
ORDER BY d1.visited_on;
```

## Complexity

- **Time:** `O(d^2)` where `d` is the number of distinct days.
- **Space:** `O(d)` for the daily aggregate.
