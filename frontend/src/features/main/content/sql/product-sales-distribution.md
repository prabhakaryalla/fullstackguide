# Show Product Sales Distribution

## Example

### Input: `products`

| product_id | product_name |
|---|---|
| 1 | Keyboard |
| 2 | Mouse |

### Input: `order_items`

| order_item_id | product_id | quantity | unit_price |
|---|---|---|---|
| 1 | 1 | 2 | 25.00 |
| 2 | 2 | 5 | 10.00 |

### Expected Output

Both products earn 50.00 out of a 100.00 total, so each is 50%.

| product_id | product_name | revenue | revenue_percent |
|---|---|---|---|
| 1 | Keyboard | 50.00 | 50.00 |
| 2 | Mouse | 50.00 | 50.00 |

## Solution

Calculate each product's revenue as a percentage of all product revenue.

```sql
WITH product_revenue AS (
  SELECT p.product_id, p.product_name,
         SUM(oi.quantity * oi.unit_price) AS revenue
  FROM products AS p
  JOIN order_items AS oi ON oi.product_id = p.product_id
  GROUP BY p.product_id, p.product_name
)
SELECT product_id, product_name, revenue,
       ROUND(100.0 * revenue / NULLIF(SUM(revenue) OVER (), 0), 2) AS revenue_percent
FROM product_revenue
ORDER BY revenue_percent DESC;
```

## Tricky Interview Question

**Q: Why use `NULLIF` in the percentage calculation?**

**A:** It prevents division by zero when there is no product revenue.