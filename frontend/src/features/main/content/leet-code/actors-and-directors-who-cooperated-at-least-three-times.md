# 1050. Actors and Directors Who Cooperated At Least Three Times

**Difficulty:** Easy
**Category:** SQL, Database

## Problem

Given an `ActorDirector` table (`actor_id`, `director_id`, `timestamp`) recording each collaboration event, write a query to find every `(actor_id, director_id)` pair that cooperated together at least `3` times.

### Schema

```
ActorDirector: actor_id, director_id, timestamp
```

## Approach

Group the rows by the `(actor_id, director_id)` pair and count how many collaboration events each pair has. Keep only the groups whose count is `3` or more.

## SQL Solution

```sql
SELECT actor_id, director_id
FROM ActorDirector
GROUP BY actor_id, director_id
HAVING COUNT(*) >= 3;
```

## Complexity

- **Time:** `O(n)` for the grouping scan over `n` collaboration rows.
- **Space:** `O(pairs)` for the grouped result.
