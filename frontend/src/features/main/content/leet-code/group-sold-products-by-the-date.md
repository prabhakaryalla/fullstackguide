# 1484. Group Sold Products By The Date

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an `Activities` table (`sell_date`, `product`), report each `sell_date`, the number of distinct products sold that day (`num_sold`), and a comma-separated, alphabetically sorted list of those distinct products, ordered by `sell_date`.

### Schema

```
Activities: (sell_date, product)
```

## Approach

Group rows by `sell_date`. Use `COUNT(DISTINCT product)` for the distinct product count, and `GROUP_CONCAT(DISTINCT product ORDER BY product SEPARATOR ',')` to build the sorted, comma-separated product list in the same aggregation pass.

## SQL Solution

```sql
SELECT
    sell_date,
    COUNT(DISTINCT product) AS num_sold,
    GROUP_CONCAT(DISTINCT product ORDER BY product SEPARATOR ',') AS products
FROM Activities
GROUP BY sell_date
ORDER BY sell_date;
```

## Complexity

- **Time:** `O(n log n)` for the per-date sorting inside `GROUP_CONCAT`.
- **Space:** `O(n)` for the grouped result.
