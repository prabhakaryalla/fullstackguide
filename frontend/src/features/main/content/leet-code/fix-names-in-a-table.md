# 1667. Fix Names in a Table

**Difficulty:** Easy
**Category:** SQL, Database

## Problem

Given a `Users` table (`user_id`, `name`) with inconsistently capitalized names, return each user's name with only the first letter capitalized and every other letter lowercased, ordered by `user_id`.

### Schema

```
Users: user_id (PK), name
```

## Approach

Combine the uppercased first character with the lowercased remainder of the string using `LEFT`/`SUBSTRING` and `UPPER`/`LOWER`, then order the result by `user_id`.

## SQL Solution

```sql
SELECT
    user_id,
    CONCAT(UPPER(LEFT(name, 1)), LOWER(SUBSTRING(name, 2))) AS name
FROM Users
ORDER BY user_id;
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of users.
- **Space:** `O(n)` for the result set.
