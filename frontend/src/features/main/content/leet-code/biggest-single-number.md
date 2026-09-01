# 619. Biggest Single Number

**Difficulty:** Easy
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `MyNumbers` table (`num`), write a query to report the largest value that occurs exactly once in the table. Report `null` if no such value exists.

### Schema

```
MyNumbers: num
```

## Approach

Group all values and filter to those occurring exactly once (`COUNT(*) = 1`). Taking the maximum of that filtered set gives the largest single-occurrence value; if the filtered set is empty, `MAX` naturally returns `NULL`.

## SQL Solution

```sql
SELECT MAX(num) AS num
FROM (
    SELECT num
    FROM MyNumbers
    GROUP BY num
    HAVING COUNT(*) = 1
) AS singles;
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the grouped intermediate result.
