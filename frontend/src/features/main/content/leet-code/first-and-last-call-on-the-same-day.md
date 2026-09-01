# 1972. First and Last Call On the Same Day

**Difficulty:** Hard
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

`Table: Calls(caller_id, recipient_id, call_time)`. Return the ids of users whose first phone call of the day and last phone call of the day (on every day they made or received at least one call) were with the same other person, for every day they made any calls.

### Example

```
Input: Calls include user 8 whose earliest and latest call on 2021-08-24 were both with user 4.
Output: (4), (8)
```

## Approach

Normalize each call into two directed rows (one per participant), each carrying the other participant's id and the call's date and time. For each `(user_id, date)` group, find the id of the other participant of the earliest call (using `FIRST_VALUE` or a `ROW_NUMBER` ordered by time ascending) and the id of the other participant of the latest call (ordered descending); a user qualifies for that day if those two ids match, and the user is included in the result if they qualify on any day.

```sql
WITH Directed AS (
    SELECT caller_id AS user_id, recipient_id AS other_id, call_time,
           DATE(call_time) AS call_date
    FROM Calls
    UNION ALL
    SELECT recipient_id AS user_id, caller_id AS other_id, call_time,
           DATE(call_time) AS call_date
    FROM Calls
),
Ranked AS (
    SELECT user_id, other_id, call_date,
           ROW_NUMBER() OVER (PARTITION BY user_id, call_date ORDER BY call_time ASC)  AS rn_first,
           ROW_NUMBER() OVER (PARTITION BY user_id, call_date ORDER BY call_time DESC) AS rn_last
    FROM Directed
)
SELECT DISTINCT f.user_id
FROM Ranked f
JOIN Ranked l
  ON f.user_id = l.user_id
 AND f.call_date = l.call_date
 AND f.rn_first = 1
 AND l.rn_last = 1
 AND f.other_id = l.other_id;
```

## Complexity

- **Time:** `O(n log n)` — dominated by the window-function ranking per user-day.
- **Space:** `O(n)` for the directed and ranked intermediate tables.
