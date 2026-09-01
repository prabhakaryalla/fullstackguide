# 1715. Count Apples and Oranges

**Difficulty:** Medium
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Boxes` table (`box_id`, `chest_id`, `apple_count`, `orange_count`) and a `Chests` table (`chest_id`, `apple_count`, `orange_count`), where a box may optionally contain a chest with additional fruit, return the total number of apples and total number of oranges across all boxes (including fruit inside any chests).

### Schema

```
Boxes: box_id, chest_id, apple_count, orange_count
Chests: chest_id, apple_count, orange_count
```

## Approach

The total apple/orange count is simply the sum of the `Boxes` table's own counts plus the sum of every row in the `Chests` table (each chest is referenced by exactly one box, so no double counting occurs).

## SQL Solution

```sql
SELECT
    (SELECT SUM(apple_count) FROM Boxes) + (SELECT SUM(apple_count) FROM Chests) AS apple_count,
    (SELECT SUM(orange_count) FROM Boxes) + (SELECT SUM(orange_count) FROM Chests) AS orange_count;
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
