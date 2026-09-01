# 1747. Leetflex Banned Accounts

**Difficulty:** Medium
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `LogInfo` table (`account_id`, `ip_address`, `login`, `logout`), find every account that was logged in from two different IP addresses at overlapping times (i.e. logged in from more than one machine at once).

### Schema

```
LogInfo: account_id, ip_address, login, logout
```

## Approach

Self-join `LogInfo` on matching `account_id` with a different `ip_address`, then keep pairs whose `[login, logout]` intervals overlap (`l1.login < l2.logout AND l1.logout > l2.login`).

## SQL Solution

```sql
SELECT DISTINCT l1.account_id
FROM LogInfo l1
JOIN LogInfo l2
    ON l1.account_id = l2.account_id
   AND l1.ip_address != l2.ip_address
WHERE l1.login < l2.logout AND l1.logout > l2.login;
```

## Complexity

- **Time:** `O(n^2)` for the self-join in the worst case.
- **Space:** `O(n)`.
