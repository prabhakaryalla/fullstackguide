# 1843. Suspicious Bank Accounts

**Difficulty:** Medium
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an `Accounts` table (`account_id`, `max_income`) and a `Transactions` table (`transaction_id`, `account_id`, `type`, `amount`, `day`), an account is suspicious if, in two **consecutive** months, its total credited (`type = 'Creditor'`) amount exceeded its `max_income`. Return the distinct suspicious `account_id`s.

### Schema

```
Accounts: account_id, max_income
Transactions: transaction_id, account_id, type, amount, day
```

## Approach

First build an intermediate result of `(account_id, month)` pairs where the account's total credited amount for that month exceeded `max_income`, by grouping credited transactions by account and month and filtering with `HAVING SUM(amount) > max_income`. Then self-join that intermediate result on matching `account_id` where the two months are exactly one apart (`PERIOD_DIFF(...) = 1`), which identifies accounts with two consecutive over-income months; select the distinct account ids from that join.

## SQL Solution

```sql
WITH SuspiciousAccountToMonth AS (
    SELECT
        Transactions.account_id,
        DATE_FORMAT(Transactions.day, '%Y%m') AS month,
        Accounts.max_income
    FROM Transactions
    INNER JOIN Accounts ON Accounts.account_id = Transactions.account_id
    WHERE Transactions.type = 'Creditor'
    GROUP BY Transactions.account_id, month, Accounts.max_income
    HAVING SUM(Transactions.amount) > Accounts.max_income
)
SELECT DISTINCT CurrMonth.account_id
FROM SuspiciousAccountToMonth AS CurrMonth
INNER JOIN SuspiciousAccountToMonth AS NextMonth
    ON CurrMonth.account_id = NextMonth.account_id
WHERE PERIOD_DIFF(NextMonth.month, CurrMonth.month) = 1;
```

## Complexity

- **Time:** `O(t log t)` for the grouping and self-join over transactions `t`.
- **Space:** `O(t)` for the intermediate CTE.
