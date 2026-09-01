# 1174. Immediate Food Delivery II

**Difficulty:** Medium
**Category:** SQL, Database

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given a `Delivery` table (`delivery_id`, `customer_id`, `order_date`, `customer_pref_delivery_date`), find the percentage of immediate orders (`order_date == customer_pref_delivery_date`) among each customer's very first order, rounded to two decimal places.

### Schema

```
Delivery: delivery_id, customer_id, order_date, customer_pref_delivery_date
```

## Approach

Rank each customer's orders by `order_date` using `ROW_NUMBER()` partitioned by `customer_id`, keep only the rank-`1` (first) order per customer, then compute the immediate-order percentage over just that filtered set.

## SQL Solution

```sql
WITH FirstOrders AS (
    SELECT customer_id, order_date, customer_pref_delivery_date,
           ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS rn
    FROM Delivery
)
SELECT ROUND(
    100 * SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END) / COUNT(*),
    2
) AS immediate_percentage
FROM FirstOrders
WHERE rn = 1;
```

## Complexity

- **Time:** `O(n log n)` for the partitioned ranking.
- **Space:** `O(n)` for the intermediate ranked table.
