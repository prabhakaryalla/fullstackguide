# 1479. Sales by Day of the Week

**Difficulty:** Hard
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an `Orders` table (`order_id`, `customer_id`, `order_date`, `item_id`, `quantity`) and an `Items` table (`item_id`, `item_name`), report, for every item, the total quantity sold on each day of the week (Monday through Sunday) as separate columns, ordered by item name.

### Schema

```
Orders: order_id (PK), customer_id, order_date, item_id, quantity
Items: item_id (PK), item_name
```

## Approach

Left join `Items` to `Orders` so items with no sales still appear with zero totals. For each day of the week, sum `quantity` conditionally using `DAYOFWEEK(order_date)` (where MySQL numbers `1 = Sunday` through `7 = Saturday`) to isolate that day's sales, producing one output column per weekday.

## SQL Solution

```sql
SELECT
    i.item_name,
    SUM(CASE WHEN DAYOFWEEK(o.order_date) = 2 THEN o.quantity ELSE 0 END) AS Monday,
    SUM(CASE WHEN DAYOFWEEK(o.order_date) = 3 THEN o.quantity ELSE 0 END) AS Tuesday,
    SUM(CASE WHEN DAYOFWEEK(o.order_date) = 4 THEN o.quantity ELSE 0 END) AS Wednesday,
    SUM(CASE WHEN DAYOFWEEK(o.order_date) = 5 THEN o.quantity ELSE 0 END) AS Thursday,
    SUM(CASE WHEN DAYOFWEEK(o.order_date) = 6 THEN o.quantity ELSE 0 END) AS Friday,
    SUM(CASE WHEN DAYOFWEEK(o.order_date) = 7 THEN o.quantity ELSE 0 END) AS Saturday,
    SUM(CASE WHEN DAYOFWEEK(o.order_date) = 1 THEN o.quantity ELSE 0 END) AS Sunday
FROM Items i
LEFT JOIN Orders o ON i.item_id = o.item_id
GROUP BY i.item_id, i.item_name
ORDER BY i.item_name;
```

## Complexity

- **Time:** `O(n log n)` for the join and grouping.
- **Space:** `O(n)` for the grouped result.
