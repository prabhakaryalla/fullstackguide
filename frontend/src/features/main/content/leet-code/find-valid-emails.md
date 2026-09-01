# 3436. Find Valid Emails

**Difficulty:** Easy
**Category:** Database, SQL

## Problem
Table `Users` has columns `user_id` and `email`. A valid email address must match the pattern `<local-part>@<domain>.com`, where the local part contains only letters, digits, underscores, dots, and hyphens, and starts with a letter, and the domain contains only letters and digits. Return the `user_id` and `email` of users with a valid email, ordered by `user_id`.

## Approach
Use a regular expression to validate the email format directly in the `WHERE` clause: the local part must start with a letter and be followed by letters, digits, underscores, dots, or hyphens, then a literal `@`, then an alphanumeric domain, then the literal `.com` suffix, anchored at both ends.

## SQL Solution

```sql
SELECT user_id, email
FROM Users
WHERE email REGEXP '^[A-Za-z][A-Za-z0-9_.-]*@[A-Za-z0-9]+\\.com$'
ORDER BY user_id;
```

## Complexity

- **Time:** O(n * m), where n is the number of rows and m is the average length of `email` (regex scan per row)
- **Space:** O(1) additional space beyond the result set
