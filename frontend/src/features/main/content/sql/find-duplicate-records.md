# Find Duplicate Records in a Table

## Example

### Input: `employees`

| employee_id | employee_name | email |
|---|---|---|
| 1 | Alice Kim | alice@example.com |
| 2 | Ben Ortiz | ben@example.com |
| 3 | Carla Diaz | alice@example.com |
| 4 | Dan Wu | dan@example.com |
| 5 | Ella Osei | ben@example.com |

### Expected Output

| email | duplicate_count |
|---|---|
| alice@example.com | 2 |
| ben@example.com | 2 |

## Solution

Group by the columns that define a duplicate and keep groups with more than one row.

```sql
SELECT email, COUNT(*) AS duplicate_count
FROM employees
GROUP BY email
HAVING COUNT(*) > 1;
```

Use the columns that form your business key instead of `email` when needed.

## Tricky Interview Question

**Q: Why use `HAVING` instead of `WHERE` for `COUNT(*)`?**

**A:** `WHERE` filters rows before grouping. `HAVING` filters groups after the count is calculated.