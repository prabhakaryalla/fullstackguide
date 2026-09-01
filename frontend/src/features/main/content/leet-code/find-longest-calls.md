# 3124. Find Longest Calls

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a solution to find, for each call `type`, the top 3 longest calls (by `duration`), formatted as `HH:MM:SS`, along with the caller's first name. Return the results ordered by type descending, duration descending, then first name descending.

### Schema

```sql
Create table If Not Exists Contacts (id int, first_name varchar(20))
Create table If Not Exists Calls (contact_id int, type varchar(10), duration int)
```

`Contacts` maps ids to names; `Calls` records each call's `type` and `duration` (in seconds).

## Approach

Join `Calls` to `Contacts` to attach the caller's name. Use `RANK()` partitioned by `type` and ordered by `duration` descending to rank calls within each type. Keep only rank `<= 3`, and format the duration in seconds as `HH:MM:SS` using integer division and modulo, zero-padded to two digits per component.

## SQL Solution

```sql
WITH RankedCalls AS (
  SELECT
    Contacts.first_name,
    Calls.type,
    Calls.duration,
    RANK() OVER (
      PARTITION BY type
      ORDER BY duration DESC
    ) AS `rank`
  FROM Calls
  JOIN Contacts
    ON Calls.contact_id = Contacts.id
)
SELECT
  first_name,
  type,
  CONCAT(
    LPAD(FLOOR(duration / 3600), 2, '0'), ':',
    LPAD(FLOOR((duration % 3600) / 60), 2, '0'), ':',
    LPAD(FLOOR(duration % 60), 2, '0')
  ) AS duration_formatted
FROM RankedCalls
WHERE `rank` <= 3
ORDER BY type DESC, duration DESC, first_name DESC;
```

## Complexity

- Time: O(n log n) for the windowed ranking, where n is the number of calls.
- Space: O(n) for the intermediate ranked rows.
