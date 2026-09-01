# 1440. Evaluate Boolean Expression

**Difficulty:** Medium
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Variables` table (`name`, `value`) and an `Expressions` table (`left_operand`, `operator`, `right_operand`), where `operator` is one of `>`, `<`, or `=`, evaluate each expression using the variables' values and report the expression alongside its boolean result (`'true'`/`'false'`).

### Schema

```
Variables: name (PK), value
Expressions: (left_operand, operator, right_operand) (PK)
```

## Approach

Join `Expressions` to `Variables` twice — once to resolve the left operand's value and once for the right operand's value. Then use a `CASE` expression to compare the two resolved values according to the expression's operator, producing `'true'` or `'false'`.

## SQL Solution

```sql
SELECT
    e.left_operand,
    e.operator,
    e.right_operand,
    CASE
        WHEN e.operator = '>' AND v1.value > v2.value THEN 'true'
        WHEN e.operator = '<' AND v1.value < v2.value THEN 'true'
        WHEN e.operator = '=' AND v1.value = v2.value THEN 'true'
        ELSE 'false'
    END AS value
FROM Expressions e
JOIN Variables v1 ON e.left_operand = v1.name
JOIN Variables v2 ON e.right_operand = v2.name;
```

## Complexity

- **Time:** `O(n)` for the two variable lookups per expression.
- **Space:** `O(n)` for the result set.
