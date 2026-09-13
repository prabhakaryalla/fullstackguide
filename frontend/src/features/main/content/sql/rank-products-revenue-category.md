# Rank Products by Revenue in Each Category

## Example

### Input: `products`

| product_id | product_name | category_id |
|---|---|---|
| 1 | Keyboard | 100 |
| 2 | Mouse | 100 |
| 3 | Desk | 200 |

### Input: `order_items`

| order_item_id | product_id | quantity | unit_price |
|---|---|---|---|
| 1 | 1 | 2 | 25.00 |
| 2 | 2 | 5 | 10.00 |
| 3 | 3 | 1 | 150.00 |

### Expected Output

Keyboard and Mouse tie at 50.00 revenue in category 100, so both get rank 1.

| category_id | product_id | product_name | revenue | category_rank |
|---|---|---|---|---|
| 100 | 1 | Keyboard | 50.00 | 1 |
| 100 | 2 | Mouse | 50.00 | 1 |
| 200 | 3 | Desk | 150.00 | 1 |

## Solution

Aggregate revenue first, then rank products within each category.

```sql
WITH product_revenue AS (
  SELECT p.category_id, p.product_id, p.product_name,
         SUM(oi.quantity * oi.unit_price) AS revenue
  FROM products AS p
  JOIN order_items AS oi ON oi.product_id = p.product_id
  GROUP BY p.category_id, p.product_id, p.product_name
)
SELECT *, DENSE_RANK() OVER (PARTITION BY category_id ORDER BY revenue DESC) AS category_rank
FROM product_revenue;
```

## Tricky Interview Question

**Q: What is the difference between `RANK` and `DENSE_RANK` here?**

**A:** `RANK` leaves a gap after tied products. `DENSE_RANK` gives the next product the next number without a gap.