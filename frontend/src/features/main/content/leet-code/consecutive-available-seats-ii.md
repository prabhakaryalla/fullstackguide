# 3140. Consecutive Available Seats II

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a solution to find the longest run of consecutive free seats in a cinema. Return the first seat id, last seat id, and the length of that run. If there are multiple runs tied for longest, return all of them.

### Schema

```sql
Create table If Not Exists Cinema (seat_id int, free bool)
```

`Cinema` has one row per seat, indicating whether it's `free`.

## Approach

Filter to only free seats. The classic "group consecutive rows" trick applies: subtracting a row's rank (via `ROW_NUMBER()` ordered by `seat_id`) from its own `seat_id` produces a constant value for every seat within one contiguous free run, and a different constant for each separate run — effectively assigning a `group_id` to each run. Group by that `group_id` to get each run's first seat, last seat, and length; then use `RANK()` to find the run(s) with the maximum length and return only those.

## SQL Solution

```sql
WITH FreeSeats AS (
  SELECT
    *,
    seat_id - ROW_NUMBER() OVER (ORDER BY seat_id) AS group_id
  FROM Cinema
  WHERE free = 1
),
RankedFreeSeats AS (
  SELECT
    MIN(seat_id) AS first_seat_id,
    MAX(seat_id) AS last_seat_id,
    COUNT(*) AS consecutive_seats_len,
    RANK() OVER (ORDER BY COUNT(*) DESC) AS `rank`
  FROM FreeSeats
  GROUP BY group_id
)
SELECT first_seat_id, last_seat_id, consecutive_seats_len
FROM RankedFreeSeats
WHERE `rank` = 1
ORDER BY first_seat_id;
```

## Complexity

- Time: O(n log n) for the windowed row numbering and sort, where n is the number of seats.
- Space: O(n) for the intermediate grouped rows.
