# 1076. Project Employees II

**Difficulty:** Easy
**Category:** SQL, Database

## Problem

Given a `Project` table (`project_id`, `employee_id`), write a query to report the project ID(s) with the most employees. There may be more than one project tied for the most employees.

### Schema

```
Project: project_id, employee_id
```

## Approach

Group `Project` rows by `project_id` and count employees per project. Compare each group's count against the overall maximum group size (found via a subquery that groups, counts, orders descending, and takes the top value), keeping every project that ties for that maximum — which correctly handles ties instead of assuming a single winner.

## SQL Solution

```sql
SELECT project_id
FROM Project
GROUP BY project_id
HAVING COUNT(employee_id) = (
    SELECT COUNT(employee_id) AS cnt
    FROM Project
    GROUP BY project_id
    ORDER BY cnt DESC
    LIMIT 1
);
```

## Complexity

- **Time:** `O(n)` for the grouping scans.
- **Space:** `O(projects)` for the grouped results.
