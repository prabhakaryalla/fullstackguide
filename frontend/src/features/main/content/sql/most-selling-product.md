# Identify the Best-Selling Product

## Example

### Input: `products`

| product_id | product_name |
|---|---|
| 1 | Laptop |
| 2 | Phone |

### Input: `order_items`

| order_item_id | product_id | quantity |
|---|---|---|
| 1 | 1 | 3 |
| 2 | 2 | 10 |
| 3 | 1 | 2 |

### Expected Output

Laptop sold 3 + 2 = 5 units; Phone sold 10 units.

| product_id | product_name | units_sold |
|---|---|---|
| 2 | Phone | 10 |

## Solution

Sum quantities by product and use a deterministic tie-breaker.

```sql
SELECT p.product_id, p.product_name, SUM(oi.quantity) AS units_sold
FROM products AS p
JOIN order_items AS oi ON oi.product_id = p.product_id
GROUP BY p.product_id, p.product_name
ORDER BY units_sold DESC, p.product_id
FETCH FIRST 1 ROW ONLY;
```

### PostgreSQL: Include Ties

Use `FETCH FIRST ... WITH TIES` when every product tied for the highest quantity should be returned.

```sql
SELECT p.product_id, p.product_name, SUM(oi.quantity) AS units_sold
FROM products AS p
JOIN order_items AS oi ON oi.product_id = p.product_id
GROUP BY p.product_id, p.product_name
ORDER BY units_sold DESC
FETCH FIRST 1 ROW WITH TIES;
```

## Tricky Interview Question

**Q: How do you return exactly one product when there is a tie?**

**A:** Use `FETCH FIRST 1 ROW ONLY` or `LIMIT 1` with a deterministic tie-breaker such as `product_id`.