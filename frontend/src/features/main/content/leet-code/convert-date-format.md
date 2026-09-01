# 1853. Convert Date Format

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Days` table with a `day` date column, reformat every date into the form `"<Weekday>, <Month> <day>, <Year>"` (e.g. `"Sunday, September 6, 2020"`).

### Schema

```
Days: day
```

## Approach

Use the database's date-formatting function to directly produce the weekday name, month name, day-of-month (without leading zero), and year in the required order and punctuation.

## SQL Solution

```sql
SELECT DATE_FORMAT(day, '%W, %M %e, %Y') AS day
FROM Days;
```

## Complexity

- **Time:** `O(n)` for formatting each row.
- **Space:** `O(n)` for the result set.
