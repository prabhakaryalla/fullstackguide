# 2988. Manager of the Largest Department

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

### Schema

```sql
Table: Employees
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| emp_id        | int     |
| emp_name      | varchar |
| dep_id        | int     |
| position      | varchar |
+---------------+---------+
emp_id is the primary key.
position is either 'Manager' or 'Employee'.
```

Find the manager(s) of the department with the largest number of employees. If multiple departments tie, return all their managers.

### Example

```
Input:
Employees table:
+--------+----------+--------+----------+
| emp_id | emp_name | dep_id | position |
+--------+----------+--------+----------+
| 1      | Alice    | 101    | Manager  |
| 2      | Bob      | 101    | Employee |
| 3      | Carol    | 102    | Manager  |
+--------+----------+--------+----------+
Output:
+----------+--------+
| emp_name | dep_id |
+----------+--------+
| Alice    | 101    |
+----------+--------+
```

## Approach

Count employees per department, find the maximum count, then select managers from departments matching that count.

## SQL Solution

```sql
WITH DeptCounts AS (
    SELECT dep_id, COUNT(*) AS emp_count
    FROM Employees
    GROUP BY dep_id
),
MaxCount AS (
    SELECT MAX(emp_count) AS max_emp_count
    FROM DeptCounts
)
SELECT e.emp_name, e.dep_id
FROM Employees e
JOIN DeptCounts dc ON e.dep_id = dc.dep_id
JOIN MaxCount mc ON dc.emp_count = mc.max_emp_count
WHERE e.position = 'Manager'
ORDER BY e.emp_name;
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
