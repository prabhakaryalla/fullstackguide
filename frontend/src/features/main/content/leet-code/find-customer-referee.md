# 584. Find Customer Referee

**Difficulty:** Easy
**Category:** SQL, Database

## Problem

Given a `Customer` table (`id`, `name`, `referee_id`), write a query to report the names of customers who are not referred by the customer with `id = 2`.

### Schema

```
Customer: id (PK), name, referee_id
```

## Approach

Select customers whose `referee_id` is either missing (`NULL`, meaning no referrer) or explicitly not equal to `2`. Using `OR referee_id IS NULL` is necessary because SQL's `!=` comparison against `NULL` never evaluates to true, which would otherwise silently exclude customers with no referrer.

## SQL Solution

```sql
SELECT name
FROM Customer
WHERE referee_id IS NULL OR referee_id != 2;
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of customers.
- **Space:** `O(n)` for the result set.
