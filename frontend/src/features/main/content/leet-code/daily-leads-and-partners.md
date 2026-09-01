# 1693. Daily Leads and Partners

**Difficulty:** Easy
**Category:** SQL, Database

## Problem

Given a `DailySales` table (`date_id`, `make_name`, `lead_id`, `partner_id`), report for each `(date_id, make_name)` pair the count of distinct `lead_id`s and the count of distinct `partner_id`s.

### Schema

```
DailySales: date_id, make_name, lead_id, partner_id
```

## Approach

Group the rows by `date_id` and `make_name`, then count distinct `lead_id` and distinct `partner_id` values within each group.

## SQL Solution

```sql
SELECT
    date_id,
    make_name,
    COUNT(DISTINCT lead_id) AS unique_leads,
    COUNT(DISTINCT partner_id) AS unique_partners
FROM DailySales
GROUP BY date_id, make_name;
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of sales rows.
- **Space:** `O(n)` for the grouped result.
