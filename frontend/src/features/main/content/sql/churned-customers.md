# Find Churned Customers

## Example

Assume the current date is 2025-06-15.

### Input: `customers`

| customer_id | customer_name |
|---|---|
| 1 | Alice |
| 2 | Ben |

### Input: `orders`

| order_id | customer_id | order_date |
|---|---|---|
| 100 | 1 | 2025-06-01 |
| 101 | 2 | 2024-10-01 |

### Expected Output

Ben's last order was 2024-10-01, before the 6-month cutoff of 2024-12-15.

| customer_id | customer_name |
|---|---|
| 2 | Ben |

## Solution

A churned customer has no order in the six months before the current date.

### SQL Server

```sql
SELECT c.customer_id, c.customer_name
FROM customers AS c
WHERE NOT EXISTS (
  SELECT 1
  FROM orders AS o
  WHERE o.customer_id = c.customer_id
    AND o.order_date >= DATEADD(month, -6, CAST(CURRENT_TIMESTAMP AS date))
    AND o.order_date < CAST(CURRENT_TIMESTAMP AS date)
);
```

### PostgreSQL

```sql
SELECT c.customer_id, c.customer_name
FROM customers AS c
WHERE NOT EXISTS (
  SELECT 1
  FROM orders AS o
  WHERE o.customer_id = c.customer_id
    AND o.order_date >= CURRENT_DATE - INTERVAL '6 months'
    AND o.order_date < CURRENT_DATE
);
```

Add `EXISTS` for a prior order if customers with no purchase history should be excluded.

## Tricky Interview Question

**Q: Should a customer with no orders ever be called churned?**

**A:** That depends on the business definition. Add an `EXISTS` check when churn means a previous customer who stopped ordering.