# Calculate Total Revenue per Product

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
| 3 | 1 | 1 | 25.00 |

### Expected Output

| product_id | product_name | total_revenue |
|---|---|---|
| 1 | Keyboard | 75.00 |
| 2 | Mouse | 50.00 |

## Solution

Calculate line revenue before aggregating it by product.

```sql
SELECT p.product_id, p.product_name,
       SUM(oi.quantity * oi.unit_price) AS total_revenue
FROM products AS p
JOIN order_items AS oi ON oi.product_id = p.product_id
GROUP BY p.product_id, p.product_name
ORDER BY total_revenue DESC;
```

## Tricky Interview Question

**Q: Why calculate `quantity * unit_price` before `SUM`?**

**A:** Each line can have a different quantity and price. First calculate each line's value, then add the line values.