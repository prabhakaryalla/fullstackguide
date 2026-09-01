# 2720. Popularity Percentage

**Difficulty:** Easy
**Category:** Database, SQL
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

### Schema

```
Table: Friends
+-------------+------+
| Column Name | Type |
+-------------+------+
| user1_id    | int  |
| user2_id    | int  |
+-------------+------+
(user1_id, user2_id) is the primary key. Each row indicates an unordered friendship
between user1_id and user2_id, stored only once per pair.
```

Write a solution to compute the **popularity percentage** for every user who appears in the table: the number of friends that user has, divided by the total number of *other* users, expressed as a percentage rounded to 2 decimal places. Return `user_id` and `popularity_percentage`, ordered ascending by `user_id`.

## Approach

Since each friendship is stored only once (as an unordered pair), first build a symmetric list of `(user_id, friend_id)` rows by unioning the table with itself in both directions. Counting distinct `friend_id`s per `user_id` gives each user's friend count. The total number of distinct users across the whole table gives the denominator (`total_users - 1`, excluding the user themselves). Combining these produces the rounded percentage per user.

## SQL Solution

```sql
WITH all_users AS (
  SELECT user1_id AS user_id FROM Friends
  UNION
  SELECT user2_id AS user_id FROM Friends
),
friend_pairs AS (
  SELECT user1_id AS user_id, user2_id AS friend_id FROM Friends
  UNION ALL
  SELECT user2_id AS user_id, user1_id AS friend_id FROM Friends
),
friend_counts AS (
  SELECT user_id, COUNT(DISTINCT friend_id) AS friend_count
  FROM friend_pairs
  GROUP BY user_id
),
total AS (
  SELECT COUNT(*) AS total_users FROM all_users
)
SELECT
  u.user_id,
  ROUND(fc.friend_count * 100.0 / (t.total_users - 1), 2) AS popularity_percentage
FROM all_users u
JOIN friend_counts fc ON fc.user_id = u.user_id
CROSS JOIN total t
ORDER BY u.user_id;
```

## Complexity

- **Time:** O(n log n) for the grouping/sorting operations over n friendship rows.
- **Space:** O(n) for the intermediate CTE results.
