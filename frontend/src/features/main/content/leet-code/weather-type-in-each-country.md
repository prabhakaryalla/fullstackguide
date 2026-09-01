# 1294. Weather Type in Each Country

**Difficulty:** Easy
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given `Countries` (`country_id`, `country_name`, `continent`) and `Weather` (`country_id`, `weather_state`, `day`), classify each country's weather during November 2019 as `'Cold'` if the average `weather_state` is `<= 15`, `'Hot'` if `>= 25`, and `'Warm'` otherwise.

### Schema

```
Countries: country_id (PK), country_name, continent
Weather: country_id, weather_state, day
```

## Approach

Join the two tables on `country_id`, restricting to `Weather` rows whose `day` falls within November 2019. Group by country and average `weather_state`, then classify that average with a `CASE` expression against the given thresholds.

## SQL Solution

```sql
SELECT c.country_name,
    CASE
        WHEN AVG(w.weather_state) <= 15 THEN 'Cold'
        WHEN AVG(w.weather_state) >= 25 THEN 'Hot'
        ELSE 'Warm'
    END AS weather_type
FROM Countries c
JOIN Weather w ON c.country_id = w.country_id
WHERE w.day BETWEEN '2019-11-01' AND '2019-11-30'
GROUP BY c.country_id, c.country_name;
```

## Complexity

- **Time:** `O(n log n)` for the join and grouping.
- **Space:** `O(n)` for the grouped intermediate result.
