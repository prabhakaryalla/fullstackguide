# 1565. Unique Orders and Customers Per Month

**Difficulty:** Easy
**Category:** Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a table `Orders(order_id, order_date, customer_id, invoice)`, for each month, return the count of orders and the count of distinct customers with invoices greater than `$20`.

### Example

```
Input: Orders: (1, "2020-09-15", 1, 30), (2, "2020-09-17", 2, 90)
Output: ("2020-09", 2, 2)
```

## Approach

This is a SQL problem (no C# solution applies). Filter to invoices greater than 20, format the order date as `YYYY-MM`, then group by that month and count total orders (`COUNT(*)`) alongside distinct customers (`COUNT(DISTINCT customer_id)`).

```sql
SELECT
    DATE_FORMAT(order_date, '%Y-%m') AS month,
    COUNT(order_id) AS order_count,
    COUNT(DISTINCT customer_id) AS customer_count
FROM Orders
WHERE invoice > 20
GROUP BY month;
```

## Complexity

- **Time:** `O(n)` — a single pass to filter and group all orders.
- **Space:** `O(n)` for the grouped result set.
