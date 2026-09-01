# 3293. Calculate Product Final Price

**Difficulty:** Medium
**Category:** Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Write a solution to compute the final selling price of every product after applying its discount. Products without a matching row in `Discounts` are considered to have a `0%` discount. Round the final price to 2 decimal places. Return `product_id` and `final_price`, ordered by `product_id` ascending.

### Schema

```sql
Create table If Not Exists Products (product_id int, price decimal(10,2))
Create table If Not Exists Discounts (product_id int, discount_percent decimal(5,2))
```

## Approach
Left join `Products` to `Discounts` on `product_id` so every product is kept even without a discount row. Use `IFNULL` to treat a missing discount as `0`, then compute `price * (1 - discount_percent / 100)` and round the result to 2 decimal places.

## SQL Solution

```sql
SELECT
    p.product_id,
    ROUND(p.price * (1 - IFNULL(d.discount_percent, 0) / 100), 2) AS final_price
FROM Products p
LEFT JOIN Discounts d ON p.product_id = d.product_id
ORDER BY p.product_id;
```

## Complexity

- **Time:** O(n + m), where n and m are the row counts of `Products` and `Discounts`.
- **Space:** O(n) for the result set.
