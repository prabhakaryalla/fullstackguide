# 1613. Find the Missing IDs

**Difficulty:** Medium
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Customers` table with possibly non-contiguous `customer_id` values, return every id between `1` and `MAX(customer_id)` that is missing, ordered by id descending.

### Schema

```
Customers: customer_id (PK), customer_name
```

## Approach

Generate the full sequence of integers from `1` to `MAX(customer_id)` using a recursive CTE, then select the ones that do not appear in `Customers`.

## SQL Solution

```sql
WITH RECURSIVE seq AS (
    SELECT 1 AS ids
    UNION ALL
    SELECT ids + 1
    FROM seq
    WHERE ids < (SELECT MAX(customer_id) FROM Customers)
)
SELECT ids
FROM seq
WHERE ids NOT IN (SELECT customer_id FROM Customers)
ORDER BY ids DESC;
```

## Complexity

- **Time:** `O(m)`, where `m` is the maximum customer id.
- **Space:** `O(m)` for the generated sequence.
