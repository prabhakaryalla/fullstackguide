# 1511. Customer Order Frequency

**Difficulty:** Easy
**Category:** Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given tables `Customers(customer_id, name, country)`, `Product(product_id, description, price)`, and `Orders(order_id, customer_id, product_id, order_date, quantity)`, find customers who spent at least $100 in both June 2020 and July 2020.

### Example

```
Input:
Orders include customer 1 spending 160 in June and 110 in July.
Output: [(1, "Winston", "USA")]
```

## Approach

This is a SQL problem (no C# solution applies). Join `Orders` with `Product` to compute `quantity * price` per order, group by customer and month, then pivot the June/July totals per customer and keep only rows where both totals are `>= 100`.

```sql
SELECT c.customer_id, c.name, c.country
FROM Customers c
WHERE c.customer_id IN (
    SELECT o.customer_id
    FROM Orders o
    JOIN Product p ON o.product_id = p.product_id
    WHERE o.order_date BETWEEN '2020-06-01' AND '2020-06-30'
    GROUP BY o.customer_id
    HAVING SUM(o.quantity * p.price) >= 100
) AND c.customer_id IN (
    SELECT o.customer_id
    FROM Orders o
    JOIN Product p ON o.product_id = p.product_id
    WHERE o.order_date BETWEEN '2020-07-01' AND '2020-07-31'
    GROUP BY o.customer_id
    HAVING SUM(o.quantity * p.price) >= 100
);
```

## Complexity

- **Time:** `O(n)` — a constant number of passes over the `Orders` table.
- **Space:** `O(n)` for the grouped intermediate results.
