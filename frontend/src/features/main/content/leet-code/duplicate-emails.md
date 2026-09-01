# 182. Duplicate Emails

**Difficulty:** Easy
**Category:** SQL, Database

## Problem

Given a `Person` table (`id`, `email`), write a query to report all email addresses that appear more than once.

### Schema

```
Person: id (PK), email
```

## Approach

Group rows by `email` and use `HAVING COUNT(*) > 1` to keep only groups that occur more than once — `HAVING` is needed (rather than `WHERE`) because the filter applies to an aggregated count, not to individual rows.

## SQL Solution

```sql
SELECT email AS Email
FROM Person
GROUP BY email
HAVING COUNT(*) > 1;
```

## Complexity

- **Time:** `O(n)` with a hash-based group-by (or `O(n log n)` with a sort-based one), where `n` is the row count.
- **Space:** `O(n)` for the grouping structure.
