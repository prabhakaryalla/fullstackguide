# 603. Consecutive Available Seats

**Difficulty:** Easy
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Cinema` table (`seat_id`, `free`), write a query to report all seats that are free and have an adjacent free seat (either directly before or after them), ordered by `seat_id`.

### Schema

```
Cinema: seat_id (PK), free
```

## Approach

For each free seat, check whether the seat immediately before it or immediately after it is also free, using a subquery over the free seat ids. A seat qualifies if either neighboring position exists within that free-seat set.

## SQL Solution

```sql
SELECT seat_id
FROM Cinema
WHERE free = 1
AND (seat_id - 1 IN (SELECT seat_id FROM Cinema WHERE free = 1)
     OR seat_id + 1 IN (SELECT seat_id FROM Cinema WHERE free = 1))
ORDER BY seat_id;
```

## Complexity

- **Time:** `O(n)` with an index on `seat_id`.
- **Space:** `O(n)` for the free-seat subquery result.
