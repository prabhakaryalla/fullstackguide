# 1741. Find Total Time Spent by Each Employee

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an `Employees` table (`emp_id`, `event_day`, `in_time`, `out_time`) where an employee may have multiple in/out entries on the same day, return the total time spent by each employee on each day.

### Schema

```
Employees: emp_id, event_day, in_time, out_time
```

## Approach

Group the rows by employee and day, summing `out_time - in_time` across all entries in each group.

## SQL Solution

```sql
SELECT emp_id, event_day AS day, SUM(out_time - in_time) AS total_time
FROM Employees
GROUP BY emp_id, event_day;
```

## Complexity

- **Time:** `O(n log n)` for the grouping.
- **Space:** `O(n)`.
