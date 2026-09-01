# 2298. Tasks Count in the Weekend

**Difficulty:** Easy
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a SQL query to report:
- The number of tasks that were completed during the weekend (Saturday and Sunday)
- The number of tasks that were completed during the working days (Monday through Friday)

Return the result table in any order.

### Schema

```
Table: Tasks
+-------------+------+
| Column Name | Type |
+-------------+------+
| task_id     | int  |
| assignee_id | int  |
| submit_date | date |
+-------------+------+
task_id is the primary key for this table.
Each row contains the ID of a task, the ID of the assignee, and the submission date.
```

### Example

```
Input:
Tasks table:
+---------+-------------+-------------+
| task_id | assignee_id | submit_date |
+---------+-------------+-------------+
| 1       | 1           | 2022-06-13  |
| 2       | 6           | 2022-06-14  |
| 3       | 6           | 2022-06-15  |
| 4       | 3           | 2022-06-18  |
| 5       | 5           | 2022-06-19  |
| 6       | 7           | 2022-06-19  |
+---------+-------------+-------------+

Output:
+-------------+-------------+
| weekend_cnt | working_cnt |
+-------------+-------------+
| 3           | 3           |
+-------------+-------------+
```

## Approach

Use the WEEKDAY() or DAYOFWEEK() function to determine which day of the week each task was submitted. Then count tasks for weekends (Saturday/Sunday) versus working days.

Different SQL dialects use different functions and day numbering:
- MySQL WEEKDAY(): Monday = 0, Sunday = 6
- MySQL DAYOFWEEK(): Sunday = 1, Saturday = 7

## SQL Solution

```sql
SELECT 
    SUM(CASE 
        WHEN WEEKDAY(submit_date) IN (5, 6) THEN 1 
        ELSE 0 
    END) AS weekend_cnt,
    SUM(CASE 
        WHEN WEEKDAY(submit_date) NOT IN (5, 6) THEN 1 
        ELSE 0 
    END) AS working_cnt
FROM Tasks
```

## Complexity

- **Time:** O(n) where n is the number of tasks
- **Space:** O(1)
