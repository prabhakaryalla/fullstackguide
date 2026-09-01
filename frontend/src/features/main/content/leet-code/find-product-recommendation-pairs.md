# 3521. Find Product Recommendation Pairs

**Difficulty:** Medium
**Category:** SQL, Database

## Problem
You are given a `ProductPurchases` table (`user_id`, `product_id`, `purchase_date`) and a `ProductInfo` table (`product_id`, `product_name`, `category`, `price`). Two distinct products are considered "recommendation pairs" if they were purchased by the same customer(s). Find all pairs of distinct products `(product1_id, product2_id)` with `product1_id < product2_id` such that at least **3 different customers** purchased both products. Return `product1_id`, `product2_id`, their respective categories (`product1_category`, `product2_category`), and the number of shared customers (`customer_count`), ordered by `customer_count` descending, then by `product1_id` and `product2_id` ascending.

### Example
If products `101` and `102` were both purchased by users `1`, `2`, and `3`, the pair `(101, 102)` qualifies with `customer_count = 3`.

## Approach
Self-join `ProductPurchases` on `user_id` to find every pair of products bought by the same user, keeping only pairs where `product1_id < product2_id` to avoid duplicates and self-pairs. Join `ProductInfo` twice (once per product) to fetch each product's category. Group by the product pair and category columns, count the distinct purchasing users per pair, and filter with `HAVING COUNT(...) >= 3`. Finally sort by `customer_count` descending, then by the two product ids ascending.

## SQL Solution

```sql
SELECT
    P1.product_id AS product1_id,
    P2.product_id AS product2_id,
    PI1.category AS product1_category,
    PI2.category AS product2_category,
    COUNT(DISTINCT P1.user_id) AS customer_count
FROM ProductPurchases AS P1
INNER JOIN ProductPurchases AS P2
    ON P1.user_id = P2.user_id
LEFT JOIN ProductInfo AS PI1
    ON P1.product_id = PI1.product_id
LEFT JOIN ProductInfo AS PI2
    ON P2.product_id = PI2.product_id
WHERE P1.product_id < P2.product_id
GROUP BY P1.product_id, P2.product_id, PI1.category, PI2.category
HAVING COUNT(DISTINCT P1.user_id) >= 3
ORDER BY customer_count DESC, product1_id, product2_id;
```

## Complexity

- **Time:** O(P^2) in the worst case for the self-join across purchases, where `P` is the number of purchase rows (bounded by available indexes on `user_id`)
- **Space:** O(P^2) for the intermediate joined result set before aggregation
