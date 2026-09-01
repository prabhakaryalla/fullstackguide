# 1633. Percentage of Users Attended a Contest

**Difficulty:** Easy
**Category:** SQL, Database

## Problem

Given `Users` (`user_id`, `user_name`) and `Register` (`contest_id`, `user_id`), report for every contest that had at least one registrant the percentage of all users who registered, rounded to 2 decimal places, ordered by percentage descending then by `contest_id` ascending.

### Schema

```
Users: user_id (PK), user_name
Register: contest_id, user_id (PK is the pair)
```

## Approach

Group registrations by `contest_id`, count registrants per contest, and divide by the total number of users (from a scalar subquery) to get the percentage, rounding to two decimals and ordering as specified.

## SQL Solution

```sql
SELECT
    contest_id,
    ROUND(COUNT(user_id) * 100.0 / (SELECT COUNT(*) FROM Users), 2) AS percentage
FROM Register
GROUP BY contest_id
ORDER BY percentage DESC, contest_id ASC;
```

## Complexity

- **Time:** `O(n + m)`, where `n` is the number of registrations and `m` the number of users.
- **Space:** `O(k)`, where `k` is the number of distinct contests.
