# 2504. Concatenate the Name and the Profession

**Difficulty:** Easy
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a solution that, for every person, returns a single string combining their name and the first letter of their profession in parentheses, e.g. `"Ashley(D)"` for a doctor named Ashley. Return the result ordered by `person_id` in descending order.

### Schema

```
Table: Person
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| person_id   | int     |
| name        | varchar |
| profession  | varchar |
+-------------+---------+
person_id is the primary key for this table.
```

## Approach

Concatenate the `name` column with an opening parenthesis, the first character of `profession`, and a closing parenthesis. Sort the results by `person_id` descending.

## SQL Solution

```sql
SELECT
    person_id,
    CONCAT(name, '(', LEFT(profession, 1), ')') AS name
FROM Person
ORDER BY person_id DESC;
```

## Complexity

- **Time:** O(n log n) for the sort
- **Space:** O(n)
