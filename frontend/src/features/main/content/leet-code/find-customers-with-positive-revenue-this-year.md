# 1821. Find Customers With Positive Revenue this Year

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Customers` table (`customer_id`, `year`, `revenue`), find the ids of customers who had strictly positive revenue in the year 2021.

### Schema

```
Customers: customer_id, year, revenue
```

## Approach

Filter rows where `year = 2021` and `revenue > 0`, then select the distinct `customer_id` values.

## SQL Solution

```sql
SELECT DISTINCT customer_id
FROM Customers
WHERE year = 2021 AND revenue > 0;
```

## Complexity

- **Time:** `O(n)` for the table scan and filter.
- **Space:** `O(n)` for the result set.
