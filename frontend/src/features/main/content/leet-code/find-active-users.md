# 2688. Find Active Users

**Difficulty:** Medium
**Category:** Database, SQL
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

### Schema

```
Table: Sales
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| sale_id       | int     |
| product_id    | int     |
| user_id       | int     |
| spend         | decimal |
| sale_date     | date    |
+---------------+---------+
sale_id is the primary key. Each row records one purchase made by user_id on sale_date.
```

Write a solution to find the users who are **active**: an active user is one who made a purchase within 7 days (inclusive) of another purchase they made on a different, earlier date. Return the result table containing `user_id`, ordered ascending by `user_id`.

## Approach

Self-join the `Sales` table on `user_id` so that for every pair of distinct sales by the same user, we can compare their dates. A user qualifies as active if there exists any pair where the second sale's date is between 1 and 7 days after the first sale's date. Selecting the distinct qualifying `user_id`s (from either side of the join, since the pair is symmetric) gives the final answer.

## SQL Solution

```sql
SELECT DISTINCT s1.user_id
FROM Sales s1
JOIN Sales s2
  ON s1.user_id = s2.user_id
  AND s1.sale_id <> s2.sale_id
  AND DATEDIFF(s2.sale_date, s1.sale_date) BETWEEN 1 AND 7
ORDER BY user_id;
```

## Complexity

- **Time:** O(n^2) in the worst case for the self-join over n sales rows (efficient in practice with an index on `(user_id, sale_date)`).
- **Space:** O(n) for the intermediate joined rows.
