# 2668. Find Latest Salaries

**Difficulty:** Easy
**Category:** Database

## Problem

Table: Salary

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| emp_id        | int     |
| firstname     | varchar |
| lastname      | varchar |
| salary        | varchar |
| department_id | varchar |
+---------------+---------+
```

`(emp_id, salary)` is the primary key. Each row contains employee information.

Write an SQL query to find the latest salary for each employee. For employees with multiple salary records, select the one with the highest salary value. If there are ties, select any one.

Return the result table ordered by emp_id in ascending order.

### Schema

```sql
CREATE TABLE Salary (
    emp_id INT,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    salary VARCHAR(20),
    department_id VARCHAR(20),
    PRIMARY KEY (emp_id, salary)
);
```

### Example

```
Input:
Salary table:
+--------+-----------+----------+--------+---------------+
| emp_id | firstname | lastname | salary | department_id |
+--------+-----------+----------+--------+---------------+
| 1      | Todd      | Wilson   | 110000 | D1            |
| 1      | Todd      | Wilson   | 106119 | D1            |
| 2      | Justin    | Simon    | 130000 | D2            |
| 2      | Justin    | Simon    | 128922 | D2            |
| 3      | Kelly     | Rosario  | 42689  | D1            |
+--------+-----------+----------+--------+---------------+

Output:
+--------+-----------+----------+--------+---------------+
| emp_id | firstname | lastname | salary | department_id |
+--------+-----------+----------+--------+---------------+
| 1      | Todd      | Wilson   | 110000 | D1            |
| 2      | Justin    | Simon    | 130000 | D2            |
| 3      | Kelly     | Rosario  | 42689  | D1            |
+--------+-----------+----------+--------+---------------+
```

## Approach

Use a window function or subquery to find the maximum salary for each employee, then filter to select only those records.

## SQL Solution

```sql
SELECT 
    emp_id,
    firstname,
    lastname,
    salary,
    department_id
FROM (
    SELECT 
        *,
        RANK() OVER (PARTITION BY emp_id ORDER BY CAST(salary AS SIGNED) DESC) AS rn
    FROM Salary
) AS ranked
WHERE rn = 1
ORDER BY emp_id;
```

## Complexity

- **Time:** O(n log n) for sorting within partitions
- **Space:** O(n) for the intermediate result
