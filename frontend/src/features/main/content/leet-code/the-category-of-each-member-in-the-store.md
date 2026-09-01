# 2051. The Category of Each Member in the Store

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Table `Members(member_id, name)`, table `Visits(visit_id, member_id, visit_date)`, and table `Purchases(visit_id, charged_amount)` (a purchase row exists only for visits where the member actually bought something). For each member, classify them as:
- `'Bronze'` if they have never visited,
- `'Diamond'` if at least 80% of their visits resulted in a purchase,
- `'Gold'` if at least 50% (but less than 80%) of their visits resulted in a purchase,
- `'Silver'` otherwise.

Return `member_id`, `name`, and `category` for every member.

### Schema

```
Members: member_id (PK), name
Visits: visit_id (PK), member_id, visit_date
Purchases: visit_id (PK), charged_amount
```

## Approach

`LEFT JOIN` `Members` to `Visits` and then to `Purchases` on `visit_id`. Group by member and compare `COUNT(Purchases.visit_id) / COUNT(Visits.visit_id)` against the 0.8 and 0.5 thresholds, special-casing zero visits to avoid division by zero (checked first in the `CASE` expression).

## SQL Solution

```sql
SELECT
    Members.member_id,
    Members.name,
    CASE
        WHEN COUNT(Visits.visit_id) = 0 THEN 'Bronze'
        WHEN COUNT(Purchases.visit_id) / COUNT(Visits.visit_id) >= 0.8 THEN 'Diamond'
        WHEN COUNT(Purchases.visit_id) / COUNT(Visits.visit_id) >= 0.5 THEN 'Gold'
        ELSE 'Silver'
    END AS category
FROM Members
LEFT JOIN Visits
    ON Members.member_id = Visits.member_id
LEFT JOIN Purchases
    ON Visits.visit_id = Purchases.visit_id
GROUP BY Members.member_id, Members.name;
```

## Complexity

- **Time:** O(n + m) for the joins and aggregation
- **Space:** O(n)
