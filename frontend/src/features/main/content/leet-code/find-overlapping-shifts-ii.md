# 3268. Find Overlapping Shifts II

**Difficulty:** Hard
**Category:** Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
A table records employee work shifts, each with a start time and an end time. For each employee, count how many pairs of their own shifts overlap in time. This is the large-input follow-up to "Find Overlapping Shifts": the self-join approach that works there is too slow here, so an event-based sweep is required instead.

### Schema

```sql
Create table If Not Exists EmployeeShifts (employee_id int, shift_id int, start_time datetime, end_time datetime)
```

## Approach
Avoid the self-join entirely. Convert every shift into two "events" — a `+1` event at its `start_time` and a `-1` event at its `end_time` — then, per employee, sort all events chronologically (processing end events before start events when times tie, so a shift ending exactly when another starts is not counted as overlapping) and compute a running total of active shifts with a window function. For every start event, the number of *other* shifts already active at that moment (`running_total - 1`) is exactly the number of new overlaps that shift introduces. Summing this per employee gives the total overlapping shift count.

## SQL Solution

```sql
WITH Events AS (
    SELECT employee_id, start_time AS event_time, 1 AS event_type
    FROM EmployeeShifts
    UNION ALL
    SELECT employee_id, end_time AS event_time, -1 AS event_type
    FROM EmployeeShifts
),
Ordered AS (
    SELECT
        employee_id,
        event_time,
        event_type,
        SUM(event_type) OVER (
            PARTITION BY employee_id
            ORDER BY event_time, event_type DESC
            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
        ) AS active_count
    FROM Events
)
SELECT
    employee_id,
    SUM(CASE WHEN event_type = 1 THEN active_count - 1 ELSE 0 END) AS overlapping_shifts
FROM Ordered
GROUP BY employee_id
HAVING SUM(CASE WHEN event_type = 1 THEN active_count - 1 ELSE 0 END) > 0
ORDER BY employee_id;
```

## Complexity

- **Time:** O(n log n) for sorting the events, where n is the number of shifts.
- **Space:** O(n) for the events table.
