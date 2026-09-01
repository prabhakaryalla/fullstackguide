# 1336. Number of Transactions per Visit

**Difficulty:** Hard
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given `Visits` (`user_id`, `visit_date`) and `Transactions` (`user_id`, `transaction_date`, `amount`), write a query that reports, for every whole number `transactions_count` from `1` up to the maximum number of transactions recorded during any single visit, how many visits had exactly that many transactions on their visit date (`0` if none did).

### Schema

```
Visits: user_id, visit_date
Transactions: user_id, transaction_date, amount
```

## Approach

For each visit, count how many transactions share that user and date. Generate every whole number from `1` to the observed maximum transaction count with a recursive sequence, then left-join it against the per-visit counts and group by the generated number so counts that never occur naturally show up as `0`.

## SQL Solution

```sql
WITH RECURSIVE visit_counts AS (
    SELECT v.user_id, v.visit_date, COUNT(t.transaction_date) AS cnt
    FROM Visits v
    LEFT JOIN Transactions t
        ON v.user_id = t.user_id AND v.visit_date = t.transaction_date
    GROUP BY v.user_id, v.visit_date
),
seq(n) AS (
    SELECT 1
    UNION ALL
    SELECT n + 1 FROM seq WHERE n < (SELECT MAX(cnt) FROM visit_counts)
)
SELECT seq.n AS transactions_count,
       COUNT(visit_counts.cnt) AS visits_count
FROM seq
LEFT JOIN visit_counts ON visit_counts.cnt = seq.n
GROUP BY seq.n
ORDER BY seq.n;
```

## Complexity

- **Time:** `O(n + maxCount)` for the join against the generated sequence.
- **Space:** `O(n + maxCount)`.
