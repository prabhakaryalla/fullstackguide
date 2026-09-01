# 2020. Number of Accounts That Did Not Stream

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Table `Subscriptions(account_id, start_date, end_date)` records subscription periods, and `Streams(session_id, account_id, stream_date)` records streaming sessions. Count the number of accounts that had an active subscription at some point during 2021 but did not stream in 2021.

### Schema

```
Subscriptions: account_id, start_date, end_date
Streams: session_id (PK), account_id, stream_date
```

## Approach

Join `Subscriptions` to `Streams` on `account_id`. Filter to subscriptions whose active period overlaps 2021 (`2021 BETWEEN YEAR(start_date) AND YEAR(end_date)`) and where the matched stream row's year is not 2021 (or is absent, since it's a `LEFT JOIN`). Count the resulting rows.

## SQL Solution

```sql
SELECT COUNT(Subscriptions.account_id) AS accounts_count
FROM Subscriptions
LEFT JOIN Streams
    ON Subscriptions.account_id = Streams.account_id
WHERE
    2021 BETWEEN YEAR(Subscriptions.start_date) AND YEAR(Subscriptions.end_date)
    AND (Streams.stream_date IS NULL OR YEAR(Streams.stream_date) != 2021);
```

## Complexity

- **Time:** O(n + m) for the join
- **Space:** O(n + m)
