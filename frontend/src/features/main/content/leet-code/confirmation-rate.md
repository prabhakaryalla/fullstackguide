# 1934. Confirmation Rate

**Difficulty:** Medium
**Category:** Database

## Problem

`Table: Signups(user_id, time_stamp)` and `Table: Confirmations(user_id, time_stamp, action)` where `action` is `"confirmed"` or `"timeout"`. For every user in `Signups`, compute their confirmation rate = number of `"confirmed"` actions divided by the total number of confirmation requests (rows in `Confirmations` for that user), rounded to 2 decimal places, treating users with no confirmation requests as rate `0.00`.

### Example

```
Input:
Signups: (3, '2020-03-21 10:16:13'), (7, '2020-01-04 13:57:59')
Confirmations: (3,'2021-01-06 03:30:46','timeout'), (3,'2021-07-14 14:00:00','timeout'), (7,'2021-06-12 11:57:29','confirmed')
Output: (3, 0.00), (7, 1.00)
```

## Approach

Left join `Signups` to `Confirmations` on `user_id` so every signed-up user appears even without confirmation attempts, then group by `user_id` and compute `AVG(action = 'confirmed')` (treating the boolean comparison as `1`/`0`), which naturally yields `0` when there are no confirmation rows (via `COALESCE`) and rounds to 2 decimals.

```sql
SELECT s.user_id,
       ROUND(COALESCE(AVG(CASE WHEN c.action = 'confirmed' THEN 1.0 ELSE 0.0 END), 0), 2) AS confirmation_rate
FROM Signups s
LEFT JOIN Confirmations c ON s.user_id = c.user_id
GROUP BY s.user_id;
```

## Complexity

- **Time:** `O(n + m)` — a single join and group-by over both tables.
- **Space:** `O(n)` for the grouped result, one row per signed-up user.
