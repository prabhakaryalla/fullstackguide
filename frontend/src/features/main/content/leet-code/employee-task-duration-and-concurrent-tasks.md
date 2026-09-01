# 3156. Employee Task Duration and Concurrent Tasks

**Difficulty:** Hard
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
A company logs each task performed by its employees, recording the employee, a start time, and an end time for the task. Some tasks may overlap in time for the same employee (representing concurrent work). For each employee, compute the total task duration in minutes, but count any overlapping time only once (i.e., merge overlapping intervals per employee before summing durations).

### Schema
```sql
Create table If Not Exists EmployeeTasks (employee_id int, task_id int, start_time datetime, end_time datetime)
```

## Approach
For each employee, gather all task intervals, sort them by start time, and merge overlapping or touching intervals using a standard interval-merging technique: iterate through the sorted intervals, and whenever the current interval's start is less than or equal to the running merged interval's end, extend the merged interval; otherwise, finalize the current merged interval and start a new one. Sum the durations of the merged intervals to get the true (non-double-counted) total working time per employee.

## SQL Solution
```sql
WITH RankedTasks AS (
  SELECT
    employee_id,
    start_time,
    end_time,
    SUM(CASE WHEN start_time <= @prevEnd THEN 0 ELSE 1 END) OVER (
      PARTITION BY employee_id ORDER BY start_time
    ) AS grp
  FROM (
    SELECT
      employee_id,
      start_time,
      end_time,
      @prevEnd := IF(@prevEmp = employee_id AND start_time <= @prevEnd, GREATEST(@prevEnd, end_time), end_time) AS newEnd,
      @prevEmp := employee_id
    FROM EmployeeTasks, (SELECT @prevEnd := NULL, @prevEmp := NULL) init
    ORDER BY employee_id, start_time
  ) t
),
Merged AS (
  SELECT
    employee_id,
    grp,
    MIN(start_time) AS merged_start,
    MAX(end_time) AS merged_end
  FROM RankedTasks
  GROUP BY employee_id, grp
)
SELECT
  employee_id,
  SUM(TIMESTAMPDIFF(MINUTE, merged_start, merged_end)) AS total_duration
FROM Merged
GROUP BY employee_id
ORDER BY employee_id;
```

## Complexity
- Time: O(n log n) due to sorting per employee
- Space: O(n) for intermediate grouping structures
