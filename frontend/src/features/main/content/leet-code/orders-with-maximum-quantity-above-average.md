# 1867. Orders With Maximum Quantity Above Average

**Difficulty:** Medium
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an `OrdersDetails` table (`order_id`, `product_id`, `quantity`), for each order compute its average product quantity; return the `order_id`s whose **maximum** product quantity within that order exceeds the average quantity of every order (i.e., exceeds the highest per-order average across all orders).

### Schema

```
OrdersDetails: order_id, product_id, quantity
```

## Approach

Group by `order_id` to compute each order's maximum quantity, and use a window function `MAX(AVG(quantity)) OVER ()` to compute the largest per-order average across the whole table in the same pass. Filter to orders whose maximum quantity exceeds that overall largest average.

## SQL Solution

```sql
WITH GroupedOrders AS (
    SELECT
        order_id,
        MAX(quantity) AS max_quantity,
        MAX(AVG(quantity)) OVER () AS max_avg_quantity
    FROM OrdersDetails
    GROUP BY order_id
)
SELECT order_id
FROM GroupedOrders
WHERE max_quantity > max_avg_quantity;
```

## Complexity

- **Time:** `O(n log n)` for the grouping and window aggregation.
- **Space:** `O(orders)` for the intermediate CTE.
