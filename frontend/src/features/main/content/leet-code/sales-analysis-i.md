# 1082. Sales Analysis I

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Sales` table (`seller_id`, `product_id`, `buyer_id`, `sale_date`, `quantity`, `price`), write a query to report the best seller(s) by total sales price. If there's a tie, report all tied sellers.

### Schema

```
Sales: seller_id, product_id, buyer_id, sale_date, quantity, price
```

## Approach

Group sales rows by `seller_id` and sum each seller's `price` values to get total revenue. Compare that against the overall best total (computed via a subquery that groups, sums, orders descending, and takes the top value), keeping every seller that ties for the maximum.

## SQL Solution

```sql
SELECT seller_id
FROM Sales
GROUP BY seller_id
HAVING SUM(price) = (
    SELECT SUM(price) AS total
    FROM Sales
    GROUP BY seller_id
    ORDER BY total DESC
    LIMIT 1
);
```

## Complexity

- **Time:** `O(n)` for the grouping scans.
- **Space:** `O(sellers)` for the grouped results.
