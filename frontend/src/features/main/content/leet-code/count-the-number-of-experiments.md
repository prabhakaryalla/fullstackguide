# 1990. Count the Number of Experiments

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

`Table: Experiments(experiment_id, platform, experiment_name)` where `platform` is one of `"Android"`, `"IOS"`, `"Web"` and `experiment_name` is one of `"Reading"`, `"Sports"`, `"Programming"`. Return, for every combination of platform and experiment name (9 combinations total, including those with zero occurrences), the number of matching rows in `Experiments`.

### Example

```
Input: Experiments: (4,"IOS","Programming"), (13,"Android","Sports"), (14,"Android","Reading")
Output: ("Android","Reading",1), ("Android","Sports",1), ("Android","Programming",0), ("IOS","Reading",0), ("IOS","Sports",0), ("IOS","Programming",1), ("Web","Reading",0), ("Web","Sports",0), ("Web","Programming",0)
```

## Approach

Build a fixed cross-product of the 3 platforms and 3 experiment names (via `UNION ALL` derived tables cross-joined), then left join `Experiments` grouped by `(platform, experiment_name)` counts onto that cross-product, so every combination appears with a count (defaulting to `0` when absent).

```sql
WITH Platforms AS (
    SELECT 'Android' AS platform UNION ALL SELECT 'IOS' UNION ALL SELECT 'Web'
),
Names AS (
    SELECT 'Reading' AS experiment_name UNION ALL SELECT 'Sports' UNION ALL SELECT 'Programming'
),
AllCombos AS (
    SELECT p.platform, n.experiment_name FROM Platforms p CROSS JOIN Names n
)
SELECT c.platform, c.experiment_name, COUNT(e.experiment_id) AS num_experiments
FROM AllCombos c
LEFT JOIN Experiments e
  ON e.platform = c.platform AND e.experiment_name = c.experiment_name
GROUP BY c.platform, c.experiment_name;
```

## Complexity

- **Time:** `O(n)` — a single pass to group and count `Experiments` rows against the fixed 9-row cross-product.
- **Space:** `O(1)` beyond the fixed 9-row result set.
