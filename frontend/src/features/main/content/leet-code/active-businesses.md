# 1126. Active Businesses

**Difficulty:** Medium
**Category:** SQL, Database

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given an `Events` table (`business_id`, `event_type`, `occurences`), a business is "active" if it has at least two event types whose `occurences` value exceeds the average `occurences` for that event type across all businesses. Return the IDs of all active businesses.

### Schema

```
Events: business_id, event_type, occurences
```

## Approach

For each row, compare its `occurences` value against the average `occurences` for the same `event_type` (computed with a correlated subquery). Keep only rows that exceed their event type's average, then group by `business_id` and require at least two qualifying event types.

## SQL Solution

```sql
SELECT business_id
FROM Events e
WHERE occurences > (
    SELECT AVG(occurences)
    FROM Events e2
    WHERE e2.event_type = e.event_type
)
GROUP BY business_id
HAVING COUNT(event_type) >= 2;
```

## Complexity

- **Time:** `O(n^2)` in the naive correlated-subquery form (or `O(n log n)` with a precomputed per-`event_type` average join).
- **Space:** `O(n)` for intermediate aggregates.
