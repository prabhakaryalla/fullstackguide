# 607. Sales Person

**Difficulty:** Easy
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given `SalesPerson`, `Company`, and `Orders` tables, write a query to report the names of all sales persons who did not have any orders with the company named `"RED"`.

### Schema

```
SalesPerson: sales_id (PK), name, salary, commission_rate, hire_date
Company: com_id (PK), name, city
Orders: order_id (PK), order_date, com_id (FK), sales_id (FK), amount
```

## Approach

First identify every `sales_id` that has at least one order placed with the `"RED"` company, by joining `Orders` to `Company`. Then select sales persons whose id does *not* appear in that set, ensuring only salespeople with zero involvement with `"RED"` are reported.

## SQL Solution

```sql
SELECT s.name
FROM SalesPerson s
WHERE s.sales_id NOT IN (
    SELECT o.sales_id
    FROM Orders o
    JOIN Company c ON o.com_id = c.com_id
    WHERE c.name = 'RED'
);
```

## Complexity

- **Time:** `O(n + m)`, where `n` and `m` are the row counts of `Orders` and `SalesPerson`.
- **Space:** `O(n)` for the excluded sales id set.
