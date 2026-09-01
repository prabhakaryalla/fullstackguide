# 1322. Ads Performance

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an `Ads` table (`ad_id`, `user_id`, `action` of `'Clicked'`, `'Viewed'`, or `'Ignored'`), write a query that reports each ad's click-through rate: `100 * clicks / (clicks + views)`, rounded to two decimals (treated as `0` if the denominator is `0`), ordered by rate descending then `ad_id` ascending.

### Schema

```
Ads: ad_id, user_id, action
```

## Approach

For each `ad_id`, count how many rows have `action = 'Clicked'` and how many have `action` in `('Clicked', 'Viewed')`. Divide the two counts to get the ratio, guarding against a zero denominator, then round the percentage to two decimal places.

## SQL Solution

```sql
SELECT ad_id,
       ROUND(
           IFNULL(
               100 * SUM(CASE WHEN action = 'Clicked' THEN 1 ELSE 0 END) /
               NULLIF(SUM(CASE WHEN action IN ('Clicked', 'Viewed') THEN 1 ELSE 0 END), 0),
               0
           ), 2
       ) AS ctr
FROM Ads
GROUP BY ad_id
ORDER BY ctr DESC, ad_id ASC;
```

## Complexity

- **Time:** `O(n)` for the grouped aggregation.
- **Space:** `O(distinct ad_id)` for the result.
