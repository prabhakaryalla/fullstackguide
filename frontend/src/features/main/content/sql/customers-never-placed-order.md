# Retrieve Customers Who Never Placed an Order

## Example

### Input: `customers`

| customer_id | customer_name |
|---|---|
| 1 | Alice |
| 2 | Ben |
| 3 | Carla |

### Input: `orders`

| order_id | customer_id | order_date |
|---|---|---|
| 100 | 1 | 2025-01-05 |
| 101 | 1 | 2025-02-10 |

### Expected Output

| customer_id | customer_name |
|---|---|
| 2 | Ben |
| 3 | Carla |

## Solution

`NOT EXISTS` avoids duplicate customer rows and expresses the anti-join directly.

```sql
SELECT c.customer_id, c.customer_name
FROM customers AS c
WHERE NOT EXISTS (
  SELECT 1
  FROM orders AS o
  WHERE o.customer_id = c.customer_id
);
```

## Tricky Interview Question

**A:** `NOT IN` can produce unexpected results when its subquery contains `NULL`. `NOT EXISTS` directly checks whether a matching order exists.