# 614. Second Degree Follower

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `follow` table (`follower`, `followee`), write a query to report every "second degree follower" — a follower who is also followed by at least one other follower — along with the number of distinct people following them.

### Schema

```
follow: follower, followee
```

## Approach

Join the table to itself, matching a person's `follower` role to another row's `followee` role — this identifies people who are themselves being followed by someone. Group by that person and count the distinct followers they have.

## SQL Solution

```sql
SELECT f1.follower, COUNT(DISTINCT f2.follower) AS num
FROM follow f1
JOIN follow f2 ON f1.follower = f2.followee
GROUP BY f1.follower
ORDER BY f1.follower;
```

## Complexity

- **Time:** `O(n^2)` in the worst case for the self-join.
- **Space:** `O(n)` for the grouped intermediate result.
