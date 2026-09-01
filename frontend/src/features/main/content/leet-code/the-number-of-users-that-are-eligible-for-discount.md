# 2205. The Number of Users That Are Eligible for Discount

**Difficulty:** Easy
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

This is a SQL database problem where you need to count users eligible for a discount based on purchase criteria.

You have a `Purchases` table with columns: user_id, time_stamp, amount.

A user is eligible for a discount if they have made at least `min_amount` purchases with total spending of at least `min_spending` within a given time period.

Return the number of eligible users.

### Schema

```sql
Purchases table:
+---------+-------------+--------+
| user_id | time_stamp  | amount |
+---------+-------------+--------+
```

## Approach

Use aggregation with GROUP BY to sum purchases per user, then apply HAVING clause to filter users meeting the criteria, and finally COUNT the result.

## SQL Solution

```sql
SELECT COUNT(DISTINCT user_id) AS eligible_users
FROM Purchases
WHERE time_stamp BETWEEN @start_date AND @end_date
GROUP BY user_id
HAVING COUNT(*) >= @min_purchases AND SUM(amount) >= @min_spending;
```

## Complexity

- **Time:** Depends on database implementation and indexing
- **Space:** O(distinct users)
