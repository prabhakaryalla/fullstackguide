# 1173. Immediate Food Delivery I

**Difficulty:** Easy
**Category:** SQL, Database

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given a `Delivery` table (`delivery_id`, `customer_id`, `order_date`, `customer_pref_delivery_date`), an order is "immediate" if `order_date` equals `customer_pref_delivery_date`. Return the percentage of immediate orders, rounded to two decimal places.

### Schema

```
Delivery: delivery_id, customer_id, order_date, customer_pref_delivery_date
```

## Approach

Sum up a `1`/`0` indicator for whether each order is immediate, divide by the total number of orders, and multiply by `100` to express it as a percentage.

## SQL Solution

```sql
SELECT ROUND(
    100 * SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END) / COUNT(*),
    2
) AS immediate_percentage
FROM Delivery;
```

## Complexity

- **Time:** `O(n)` for the full-table aggregate scan.
- **Space:** `O(1)` for the scalar result.
