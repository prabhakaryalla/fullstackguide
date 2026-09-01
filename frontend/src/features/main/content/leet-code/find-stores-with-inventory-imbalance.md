# 3626. Find Stores with Inventory Imbalance

**Difficulty:** Medium
**Category:** Database

## Problem
Table `stores` has columns `store_id`, `store_name`, `location`. Table `inventory` has columns `inventory_id`, `store_id`, `product_name`, `quantity`, `price`.

Find stores with inventory imbalance: stores where the most expensive product has a lower stock quantity than the cheapest product.

- For each store, identify the most expensive product (and its quantity) and the cheapest product (and its quantity).
- A store has inventory imbalance if the most expensive product's quantity is strictly less than the cheapest product's quantity.
- Compute the imbalance ratio as `cheapest_quantity / most_expensive_quantity`, rounded to 2 decimal places.
- Only include stores with at least 3 different products.

Return the result table ordered by imbalance ratio descending, then by store name ascending.

## Approach
Rank each store's products by price descending and ascending (breaking ties by product name) using window functions, together with a per-store product count. Pick the top-ranked row from each ordering as the "most expensive" and "cheapest" product respectively, join them back to `stores`, and filter for stores with at least 3 products where the most expensive product's quantity is less than the cheapest product's quantity.

## SQL Solution

```sql
WITH ranked AS (
    SELECT
        store_id,
        product_name,
        quantity,
        price,
        ROW_NUMBER() OVER (PARTITION BY store_id ORDER BY price DESC, product_name ASC) AS rn_desc,
        ROW_NUMBER() OVER (PARTITION BY store_id ORDER BY price ASC, product_name ASC) AS rn_asc,
        COUNT(*) OVER (PARTITION BY store_id) AS product_count
    FROM inventory
),
most_exp AS (
    SELECT store_id, product_name AS most_exp_product, quantity AS most_exp_qty
    FROM ranked
    WHERE rn_desc = 1
),
cheapest AS (
    SELECT store_id, product_name AS cheapest_product, quantity AS cheapest_qty, product_count
    FROM ranked
    WHERE rn_asc = 1
)
SELECT
    s.store_id,
    s.store_name,
    s.location,
    m.most_exp_product,
    c.cheapest_product,
    ROUND(c.cheapest_qty / m.most_exp_qty, 2) AS imbalance_ratio
FROM stores s
JOIN most_exp m ON m.store_id = s.store_id
JOIN cheapest c ON c.store_id = s.store_id
WHERE c.product_count >= 3
  AND m.most_exp_qty < c.cheapest_qty
ORDER BY imbalance_ratio DESC, s.store_name ASC;
```

## Complexity

- **Time:** O(n log n), where n is the number of inventory rows.
- **Space:** O(n)
