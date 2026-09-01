# 1204. Last Person to Fit in the Bus

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Queue` table (`person_id`, `person_name`, `weight`, `turn`) describing people boarding a bus in `turn` order, and a bus weight limit of `1000`, return the name of the last person who can board without the cumulative weight exceeding the limit.

### Schema

```
Queue: person_id (PK), person_name, weight, turn
```

## Approach

Compute a running total of `weight` ordered by `turn` using a window `SUM`. Only rows whose running total is at most `1000` represent people who actually make it onto the bus, so filter to those rows and take the one with the largest running total (equivalently, the largest `turn`) — that person is the last to fit.

## SQL Solution

```sql
SELECT person_name
FROM (
    SELECT person_name,
           SUM(weight) OVER (ORDER BY turn) AS running_weight
    FROM Queue
) AS boarding
WHERE running_weight <= 1000
ORDER BY running_weight DESC
LIMIT 1;
```

## Complexity

- **Time:** `O(n log n)` for the sort backing the window function and final ordering.
- **Space:** `O(n)` for the computed running totals.
