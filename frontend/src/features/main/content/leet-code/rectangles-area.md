# 1459. Rectangles Area

**Difficulty:** Medium
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Geometry` table (`id`, `x1`, `y1`, `x2`, `y2`) representing axis-aligned rectangles by opposite corners, report every pair of rectangles that overlap, along with the area of their intersection, ordered by area descending (ties broken by the pair of ids ascending).

### Schema

```
Geometry: id (PK), x1, y1, x2, y2
```

## Approach

Join the table to itself with `p1.id < p2.id` to consider each unordered pair once. Two axis-aligned rectangles overlap when the intersection of their x-ranges and y-ranges is non-empty; compute the intersection width as `LEAST(x2s) - GREATEST(x1s)` and height similarly, keeping only pairs where both are positive, and multiply them for the overlapping area.

## SQL Solution

```sql
SELECT
    p1.id AS ai_id,
    p2.id AS bi_id,
    (LEAST(p1.x2, p2.x2) - GREATEST(p1.x1, p2.x1))
        * (LEAST(p1.y2, p2.y2) - GREATEST(p1.y1, p2.y1)) AS area
FROM Geometry p1
JOIN Geometry p2 ON p1.id < p2.id
WHERE LEAST(p1.x2, p2.x2) > GREATEST(p1.x1, p2.x1)
  AND LEAST(p1.y2, p2.y2) > GREATEST(p1.y1, p2.y1)
ORDER BY area DESC, ai_id, bi_id;
```

## Complexity

- **Time:** `O(n^2)` for the self-join over all rectangle pairs.
- **Space:** `O(n^2)` in the worst case for the result set.
