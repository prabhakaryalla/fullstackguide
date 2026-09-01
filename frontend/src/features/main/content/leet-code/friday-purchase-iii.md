# 3118. Friday Purchase III

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a solution to report, for each of the 4 Fridays in November 2023 and each membership tier (`'Premium'` and `'VIP'`), the total amount spent by users of that tier on that Friday (`0` if nothing was spent), ordered by week number then membership.

### Schema

```sql
Create table If Not Exists Users (user_id int, membership varchar(10))
Create table If Not Exists Purchases (user_id int, purchase_date date, amount_spend int)
```

`Users` maps each `user_id` to a `membership` tier; `Purchases` records what each user spent on a given date.

## Approach

Generate the 4 target Fridays of November 2023 with a recursive CTE (starting from the first Friday and adding 7 days three more times). Cross join that with the two membership tiers to enumerate every `(week, membership)` combination up front — this guarantees rows exist even when no purchases occurred. Left-join in the users of each membership, then left-join in their purchases matching that Friday's date, and sum the spend (defaulting to `0` when nothing matches).

## SQL Solution

```sql
WITH RECURSIVE Fridays AS (
  SELECT 1 AS week_of_month, '2023-11-03' AS purchase_date
  UNION ALL
  SELECT week_of_month + 1, DATE_ADD(purchase_date, INTERVAL 7 DAY)
  FROM Fridays
  WHERE week_of_month < 4
),
Memberships AS (
  SELECT 'Premium' AS membership
  UNION ALL
  SELECT 'VIP'
)
SELECT
  Fridays.week_of_month,
  Memberships.membership,
  IFNULL(SUM(Purchases.amount_spend), 0) AS total_amount
FROM Fridays
CROSS JOIN Memberships
LEFT JOIN Users
  ON Memberships.membership = Users.membership
LEFT JOIN Purchases
  ON Fridays.purchase_date = Purchases.purchase_date
  AND Users.user_id = Purchases.user_id
GROUP BY Fridays.week_of_month, Memberships.membership
ORDER BY Fridays.week_of_month, Memberships.membership;
```

## Complexity

- Time: O(n) — n is the number of purchase rows joined against the fixed 4x2 Friday/membership grid.
- Space: O(n) — the intermediate joined rows.
