# 2228. Users With Two Purchases Within Seven Days

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

This is a SQL database problem where you need to find users who made at least two purchases within a 7-day window.

You have a `Purchases` table with columns: purchase_id, user_id, purchase_date.

Find all user_id values where the user made at least two purchases within 7 days (inclusive) of each other.

### Schema

```sql
Purchases table:
+-------------+---------+--------------+
| purchase_id | user_id | purchase_date|
+-------------+---------+--------------+
```

## Approach

Use a self-join on the Purchases table to find pairs of purchases by the same user where the date difference is at most 7 days.

## SQL Solution

```sql
SELECT DISTINCT p1.user_id
FROM Purchases p1
JOIN Purchases p2 
  ON p1.user_id = p2.user_id
  AND p1.purchase_id < p2.purchase_id
  AND DATEDIFF(p2.purchase_date, p1.purchase_date) BETWEEN 0 AND 7
ORDER BY p1.user_id;
```

Alternative using window functions:

```sql
WITH RankedPurchases AS (
    SELECT 
        user_id,
        purchase_date,
        LAG(purchase_date) OVER (PARTITION BY user_id ORDER BY purchase_date) AS prev_date
    FROM Purchases
)
SELECT DISTINCT user_id
FROM RankedPurchases
WHERE DATEDIFF(purchase_date, prev_date) <= 7
ORDER BY user_id;
```

## Complexity

- **Time:** Depends on database implementation and indexing
- **Space:** O(result size)
