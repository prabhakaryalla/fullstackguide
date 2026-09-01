# 1532. The Most Recent Three Orders

**Difficulty:** Medium
**Category:** Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given tables `Customers(customer_id, name)` and `Orders(order_id, order_date, customer_id, cost)`, return the three most recent orders for each customer. If a customer has fewer than three orders, return all of them. Order the result by customer name, then by order date descending.

### Example

```
Input: multiple orders per customer with varying dates
Output: up to 3 most recent orders per customer, sorted by name then date descending
```

## Approach

This is a SQL problem (no C# solution applies). Rank each customer's orders by `order_date` descending (breaking ties by `order_id` descending, per the problem's tie-breaking rule) using `ROW_NUMBER()` partitioned by `customer_id`, then keep only ranks `1` through `3`.

```sql
SELECT name AS customer_name, customer_id, order_id, order_date
FROM (
    SELECT c.name, o.customer_id, o.order_id, o.order_date,
           ROW_NUMBER() OVER (
               PARTITION BY o.customer_id
               ORDER BY o.order_date DESC, o.order_id DESC
           ) AS rn
    FROM Orders o
    JOIN Customers c ON o.customer_id = c.customer_id
) ranked
WHERE rn <= 3
ORDER BY customer_name ASC, customer_id ASC, order_date DESC;
```

## Complexity

- **Time:** `O(n log n)` — sorting orders within each customer partition.
- **Space:** `O(n)` for the ranked intermediate result.
