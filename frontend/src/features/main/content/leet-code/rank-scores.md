# 178. Rank Scores

**Difficulty:** Medium
**Category:** SQL, Database

## Problem

Given a `Scores` table (`id`, `score`), write a query to rank the scores. Ties should receive the same rank, and the next rank after a tie should skip the number of tied entries (dense ranking, but leaving no gaps between distinct rank values — i.e. "dense rank").

### Schema

```
Scores: id (PK), score
```

## Approach

For each score, count the number of distinct scores greater than or equal to it — that count is exactly its dense rank. This can be expressed with a correlated subquery, or more idiomatically with the `DENSE_RANK()` window function where supported.

## SQL Solution

```sql
SELECT
    score,
    DENSE_RANK() OVER (ORDER BY score DESC) AS "rank"
FROM Scores
ORDER BY score DESC;
```

## Complexity

- **Time:** `O(n log n)` for the sort/window computation, where `n` is the number of scores.
- **Space:** `O(n)` for the result set.
