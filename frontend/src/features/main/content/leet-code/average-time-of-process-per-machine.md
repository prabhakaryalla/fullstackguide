# 1661. Average Time of Process per Machine

**Difficulty:** Easy
**Category:** SQL, Database

## Problem

Given an `Activity` table (`machine_id`, `process_id`, `activity_type` — `'start'` or `'end'` — and `timestamp`), each process runs exactly once per machine with one `start` and one `end` row. Report the average processing time of each machine, rounded to 3 decimal places.

### Schema

```
Activity: machine_id, process_id, activity_type ('start' | 'end'), timestamp (composite PK: machine_id, process_id, activity_type)
```

## Approach

Self-join the table on matching `machine_id`/`process_id` pairing each `start` row with its corresponding `end` row, compute the elapsed time (`end.timestamp - start.timestamp`) per process, then average those durations grouped by machine.

## SQL Solution

```sql
SELECT
    a1.machine_id,
    ROUND(AVG(a2.timestamp - a1.timestamp), 3) AS processing_time
FROM Activity a1
JOIN Activity a2
    ON a1.machine_id = a2.machine_id
    AND a1.process_id = a2.process_id
    AND a1.activity_type = 'start'
    AND a2.activity_type = 'end'
GROUP BY a1.machine_id;
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of activity rows.
- **Space:** `O(m)`, where `m` is the number of distinct machines.
