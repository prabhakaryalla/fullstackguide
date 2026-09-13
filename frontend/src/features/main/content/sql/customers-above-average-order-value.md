# Customers with Orders Above Average Value

## Example

### Input: `customers`

| customer_id | customer_name |
|---|---|
| 1 | Alice |
| 2 | Ben |

### Input: `orders`

| order_id | customer_id | total_amount |
|---|---|---|
| 100 | 1 | 20.00 |
| 101 | 2 | 100.00 |
| 102 | 1 | 30.00 |

### Expected Output

The average order value is (20 + 100 + 30) / 3 = 50.00. Only order 101 (100.00) is above it.

| customer_id | customer_name |
|---|---|
| 2 | Ben |

## Solution

Compare each order to the average order value, then return distinct customers.

```sql
SELECT DISTINCT c.customer_id, c.customer_name
FROM customers AS c
JOIN orders AS o ON o.customer_id = c.customer_id
WHERE o.total_amount > (SELECT AVG(total_amount) FROM orders);
```

## Tricky Interview Question

**Q: Why use `DISTINCT`?**

**A:** A customer may have several orders above average. `DISTINCT` returns that customer only once.