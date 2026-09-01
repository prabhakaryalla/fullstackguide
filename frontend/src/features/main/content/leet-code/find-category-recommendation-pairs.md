# 3554. Find Category Recommendation Pairs

**Difficulty:** Hard
**Category:** Database

## Problem
Table `ProductPurchases` has columns `user_id`, `product_id`, `quantity`, where `(user_id, product_id)` is the unique key, each row representing a purchase of a product by a user.

Table `ProductInfo` has columns `product_id`, `category`, `price`, where `product_id` is the unique key, assigning a category and price to each product.

Write a solution to:
1. Find all category pairs (where `category1 < category2`).
2. For each category pair, determine the number of unique customers who purchased products from both categories.

A category pair is reportable if at least `3` different customers purchased products from both categories.

Return the result table of reportable category pairs ordered by `customer_count` in descending order, and in case of a tie, by `category1` ascending, then by `category2` ascending.

### Example

```
ProductPurchases: (1,101,2), (1,102,1), (1,201,3), (1,301,1), (2,101,1), (2,102,2), (2,103,1), (2,201,5), ...
ProductInfo: (101,'Electronics',100), (102,'Books',20), (103,'Books',35), (201,'Clothing',45), ...

Output:
| category1   | category2   | customer_count |
| Books       | Clothing    | 3              |
| Books       | Electronics | 3              |
| Clothing    | Electronics | 3              |
| Electronics | Sports      | 3              |
```

## Approach
First, derive the distinct set of `(user_id, category)` pairs a user has purchased from by joining `ProductPurchases` with `ProductInfo`. Then self-join this set on `user_id` where `category1 < category2` to enumerate every category pair a user touched, group by the pair, count distinct users, and filter to pairs with at least 3 customers.

## SQL Solution

```sql
WITH UserCategories AS (
    SELECT DISTINCT pp.user_id, pi.category
    FROM ProductPurchases pp
    JOIN ProductInfo pi ON pp.product_id = pi.product_id
),
CategoryPairs AS (
    SELECT uc1.category AS category1, uc2.category AS category2, uc1.user_id
    FROM UserCategories uc1
    JOIN UserCategories uc2
      ON uc1.user_id = uc2.user_id AND uc1.category < uc2.category
)
SELECT category1, category2, COUNT(DISTINCT user_id) AS customer_count
FROM CategoryPairs
GROUP BY category1, category2
HAVING COUNT(DISTINCT user_id) >= 3
ORDER BY customer_count DESC, category1 ASC, category2 ASC;
```

## Complexity

- **Time:** O(p^2) per user in the worst case for the self-join, where p is categories per user.
- **Space:** O(u * c^2), for the intermediate category-pair rows.
