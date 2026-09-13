# Find Employees Hired on Weekends

## Example

### Input: `employees`

| employee_id | employee_name | hire_date |
|---|---|---|
| 1 | Alice | 2025-06-14 |
| 2 | Ben | 2025-06-16 |
| 3 | Carla | 2025-06-15 |

2025-06-14 is a Saturday, 2025-06-15 is a Sunday, and 2025-06-16 is a Monday.

### Expected Output

| employee_id | employee_name | hire_date |
|---|---|---|
| 1 | Alice | 2025-06-14 |
| 3 | Carla | 2025-06-15 |

## Solution

The weekday function varies by SQL database.

### SQL Server

This version is independent of `DATEFIRST` because it uses a known Sunday reference date.

```sql
SELECT employee_id, employee_name, hire_date
FROM employees
WHERE DATEDIFF(day, '19000107', CAST(hire_date AS date)) % 7 IN (0, 1);
```

### PostgreSQL

`EXTRACT(ISODOW ...)` returns 6 for Saturday and 7 for Sunday.

```sql
SELECT employee_id, employee_name, hire_date
FROM employees
WHERE EXTRACT(ISODOW FROM hire_date) IN (6, 7);
```

## Tricky Interview Question

**Q: Why can weekday numbers differ between databases?**

**A:** Database vendors use different numbering rules and settings. Always check the dialect documentation or use a known reference date.