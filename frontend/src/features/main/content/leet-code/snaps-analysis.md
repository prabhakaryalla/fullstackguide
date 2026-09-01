# 3056. Snaps Analysis

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a solution to report, for every age bucket, the percentage of total time spent that was on `'send'` activities and the percentage spent on `'open'` activities (rounded to two decimals).

### Schema

```sql
Create table If Not Exists Age (user_id int, age_bucket varchar(10))
Create table If Not Exists Activities (user_id int, activity_type ENUM('open', 'send'), time_spent float)
```

`Age` maps each `user_id` to its `age_bucket`; `Activities` records how much `time_spent` a user spent per `activity_type`.

## Approach

Join `Activities` to `Age` to attach an age bucket to every activity row. Group by `age_bucket`, and for each group compute the sum of `time_spent` restricted to `'send'` (respectively `'open'`) divided by the total `time_spent` in that group, as a percentage.

## SQL Solution

```sql
SELECT
  Age.age_bucket,
  ROUND(
    SUM(IF(Activities.activity_type = 'send', Activities.time_spent, 0)) /
    SUM(Activities.time_spent) * 100,
    2
  ) AS send_perc,
  ROUND(
    SUM(IF(Activities.activity_type = 'open', Activities.time_spent, 0)) /
    SUM(Activities.time_spent) * 100,
    2
  ) AS open_perc
FROM Activities
JOIN Age
  ON Activities.user_id = Age.user_id
GROUP BY Age.age_bucket;
```

## Complexity

- Time: O(n) to join and aggregate, where n is the number of activity rows.
- Space: O(n) for the intermediate joined rows.
