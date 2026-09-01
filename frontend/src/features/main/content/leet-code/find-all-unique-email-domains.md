# 3059. Find All Unique Email Domains

**Difficulty:** Easy
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a solution to report every unique email domain ending in `.com`, along with how many emails use it. Return the results ordered by domain ascending.

### Schema

```sql
Create table If Not Exists Emails (id int, email varchar(50))
```

`Emails` has one row per email address.

## Approach

Filter to addresses ending in `.com`, extract the domain portion after the `@` using string functions, group by domain, and count.

## SQL Solution

```sql
SELECT
  SUBSTRING_INDEX(email, '@', -1) AS email_domain,
  COUNT(*) AS count
FROM Emails
WHERE email LIKE '%.com'
GROUP BY email_domain
ORDER BY email_domain;
```

## Complexity

- Time: O(n log n) for the grouping/sort, where n is the number of email rows.
- Space: O(n) for the grouped intermediate result.
