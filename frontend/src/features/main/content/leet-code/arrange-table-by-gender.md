# 2308. Arrange Table by Gender

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a SQL query to rearrange the `Genders` table so that the rows alternate between 'female', 'other', and 'male'. Additionally, within each gender group, order by user_id in ascending order.

The output should be ordered such that we cycle through the genders in the order: female, other, male, female, other, male, and so on.

### Schema

```
Table: Genders
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| user_id     | int     |
| gender      | varchar |
+-------------+---------+
user_id is the primary key for this table.
gender is ENUM of type ('female', 'male', 'other').
```

### Example

```
Input:
Genders table:
+---------+--------+
| user_id | gender |
+---------+--------+
| 4       | male   |
| 7       | female |
| 2       | other  |
| 5       | male   |
| 3       | female |
| 8       | male   |
| 6       | other  |
| 1       | other  |
| 9       | female |
+---------+--------+

Output:
+---------+--------+
| user_id | gender |
+---------+--------+
| 3       | female |
| 1       | other  |
| 4       | male   |
| 7       | female |
| 2       | other  |
| 5       | male   |
| 9       | female |
| 6       | other  |
| 8       | male   |
+---------+--------+
```

## Approach

1. Assign row numbers to each gender group ordered by user_id
2. Order the final result by the row number and then by gender in the sequence female, other, male

This creates an alternating pattern where we pick one from each gender group in sequence.

## SQL Solution

```sql
SELECT user_id, gender
FROM (
    SELECT 
        user_id,
        gender,
        ROW_NUMBER() OVER (PARTITION BY gender ORDER BY user_id) AS rn,
        CASE gender
            WHEN 'female' THEN 1
            WHEN 'other' THEN 2
            WHEN 'male' THEN 3
        END AS gender_order
    FROM Genders
) AS ranked
ORDER BY rn, gender_order
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(n) for the result set
