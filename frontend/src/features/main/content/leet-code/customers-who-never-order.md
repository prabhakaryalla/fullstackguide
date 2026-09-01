# 183. Customers Who Never Order

**Difficulty:** Easy
**Category:** SQL, Database

## Problem

Given a `Customers` table (`id`, `name`) and an `Orders` table (`id`, `customerId`), find customers who never placed an order.

### Schema

```
Customers: id (PK), name
Orders: id (PK), customerId (FK)
```

## Approach

Use a `LEFT JOIN` from `Customers` to `Orders`, then filter for rows where the join found no matching order (`Orders.id IS NULL`). Equivalently, a `NOT IN` / `NOT EXISTS` subquery against `Orders.customerId` works too.

## SQL Solution

```sql
SELECT c.name AS Customers
FROM Customers c
LEFT JOIN Orders o ON c.id = o.customerId
WHERE o.id IS NULL;
```

## Complexity

- **Time:** `O(n + m)` with an index on `Orders.customerId`.
- **Space:** `O(n)` for the result set.
