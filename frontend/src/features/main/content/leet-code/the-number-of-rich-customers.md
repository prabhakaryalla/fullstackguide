# 2082. The Number of Rich Customers

**Difficulty:** Easy
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Table `Store(bill_id, customer_id, amount)` records store bills. Return the number of distinct customers who have at least one bill with `amount` strictly greater than 500.

### Schema

```
Store: bill_id (PK), customer_id, amount
```

## Approach

Filter bills with `amount > 500` and count the distinct `customer_id` values among them.

## SQL Solution

```sql
SELECT COUNT(DISTINCT customer_id) AS rich_count
FROM Store
WHERE amount > 500;
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
