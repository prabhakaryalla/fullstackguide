# Relational Division Queries

## Example

### Input: `required_products`

| product_id |
|---|
| 100 |
| 200 |

### Input: purchased products per customer (joined from `orders` and `order_items`)

| customer_id | product_id |
|---|---|
| 1 | 100 |
| 1 | 200 |
| 2 | 100 |

### Expected Output

Alice (customer 1) bought both required products. Ben (customer 2) is missing product 200, so he is excluded.

| customer_id |
|---|
| 1 |

## Solution

Relational division means finding rows related to every item in another set. For example, find customers who bought every required product.

```sql
SELECT c.customer_id
FROM customers AS c
WHERE NOT EXISTS (
  SELECT 1
  FROM required_products AS r
  WHERE NOT EXISTS (
    SELECT 1
    FROM orders AS o
    JOIN order_items AS oi ON oi.order_id = o.order_id
    WHERE o.customer_id = c.customer_id
      AND oi.product_id = r.product_id
  )
);
```

The inner `NOT EXISTS` finds a required product the customer did not buy. The outer `NOT EXISTS` keeps customers for whom no required product is missing.

## Tricky / Follow-up Questions

**Q: Why is this sometimes called the double-`NOT EXISTS` pattern?**

**A:** The first check asks whether a required item is missing. The second check asks whether any missing item exists. No missing item means the customer passed.