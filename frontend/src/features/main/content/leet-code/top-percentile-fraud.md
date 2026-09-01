# 3055. Top Percentile Fraud

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a solution to find, within each `state`, the policies whose `fraud_score` places them in the top 5% for that state (i.e., no more than 5% of the state's policies have a strictly higher score). Return the results ordered by state ascending, fraud score descending, then policy id ascending.

### Schema

```sql
Create table If Not Exists Fraud (policy_id int, state varchar(2), fraud_score int)
```

`Fraud` has one row per insurance policy with its `state` and `fraud_score`.

## Approach

Use the window function `PERCENT_RANK()` partitioned by `state` and ordered by `fraud_score` descending. This assigns each row a rank in `[0, 1]` representing the fraction of rows in that partition scoring strictly higher. Keep only rows whose percent rank is below `0.05` (the top 5%).

## SQL Solution

```sql
WITH FraudPercentile AS (
  SELECT
    policy_id,
    state,
    fraud_score,
    PERCENT_RANK() OVER (
      PARTITION BY state
      ORDER BY fraud_score DESC
    ) AS pct_rank
  FROM Fraud
)
SELECT policy_id, state, fraud_score
FROM FraudPercentile
WHERE pct_rank < 0.05
ORDER BY state, fraud_score DESC, policy_id;
```

## Complexity

- Time: O(n log n) for the windowed sort within each state partition.
- Space: O(n) for the intermediate ranked rows.
