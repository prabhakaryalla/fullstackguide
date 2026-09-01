# 2853. Highest Salaries Difference

**Difficulty:** Easy
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a SQL query to find the difference between the highest salaries in the Engineering and Marketing departments. The result should be a single column named `salary_difference` containing the absolute difference.

Given a table `Salaries`:
- `emp_id` (int): employee ID
- `emp_name` (varchar): employee name  
- `department` (varchar): department name
- `salary` (int): salary amount

### Schema

```sql
CREATE TABLE Salaries (
    emp_id INT,
    emp_name VARCHAR(50),
    department VARCHAR(50),
    salary INT
);
```

### Example

```
Input:
Salaries table:
+--------+----------+-------------+--------+
| emp_id | emp_name | department  | salary |
+--------+----------+-------------+--------+
| 1      | John     | Engineering | 100000 |
| 2      | Jane     | Engineering | 110000 |
| 3      | Bob      | Marketing   | 80000  |
| 4      | Alice    | Marketing   | 90000  |
+--------+----------+-------------+--------+

Output:
+-------------------+
| salary_difference |
+-------------------+
| 20000             |
+-------------------+
```

## Approach

Use aggregate functions with conditional logic. Calculate the maximum salary for Engineering and the maximum salary for Marketing separately, then compute the absolute difference. Use `MAX(CASE WHEN ... THEN salary END)` to filter by department.

## SQL Solution

```sql
SELECT 
    ABS(MAX(CASE WHEN department = 'Engineering' THEN salary END) - 
        MAX(CASE WHEN department = 'Marketing' THEN salary END)) AS salary_difference
FROM Salaries;
```

## Complexity

- **Time:** O(n) — scan the table once.
- **Space:** O(1) for the result.
