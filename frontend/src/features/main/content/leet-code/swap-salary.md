# 627. Swap Salary

**Difficulty:** Easy
**Category:** SQL, Database

## Problem

Given a `salary` table (`id`, `name`, `sex`, `salary`) where `sex` is either `'m'` or `'f'`, write a single UPDATE statement to swap all `'m'` and `'f'` values in the `sex` column, without using an intermediate SELECT.

### Schema

```
salary: id (PK), name, sex, salary
```

## Approach

Use a single `UPDATE` with a `CASE` expression that flips `'m'` to `'f'` and everything else (i.e., `'f'`) to `'m'`, applied to every row in one statement.

## SQL Solution

```sql
UPDATE salary
SET sex = CASE WHEN sex = 'm' THEN 'f' ELSE 'm' END;
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` extra.
