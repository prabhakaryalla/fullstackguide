# 1549. The Most Recent Orders for Each Product

**Difficulty:** Medium
**Category:** Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given tables `Customers(customer_id, name)`, `Product(product_id, product_name)`, and `Orders(order_id, order_date, customer_id, product_id)`, for each product return the most recent order date(s) and the corresponding order id(s) — a product may have multiple orders tied for the latest date.

### Example

```
Input: Orders include multiple orders per product with different dates
Output: for each product, the order(s) with the maximum order_date
```

## Approach

This is a SQL problem (no C# solution applies). For each product, find its maximum `order_date` (using a correlated subquery or a join against a per-product max-date aggregate), then join back to `Orders` and `Product` to fetch every order matching that maximum date.

```sql
SELECT p.product_name, o.product_id, o.order_id, o.order_date
FROM Orders o
JOIN Product p ON o.product_id = p.product_id
WHERE (o.product_id, o.order_date) IN (
    SELECT product_id, MAX(order_date)
    FROM Orders
    GROUP BY product_id
)
ORDER BY p.product_name ASC, o.product_id ASC, o.order_id ASC;
```

## Complexity

- **Time:** `O(n)` — grouping to find max dates plus a join back to the orders.
- **Space:** `O(n)` for the grouped intermediate result.
