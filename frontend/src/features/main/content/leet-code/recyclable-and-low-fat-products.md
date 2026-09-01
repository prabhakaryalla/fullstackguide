# 1757. Recyclable and Low Fat Products

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Products` table (`product_id`, `low_fats`, `recyclable`), each an enum of `'Y'`/`'N'`, return the ids of products that are both low fat and recyclable.

### Schema

```
Products: product_id, low_fats, recyclable
```

## Approach

Filter the rows where both flags equal `'Y'`.

## SQL Solution

```sql
SELECT product_id
FROM Products
WHERE low_fats = 'Y' AND recyclable = 'Y';
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
