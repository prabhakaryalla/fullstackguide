# 3262. Find Overlapping Shifts

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
A table records employee work shifts, each with a start time and an end time. For each employee, count how many pairs of their own shifts overlap in time (i.e., one shift's start time falls strictly within another shift's time range).

### Schema
```sql
Create table If Not Exists EmployeeShifts (employee_id int, shift_id int, start_time datetime, end_time datetime)
```

## Approach
Self-join the shifts table on employee id to compare every pair of shifts belonging to the same employee. Count the pairs where the second shift's start time falls strictly between the first shift's start and end times (indicating an overlap). Group by employee id to get the total overlapping shift count per employee.

## SQL Solution
```sql
SELECT
  Shift1.employee_id,
  COUNT(*) AS overlapping_shifts
FROM EmployeeShifts AS Shift1
INNER JOIN EmployeeShifts AS Shift2
  ON Shift1.employee_id = Shift2.employee_id
WHERE
  Shift1.start_time < Shift2.start_time
  AND Shift2.start_time < Shift1.end_time
GROUP BY Shift1.employee_id
ORDER BY Shift1.employee_id;
```

## Complexity
- Time: O(n^2) per employee in the worst case due to the self-join
- Space: O(n)
