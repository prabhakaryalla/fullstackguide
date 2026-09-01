# 3172. Second Day Verification

**Difficulty:** Easy
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
A platform tracks user email signups and subsequent verification actions taken through text messages. Each signup has a signup date, and each verification action has an action date and an action type. Find all users who verified their account exactly one day after signing up.

### Schema
```sql
Create table If Not Exists Emails (email_id int, user_id int, signup_date date)
Create table If Not Exists Texts (email_id int, signup_action varchar(20), action_date date)
```

## Approach
Join the emails table with the texts table on the shared email id, filter for text records where the action is `'Verified'`, and check that the date difference between the verification action date and the original signup date equals exactly one day.

## SQL Solution
```sql
SELECT Emails.user_id
FROM Emails
INNER JOIN Texts
  ON Emails.email_id = Texts.email_id
WHERE
  Texts.signup_action = 'Verified'
  AND DATEDIFF(Texts.action_date, Emails.signup_date) = 1
ORDER BY 1;
```

## Complexity
- Time: O(n log n) due to the join
- Space: O(n)
