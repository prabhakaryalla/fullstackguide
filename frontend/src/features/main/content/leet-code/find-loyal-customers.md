# 3657. Find Loyal Customers

**Difficulty:** Medium
**Category:** Database

## Problem
Given a table of customer orders (with columns such as `customer_id`, `order_id`, and `order_date`), find "loyal customers" — customers who have placed orders in a sufficiently consistent or frequent pattern over time (for example, customers who have placed at least one order in each of the last several consecutive months, or who have a minimum total number of orders above a threshold). Return the `customer_id` of each loyal customer, ordered by `customer_id`.

## Approach
Aggregate orders per customer, computing metrics such as the total order count and the distinct number of months/periods in which the customer ordered. Filter customers whose aggregated metrics meet the loyalty threshold (e.g., `COUNT(DISTINCT month) >= required_months` or `COUNT(order_id) >= min_orders`), then select and order the qualifying `customer_id` values.

## SQL Solution

```sql
SELECT customer_id
FROM Orders
GROUP BY customer_id
HAVING COUNT(DISTINCT DATE_FORMAT(order_date, '%Y-%m')) >= 3
ORDER BY customer_id;
```

## Complexity

- **Time:** O(n log n) for the grouping/sort, where n is the number of orders
- **Space:** O(n) for the intermediate grouping
