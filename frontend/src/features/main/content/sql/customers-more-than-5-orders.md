# Count Customers with More Than 5 Orders

## Example

### Input: `orders`

| order_id | customer_id |
|---|---|
| 100 | 1 |
| 101 | 1 |
| 102 | 1 |
| 103 | 1 |
| 104 | 1 |
| 105 | 1 |
| 106 | 2 |
| 107 | 2 |

### Expected Output

Customer 1 has 6 orders (> 5); customer 2 has only 2.

| customers_with_more_than_5_orders |
|---|
| 1 |

## Solution

Count each customer first, then count the groups that meet the threshold.

```sql
SELECT COUNT(*) AS customers_with_more_than_5_orders
FROM (
  SELECT customer_id
  FROM orders
  GROUP BY customer_id
  HAVING COUNT(*) > 5
) AS frequent_customers;
```

## Tricky Interview Question

**Q: Why are there two queries here?**

**A:** The inner query finds customers with more than five orders. The outer query counts those customers.