# 1596. The Most Frequently Ordered Products for Each Customer

**Difficulty:** Medium
**Category:** Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given tables `Customers(customer_id, name)`, `Orders(order_id, order_date, customer_id, product_id)`, and `Products(product_id, product_name, price)`, find each customer's most frequently ordered product(s) (there may be ties).

### Example

```
Input: multiple orders per customer for different products
Output: for each customer, the product_id(s) with the highest order count
```

## Approach

This is a SQL problem (no C# solution applies). Group `Orders` by customer and product to get each pairing's order count, then for each customer keep only the product(s) whose count matches that customer's maximum count (using a window function or a correlated subquery for the per-customer maximum).

```sql
SELECT customer_id, product_id, product_name
FROM (
    SELECT o.customer_id, o.product_id, p.product_name, COUNT(*) AS cnt,
           RANK() OVER (PARTITION BY o.customer_id ORDER BY COUNT(*) DESC) AS rnk
    FROM Orders o
    JOIN Products p ON o.product_id = p.product_id
    GROUP BY o.customer_id, o.product_id, p.product_name
) ranked
WHERE rnk = 1;
```

## Complexity

- **Time:** `O(n log n)` — grouping and ranking orders per customer.
- **Space:** `O(n)` for the grouped intermediate result.
