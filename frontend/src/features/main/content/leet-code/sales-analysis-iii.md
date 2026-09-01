# 1084. Sales Analysis III

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Product` table (`product_id`, `product_name`) and a `Sales` table (`seller_id`, `product_id`, `buyer_id`, `sale_date`, `quantity`, `price`), write a query to report the products that were **only** sold in the spring of 2019 (between `2019-01-01` and `2019-03-31`, inclusive).

### Schema

```
Product: product_id (PK), product_name
Sales: seller_id, product_id (FK), buyer_id, sale_date, quantity, price
```

## Approach

Join `Sales` to `Product` and group by product. A product qualifies only if **every** one of its sales falls within the spring 2019 window — checking this is equivalent to verifying that both the earliest (`MIN`) and latest (`MAX`) sale dates for that product fall inside the range.

## SQL Solution

```sql
SELECT p.product_id, p.product_name
FROM Product p
JOIN Sales s ON p.product_id = s.product_id
GROUP BY p.product_id, p.product_name
HAVING MIN(s.sale_date) >= '2019-01-01' AND MAX(s.sale_date) <= '2019-03-31';
```

## Complexity

- **Time:** `O(n)` for the join and grouping scan.
- **Space:** `O(products)` for the grouped result.
