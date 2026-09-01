# 1587. Bank Account Summary II

**Difficulty:** Easy
**Category:** Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a table `Users(account, name)` and a table `Transactions(trans_id, account, amount, transacted_on)`, find all users whose total transaction amount exceeds `$10000`, and report their name and total balance.

### Example

```
Input: Users: (900001, "David"), Transactions: (1, 900001, 7000, ...), (2, 900001, 7000, ...)
Output: ("David", 14000)
```

## Approach

This is a SQL problem (no C# solution applies). Join `Users` to `Transactions` on `account`, group by account/name, sum the transaction amounts, and keep only groups whose total exceeds `10000`.

```sql
SELECT u.name, SUM(t.amount) AS balance
FROM Users u
JOIN Transactions t ON u.account = t.account
GROUP BY u.account, u.name
HAVING SUM(t.amount) > 10000;
```

## Complexity

- **Time:** `O(n)` — a single join and group-by pass over the transactions.
- **Space:** `O(n)` for the grouped result set.
