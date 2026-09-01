# 1699. Number of Calls Between Two Persons

**Difficulty:** Medium
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Calls` table (`from_id`, `to_id`, `duration`) where each row is a call between two people, report for every unordered pair of people who called each other the total number of calls and the total call duration between them.

### Schema

```
Calls: from_id, to_id, duration
```

## Approach

Since a call from A to B and a call from B to A represent the same unordered pair, normalize each row using `LEAST`/`GREATEST` on the two participant ids before grouping, then count the rows and sum the durations per normalized pair.

## SQL Solution

```sql
SELECT
    LEAST(from_id, to_id) AS person1,
    GREATEST(from_id, to_id) AS person2,
    COUNT(*) AS call_count,
    SUM(duration) AS total_duration
FROM Calls
GROUP BY LEAST(from_id, to_id), GREATEST(from_id, to_id);
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of calls.
- **Space:** `O(n)` for the grouped result.
