# 3053. Classifying Triangles by Lengths

**Difficulty:** Easy
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a solution to classify each row of three side lengths as `'Equilateral'`, `'Isosceles'`, `'Scalene'`, or `'Not A Triangle'` (when the triangle inequality fails).

### Schema

```sql
Create table If Not Exists Triangles (A int, B int, C int)
```

`Triangles` has one row per candidate triangle with side lengths `A`, `B`, `C`.

## Approach

Evaluate the triangle inequality first (the sum of any two sides must exceed the third); if it fails, classify as `'Not A Triangle'`. Otherwise check for three equal sides (`'Equilateral'`), any two equal sides (`'Isosceles'`), or otherwise `'Scalene'`.

## SQL Solution

```sql
SELECT
  CASE
    WHEN A + B <= C OR A + C <= B OR B + C <= A THEN 'Not A Triangle'
    WHEN A = B AND B = C THEN 'Equilateral'
    WHEN A = B OR B = C OR A = C THEN 'Isosceles'
    ELSE 'Scalene'
  END AS triangle_type
FROM Triangles;
```

## Complexity

- Time: O(n) — one pass evaluating the CASE expression per row.
- Space: O(n) for the output rows.
