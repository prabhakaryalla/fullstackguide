# 579. Find Cumulative Salary of an Employee

**Difficulty:** Hard
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an `Employee` table (`Id`, `Month`, `Salary`), write a query to report the cumulative sum of an employee's salary over the last 3 months (excluding the most recent month recorded for that employee), ordered by employee descending by month.

### Schema

```
Employee: Id, Month, Salary
```

## Approach

Exclude each employee's single most recent month using a correlated subquery comparing against `MAX(Month)` for that employee. For every remaining row, join back to the same table restricted to the 3-month window ending at that row's month (inclusive), and sum the salaries in that window to get the cumulative 3-month sum ending at each qualifying month.

## SQL Solution

```sql
SELECT
    e1.Id,
    e1.Month,
    SUM(e2.Salary) AS Salary
FROM Employee e1
JOIN Employee e2
    ON e1.Id = e2.Id
    AND e2.Month BETWEEN e1.Month - 2 AND e1.Month
WHERE e1.Month < (SELECT MAX(Month) FROM Employee e3 WHERE e3.Id = e1.Id)
GROUP BY e1.Id, e1.Month
ORDER BY e1.Id ASC, e1.Month DESC;
```

## Complexity

- **Time:** `O(n^2)` due to the self-join and correlated subquery.
- **Space:** `O(n)` for the grouped intermediate result.
