# 2230. The Users That Are Eligible for Discount

**Difficulty:** Easy
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

This is a SQL database problem where you need to find users who are eligible for a discount based on their purchase history.

You have a `Purchases` table with columns: user_id, time_stamp, amount.

A user is eligible for a discount if they have made purchases totaling at least a certain amount within a specific time period.

Return the user_id values of eligible users.

### Schema

```sql
Purchases table:
+---------+-------------+--------+
| user_id | time_stamp  | amount |
+---------+-------------+--------+
```

## Approach

Use aggregation with GROUP BY to sum purchase amounts per user, filter with HAVING clause based on eligibility criteria, and select the qualifying user_id values.

## SQL Solution

```sql
SELECT user_id
FROM Purchases
WHERE time_stamp BETWEEN @start_date AND @end_date
GROUP BY user_id
HAVING SUM(amount) >= @minimum_amount
ORDER BY user_id;
```

Generic version with parameters:

```sql
SELECT DISTINCT user_id
FROM Purchases
WHERE time_stamp >= DATE_SUB(CURDATE(), INTERVAL @days DAY)
GROUP BY user_id
HAVING SUM(amount) >= @threshold
ORDER BY user_id;
```

## Complexity

- **Time:** Depends on database implementation, indexing, and query optimization
- **Space:** O(distinct users)
