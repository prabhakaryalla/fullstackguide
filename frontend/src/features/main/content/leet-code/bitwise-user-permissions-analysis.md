# 3204. Bitwise User Permissions Analysis

**Difficulty:** Easy
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
A table stores each user's assigned permission set, encoded as an integer bitmask where each bit represents a distinct permission. Compute the permissions that every single user has in common (the bitwise AND across all users) and the permissions that at least one user has (the bitwise OR across all users).

### Schema
```sql
Create table If Not Exists user_permissions (user_id int, permissions int)
```

## Approach
Use the database's built-in bitwise aggregate functions to compute the AND and OR of the `permissions` column across all rows in a single pass: `BIT_AND` accumulates the common bits shared by every user, while `BIT_OR` accumulates the union of bits set by any user.

## SQL Solution
```sql
SELECT
  BIT_AND(permissions) AS common_perms,
  BIT_OR(permissions) AS any_perms
FROM user_permissions;
```

## Complexity
- Time: O(n)
- Space: O(1)
