# 1607. Sellers With No Sales

**Difficulty:** Easy
**Category:** SQL, Database

## Problem

Given `Seller`, `Product`, and `Orders` tables, report the names of all sellers who did not make any sales in 2020.

### Schema

```
Seller: seller_id (PK), seller_name, daily_rate, account_type
Product: product_id (PK), product_name
Orders: order_id (PK), sale_date, order_id, quantity, product_id, seller_id
```

## Approach

Select sellers whose `seller_id` never appears in `Orders` rows dated in 2020. Use a `LEFT JOIN` against a filtered subquery of 2020 orders and keep only rows where no match was found, or equivalently a `NOT IN` against the 2020 seller IDs.

## SQL Solution

```sql
SELECT seller_name
FROM Seller
WHERE seller_id NOT IN (
    SELECT seller_id
    FROM Orders
    WHERE YEAR(sale_date) = 2020
)
ORDER BY seller_name;
```

## Complexity

- **Time:** `O(n + m)`, where `n` is the number of sellers and `m` the number of orders.
- **Space:** `O(n)` for the result set.
