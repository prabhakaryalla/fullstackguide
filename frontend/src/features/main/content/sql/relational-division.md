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

## Alternative: COUNT/HAVING Approach

```sql
SELECT o.customer_id
FROM orders AS o
JOIN order_items AS oi ON oi.order_id = o.order_id
WHERE oi.product_id IN (SELECT product_id FROM required_products)
GROUP BY o.customer_id
HAVING COUNT(DISTINCT oi.product_id) = (SELECT COUNT(*) FROM required_products);
```

This counts how many *distinct* required products each customer actually bought, and keeps only customers whose count equals the total number of required products. It's often more intuitive to read than double-`NOT EXISTS`, but can be less efficient on very large `required_products` sets since it materializes and counts matches rather than short-circuiting on the first missing item.

## Alternative: EXCEPT-Based Approach

```sql
SELECT c.customer_id
FROM customers AS c
WHERE NOT EXISTS (
  SELECT product_id FROM required_products
  EXCEPT
  SELECT oi.product_id
  FROM orders AS o
  JOIN order_items AS oi ON oi.order_id = o.order_id
  WHERE o.customer_id = c.customer_id
);
```

`EXCEPT` computes "required products minus this customer's purchased products" — if that difference is empty, the customer bought everything required. This reads closer to the plain-English problem statement than either of the other two approaches.

## Performance Note

For a **large** `required_products` set, the double-`NOT EXISTS` pattern is usually fastest because it can short-circuit as soon as one missing product is found for a customer — it doesn't need to enumerate every required product for every customer the way COUNT/HAVING does. Relational division is rarely a good fit when the "required set" itself is very large and changes per query (e.g. thousands of ad hoc criteria) — at that scale, a bitmap/set-intersection approach outside plain SQL may be more appropriate.

## Tricky / Follow-up Questions

**Q: Why is this sometimes called the double-`NOT EXISTS` pattern?**

**A:** The first check asks whether a required item is missing. The second check asks whether any missing item exists. No missing item means the customer passed.