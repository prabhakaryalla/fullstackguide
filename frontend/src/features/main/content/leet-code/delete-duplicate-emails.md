# 196. Delete Duplicate Emails

**Difficulty:** Easy
**Category:** SQL, Database

## Problem

Given a `Person` table (`id`, `email`), delete all duplicate rows by email, keeping only the row with the smallest `id` for each email.

### Schema

```
Person: id (PK), email
```

## Approach

Self-join the table to itself on matching emails but different ids, then delete the row from the copy whose `id` is larger — this removes every duplicate while always keeping the smallest-id row for each email.

## SQL Solution

```sql
DELETE p1
FROM Person p1
JOIN Person p2 ON p1.email = p2.email AND p1.id > p2.id;
```

## Complexity

- **Time:** `O(n)` with an index on `email`, where `n` is the row count.
- **Space:** `O(1)` extra.
