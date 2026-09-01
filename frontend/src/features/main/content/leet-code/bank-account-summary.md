# 1555. Bank Account Summary

**Difficulty:** Medium
**Category:** Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a table `Users(user_id, user_name, credit)` and a table `Transactions(trans_id, paid_by, paid_to, amount, transacted_on)`, compute each user's final credit balance after all transactions, and report the user's name, current credit, and whether the balance has dropped below `0` (`"Yes"`/`"No"`) as `credit_limit_breached`.

### Example

```
Input: Users: (1, "Moustafa", 100), Transactions: (1, 1, 2, 50, ...), (2, 2, 1, 100, ...)
Output: (1, "Moustafa", 150, "No")
```

## Approach

This is a SQL problem (no C# solution applies). Sum all amounts paid to each user and subtract all amounts paid by each user, add that net to the user's starting `credit`, and flag the result as breaching the limit if it falls below `0`.

```sql
SELECT
    u.user_id,
    u.user_name,
    u.credit
        + IFNULL((SELECT SUM(amount) FROM Transactions WHERE paid_to = u.user_id), 0)
        - IFNULL((SELECT SUM(amount) FROM Transactions WHERE paid_by = u.user_id), 0) AS credit,
    CASE
        WHEN u.credit
            + IFNULL((SELECT SUM(amount) FROM Transactions WHERE paid_to = u.user_id), 0)
            - IFNULL((SELECT SUM(amount) FROM Transactions WHERE paid_by = u.user_id), 0) < 0
        THEN 'Yes' ELSE 'No'
    END AS credit_limit_breached
FROM Users u;
```

## Complexity

- **Time:** `O(n * m)` — a correlated subquery scan of `Transactions` per user in the naive form (or `O(n + m)` with pre-aggregated joins).
- **Space:** `O(n)` for the per-user result set.
