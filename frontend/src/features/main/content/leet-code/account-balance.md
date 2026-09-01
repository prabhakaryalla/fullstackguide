# 2066. Account Balance

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Table `Transactions(account_id, day, type, amount)` where `type` is `'Deposit'` or `'Withdraw'`. For every `(account_id, day)` pair that has at least one transaction, report the account's running balance at the end of that day (deposits add to the balance, withdrawals subtract), ordered by `account_id` then `day`.

### Schema

```
Transactions: account_id, day, type ('Deposit'|'Withdraw'), amount
```

## Approach

Use a signed amount (`+amount` for deposits, `-amount` for withdrawals) and a running window sum ordered by `day` within each account partition to get the cumulative balance as of each day that has a transaction.

## SQL Solution

```sql
SELECT
    account_id,
    day,
    SUM(IF(type = 'Deposit', amount, -amount)) OVER (
        PARTITION BY account_id
        ORDER BY day
    ) AS balance
FROM Transactions
ORDER BY account_id, day;
```

## Complexity

- **Time:** O(n log n) for the window-function sort
- **Space:** O(n)
