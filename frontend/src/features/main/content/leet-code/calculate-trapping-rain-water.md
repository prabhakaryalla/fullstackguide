# 3061. Calculate Trapping Rain Water

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a table of bar heights forming an elevation map (ordered by `id`), write a solution to compute the total amount of rainwater that can be trapped between the bars.

### Schema

```sql
Create table If Not Exists Heights (id int, height int)
```

`Heights` has one row per bar, in left-to-right order by `id`.

## Approach

The water trapped above a given bar equals `min(tallest bar to its left, tallest bar to its right) - its own height` (never negative). Compute the running maximum height when scanning left-to-right (`prev_max_height`) and when scanning right-to-left (`next_max_height`) using window functions, then sum `LEAST(prev_max_height, next_max_height) - height` across all rows.

## SQL Solution

```sql
WITH HeightsWithMinMax AS (
  SELECT
    height,
    MAX(height) OVER (ORDER BY id ASC) AS prev_max_height,
    MAX(height) OVER (ORDER BY id DESC) AS next_max_height
  FROM Heights
)
SELECT
  SUM(LEAST(prev_max_height, next_max_height) - height) AS total_trapped_water
FROM HeightsWithMinMax;
```

## Complexity

- Time: O(n log n) for the two windowed running-maximum computations, where n is the number of bars.
- Space: O(n) for the intermediate windowed rows.
