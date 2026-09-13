# Gaps and Islands Problems

## Example

### Input: `user_logins`

| user_id | login_date |
|---|---|
| 1 | 2025-06-01 |
| 1 | 2025-06-02 |
| 1 | 2025-06-03 |
| 1 | 2025-06-10 |
| 2 | 2025-06-01 |

### Expected Output

User 1 has a 3-day streak (June 1-3) and a separate 1-day island (June 10), so only the first streak meets the `>= 3` filter. User 2 has only a single day.

| user_id | start_day | end_day | consecutive_days |
|---|---|---|---|
| 1 | 2025-06-01 | 2025-06-03 | 3 |

## Solution

An island is a group of consecutive rows. A gap is the missing space between groups. A common approach is to compare a row number with a sequence value.

### SQL Server

```sql
WITH numbered AS (
  SELECT user_id, CAST(login_date AS date) AS login_day,
         DATEDIFF(day, 0, CAST(login_date AS date)) - ROW_NUMBER() OVER (
           PARTITION BY user_id ORDER BY CAST(login_date AS date)
         ) AS island_key
  FROM user_logins
)
SELECT user_id, MIN(login_day) AS start_day, MAX(login_day) AS end_day,
       COUNT(*) AS consecutive_days
FROM numbered
GROUP BY user_id, island_key
HAVING COUNT(*) >= 3;
```

### PostgreSQL

```sql
WITH numbered AS (
  SELECT user_id, login_date::date AS login_day,
         login_date::date - (ROW_NUMBER() OVER (
           PARTITION BY user_id ORDER BY login_date::date
         ))::int AS island_key
  FROM user_logins
)
SELECT user_id, MIN(login_day) AS start_day, MAX(login_day) AS end_day,
       COUNT(*) AS consecutive_days
FROM numbered
GROUP BY user_id, island_key
HAVING COUNT(*) >= 3;
```

SQL Server casts with `CAST(... AS date)` and subtracts dates using `DATEDIFF` against a fixed reference date. PostgreSQL casts with `::date` and can subtract dates directly because the result is already an integer number of days.

This finds login streaks of at least three days. Remove duplicate dates first if a user can log in many times on one day.

## Tricky / Follow-up Questions

**Q: Why must duplicate dates be removed?**

**A:** Multiple rows for one day make the row number advance even though the calendar did not. Use `SELECT DISTINCT user_id, login_date::date` first.