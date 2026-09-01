# 2990. Loan Types

**Difficulty:** Easy
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

### Schema

```sql
Table: Loans
+-------------+----------+
| Column Name | Type     |
+-------------+----------+
| user_id     | int      |
| loan_type   | varchar  |
+-------------+----------+
(user_id, loan_type) is the primary key.
loan_type is either 'Refinance' or 'Mortgage'.
```

Find all users who have taken out both a 'Refinance' and a 'Mortgage' loan. Return user IDs in ascending order.

### Example

```
Input:
Loans table:
+---------+-----------+
| user_id | loan_type |
+---------+-----------+
| 1       | Refinance |
| 1       | Mortgage  |
| 2       | Refinance |
| 3       | Mortgage  |
+---------+-----------+
Output:
+---------+
| user_id |
+---------+
| 1       |
+---------+
```

## Approach

Group by user_id and filter for users having both loan types.

## SQL Solution

```sql
SELECT user_id
FROM Loans
WHERE loan_type IN ('Refinance', 'Mortgage')
GROUP BY user_id
HAVING COUNT(DISTINCT loan_type) = 2
ORDER BY user_id;
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
