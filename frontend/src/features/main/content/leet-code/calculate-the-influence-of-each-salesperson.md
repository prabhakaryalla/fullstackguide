# 2372. Calculate the Influence of Each Salesperson

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Table `Salesperson(salesperson_id, name)`, table `Customer(customer_id, salesperson_id)` (each customer is assigned to at most one salesperson), and table `Sales(sale_id, customer_id, price)`. The influence of a salesperson is the total price of all sales made to customers assigned to them. Return `salesperson_id`, `name`, and `total_sales` (0 if they have no sales) for every salesperson.

### Schema

```
Salesperson: salesperson_id (PK), name
Customer: customer_id (PK), salesperson_id
Sales: sale_id (PK), customer_id, price
```

## Approach

`LEFT JOIN` from `Salesperson` through `Customer` to `Sales` so that salespeople with no customers or no sales are still included with a total of 0 (via `COALESCE`/`IFNULL`). Group by salesperson and sum the sale prices.

## SQL Solution

```sql
SELECT
    sp.salesperson_id,
    sp.name,
    COALESCE(SUM(sa.price), 0) AS total_sales
FROM Salesperson sp
LEFT JOIN Customer c
    ON c.salesperson_id = sp.salesperson_id
LEFT JOIN Sales sa
    ON sa.customer_id = c.customer_id
GROUP BY sp.salesperson_id, sp.name;
```

## Complexity

- **Time:** O(n + m) for the joins and aggregation
- **Space:** O(n)
