# 585. Investments in 2016

**Difficulty:** Medium
**Category:** SQL, Database

## Problem

Given an `Insurance` table (`pid`, `tiv_2015`, `tiv_2016`, `lat`, `lon`), write a query to report the sum of `tiv_2016` for policyholders who had the same `tiv_2015` value as some other policyholder, and whose `(lat, lon)` city coordinates are not shared with any other policyholder.

### Schema

```
Insurance: pid (PK), tiv_2015, tiv_2016, lat, lon
```

## Approach

Build two filter conditions: one identifying `tiv_2015` values that appear more than once (shared investment amounts), and another identifying `(lat, lon)` pairs that appear exactly once (unique locations). Sum `tiv_2016` only for rows satisfying both conditions simultaneously.

## SQL Solution

```sql
SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016
FROM Insurance
WHERE tiv_2015 IN (
    SELECT tiv_2015
    FROM Insurance
    GROUP BY tiv_2015
    HAVING COUNT(*) > 1
)
AND (lat, lon) IN (
    SELECT lat, lon
    FROM Insurance
    GROUP BY lat, lon
    HAVING COUNT(*) = 1
);
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of policyholders.
- **Space:** `O(n)` for the grouped intermediate results.
