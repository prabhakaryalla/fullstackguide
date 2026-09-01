# 1729. Find Followers Count

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Followers` table (`user_id`, `follower_id`), return the number of followers for each user, ordered by `user_id`.

### Schema

```
Followers: user_id, follower_id
```

## Approach

Group the rows by `user_id` and count the followers in each group, then sort by `user_id`.

## SQL Solution

```sql
SELECT user_id, COUNT(follower_id) AS followers_count
FROM Followers
GROUP BY user_id
ORDER BY user_id;
```

## Complexity

- **Time:** `O(n log n)` for the grouping and sort.
- **Space:** `O(n)`.
