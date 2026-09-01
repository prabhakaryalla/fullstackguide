# 2084. Drop Type 1 Orders for Customers With Type 0 Orders

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Table `Orders(order_id, customer_id, order_type)` where `order_type` is `'0'` or `'1'`. If a customer has placed at least one type `0` order, drop all of their type `1` orders (only keep their type `0` orders). Customers with no type `0` orders keep all of their type `1` orders unchanged. Return the resulting set of orders.

### Schema

```
Orders: order_id (PK), customer_id, order_type ('0'|'1')
```

## Approach

Keep a row if it is itself a type `0` order, or if the customer placing it has no type `0` order at all (checked with a correlated `NOT EXISTS` subquery).

## SQL Solution

```sql
SELECT order_id, customer_id, order_type
FROM Orders o
WHERE
    order_type = '0'
    OR NOT EXISTS (
        SELECT 1
        FROM Orders o2
        WHERE o2.customer_id = o.customer_id AND o2.order_type = '0'
    );
```

## Complexity

- **Time:** O(n^2) in the worst case without an index on `customer_id`, O(n log n) with one
- **Space:** O(n)
