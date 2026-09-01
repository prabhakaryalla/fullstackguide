# 3611. Find Overbooked Employees

**Difficulty:** Medium
**Category:** Database

## Problem
Table `employees` has columns `employee_id`, `employee_name`, `department`. Table `meetings` has columns `meeting_id`, `employee_id`, `meeting_date`, `meeting_type` (`'Team'`, `'Client'`, or `'Training'`), `duration_hours`.

Find employees who are meeting-heavy: employees who spend more than 50% of their working time in meetings during any given week.

- Assume a standard work week is 40 hours.
- Calculate total meeting hours per employee per week (Monday to Sunday).
- An employee is meeting-heavy for a week if their weekly meeting hours are strictly greater than 20 hours (50% of 40).
- Count how many weeks each employee was meeting-heavy.
- Only include employees who were meeting-heavy for at least 2 weeks.

Return the result table ordered by the number of meeting-heavy weeks in descending order, then by employee name in ascending order.

## Approach
Group each employee's meetings into ISO weeks (Monday-start) using `YEARWEEK(meeting_date, 3)`, sum `duration_hours` per employee/week, and count how many of those weekly sums exceed 20 hours. Join the resulting per-employee count back to the `employees` table, keep only employees with at least 2 meeting-heavy weeks, and order as required.

## SQL Solution

```sql
WITH weekly AS (
    SELECT
        employee_id,
        YEARWEEK(meeting_date, 3) AS wk,
        SUM(duration_hours) AS total_hours
    FROM meetings
    GROUP BY employee_id, YEARWEEK(meeting_date, 3)
),
heavy AS (
    SELECT
        employee_id,
        COUNT(*) AS meeting_heavy_weeks
    FROM weekly
    WHERE total_hours > 20
    GROUP BY employee_id
)
SELECT
    e.employee_id,
    e.employee_name,
    e.department,
    h.meeting_heavy_weeks
FROM employees e
JOIN heavy h ON h.employee_id = e.employee_id
WHERE h.meeting_heavy_weeks >= 2
ORDER BY h.meeting_heavy_weeks DESC, e.employee_name ASC;
```

## Complexity

- **Time:** O(m + n log n), where m is the number of meetings and n is the number of employees.
- **Space:** O(m + n)
