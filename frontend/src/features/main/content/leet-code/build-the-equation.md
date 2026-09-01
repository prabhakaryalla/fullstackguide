# 2118. Build the Equation

**Difficulty:** Hard
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a SQL query to build an equation string from terms stored in a table, combining coefficients and powers into a standard polynomial format.

### Schema

```
Table: Terms
+-------------+------+
| Column Name | Type |
+-------------+------+
| power       | int  |
| factor      | int  |
+-------------+------+
power is the primary key.
```

## Approach

Order terms by power descending. Build equation string by concatenating formatted terms with proper signs. Handle edge cases for first term, zero coefficients, and formatting.

## SQL Solution

```sql
SELECT CONCAT(
    GROUP_CONCAT(
        CASE
            WHEN power = 0 THEN CAST(factor AS CHAR)
            WHEN power = 1 THEN CONCAT(factor, 'X')
            ELSE CONCAT(factor, 'X^', power)
        END
        ORDER BY power DESC
        SEPARATOR '+'
    )
) AS equation
FROM Terms
WHERE factor != 0
ORDER BY power DESC;
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(n) for result
