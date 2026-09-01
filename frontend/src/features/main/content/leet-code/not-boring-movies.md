# 620. Not Boring Movies

**Difficulty:** Easy
**Category:** SQL, Database

## Problem

Given a `cinema` table (`id`, `movie`, `description`, `rating`), write a query to report all movies with an odd-numbered `id` and a `description` that is not `"boring"`, sorted by `rating` in descending order.

### Schema

```
cinema: id (PK), movie, description, rating
```

## Approach

Filter rows where `id` is odd (using the modulo operator) and `description` is not equal to `"boring"`, then sort the remaining rows by `rating` descending.

## SQL Solution

```sql
SELECT *
FROM cinema
WHERE id % 2 = 1 AND description != 'boring'
ORDER BY rating DESC;
```

## Complexity

- **Time:** `O(n log n)` for the sort.
- **Space:** `O(n)` for the result set.
