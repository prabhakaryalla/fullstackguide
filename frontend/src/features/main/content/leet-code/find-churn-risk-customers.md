# 3716. Find Churn Risk Customers

**Difficulty:** Medium
**Category:** SQL, Database

## Problem

Report customers who are at churn risk: customers who have placed at least one order but have not placed any order in the last 90 days.

### Schema

```sql
Create table If Not Exists Customers (customer_id int, name varchar(50))
Create table If Not Exists Orders (order_id int, customer_id int, order_date date)
```

## SQL Solution

```sql
SELECT c.customer_id, c.name
FROM Customers c
JOIN Orders o ON o.customer_id = c.customer_id
GROUP BY c.customer_id, c.name
HAVING MAX(o.order_date) < DATE_SUB(CURRENT_DATE, INTERVAL 90 DAY)
ORDER BY c.customer_id;
```

## Complexity

- **Time:** O(n log n) for the grouping/sort
- **Space:** O(n)
