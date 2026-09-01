# 197. Rising Temperature

**Difficulty:** Easy
**Category:** SQL, Database

## Problem

Given a `Weather` table (`id`, `recordDate`, `temperature`), find all dates whose temperature was higher than the temperature on the previous calendar day.

### Schema

```
Weather: id (PK), recordDate (date), temperature
```

## Approach

Self-join the table to itself where one copy's date is exactly one day after the other's (`DATEDIFF` or equivalent date-difference function equal to 1), then filter for rows where the later date's temperature exceeds the earlier date's.

## SQL Solution

```sql
SELECT w1.id AS Id
FROM Weather w1
JOIN Weather w2 ON DATEDIFF(w1.recordDate, w2.recordDate) = 1
WHERE w1.temperature > w2.temperature;
```

## Complexity

- **Time:** `O(n)` with an index on `recordDate`, where `n` is the row count.
- **Space:** `O(n)` worst case for the result set.
