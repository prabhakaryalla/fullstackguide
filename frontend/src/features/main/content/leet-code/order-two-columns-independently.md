# 2159. Order Two Columns Independently

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Sort two columns of a table independently - one in ascending order and one in descending order, then combine them while preserving the row structure.

### Schema

```sql
Data table:
| first_col | second_col |
```

## Approach

Use window functions with ROW_NUMBER() to assign row numbers to each column after sorting independently. Then join the two sorted sequences back together on the row numbers.

## SQL Solution

```sql
WITH FirstSorted AS (
    SELECT 
        first_col,
        ROW_NUMBER() OVER (ORDER BY first_col ASC) AS rn
    FROM Data
),
SecondSorted AS (
    SELECT 
        second_col,
        ROW_NUMBER() OVER (ORDER BY second_col DESC) AS rn
    FROM Data
)
SELECT 
    f.first_col,
    s.second_col
FROM FirstSorted f
JOIN SecondSorted s ON f.rn = s.rn
ORDER BY f.rn;
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(n) for intermediate results
