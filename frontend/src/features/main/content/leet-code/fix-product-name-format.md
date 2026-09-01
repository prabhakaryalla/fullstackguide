# 1543. Fix Product Name Format

**Difficulty:** Easy
**Category:** Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a table `Sales(sale_id, product_name, sale_date)`, where `product_name` may have inconsistent casing and leading/trailing whitespace, find the total number of sales for each product per month. Normalize `product_name` (trim and lowercase) before grouping, and format the month as `MM-YYYY`.

### Example

```
Input: Sales: (1, "  LC Phone  ", 2000-01-16), (2, "lc phone", 2000-01-17)
Output: ("lc phone", "01-2000", 2)
```

## Approach

This is a SQL problem (no C# solution applies). Normalize `product_name` with `TRIM` and `LOWER`, format `sale_date` as `MM-YYYY`, then group by both normalized values and count the sales.

```sql
SELECT
    LOWER(TRIM(product_name)) AS product_name,
    DATE_FORMAT(sale_date, '%m-%Y') AS sale_date,
    COUNT(*) AS total
FROM Sales
GROUP BY product_name, sale_date;
```

## Complexity

- **Time:** `O(n)` — a single pass to normalize and group all rows.
- **Space:** `O(n)` for the grouped result set.
