# 626. Exchange Seats

**Difficulty:** Medium
**Category:** SQL, Database

## Problem

Given a `seat` table (`id`, `student`) ordered by `id`, write a query to swap every pair of adjacent students' seat ids, leaving the last student's seat unchanged if the total number of seats is odd.

### Schema

```
seat: id (PK), student
```

## Approach

For odd `id`s, swap forward to `id + 1` unless it's the very last seat (in which case, with an odd total count, it has no pair and stays put); for even `id`s, swap backward to `id - 1`. Compute the new `id` for each row with a `CASE` expression and re-sort by the new id to preserve seating order.

## SQL Solution

```sql
SELECT
    CASE
        WHEN id % 2 = 1 AND id = (SELECT MAX(id) FROM seat) THEN id
        WHEN id % 2 = 1 THEN id + 1
        ELSE id - 1
    END AS id,
    student
FROM seat
ORDER BY id;
```

## Complexity

- **Time:** `O(n log n)` for the final sort.
- **Space:** `O(n)` for the result set.
