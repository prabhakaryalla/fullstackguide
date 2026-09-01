# 3089. Find Bursty Behavior

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a solution to find users exhibiting "bursty" posting behavior in February 2024: users whose highest 7-day rolling post count is at least twice their average weekly posting rate for the month. Return the user id, their maximum 7-day post count, and their average weekly post count, ordered by user id.

### Schema

```sql
Create table If Not Exists Posts (post_id int, user_id int, post_date datetime)
```

`Posts` has one row per post, including its `post_date`.

## Approach

For every post, count how many posts (by the same user) fall within the 7-day window starting at that post's date — this gives a rolling 7-day post count anchored at each post. Separately, compute each user's average weekly post count across all of February (`total February posts / 4` weeks). Join the two per-user results and keep users whose maximum rolling 7-day count is at least double their average weekly rate.

## SQL Solution

```sql
WITH SevenDayPostCounts AS (
  SELECT
    Post1.user_id,
    COUNT(*) AS post_count
  FROM Posts AS Post1
  JOIN Posts AS Post2
    USING (user_id)
  WHERE Post2.post_date BETWEEN Post1.post_date AND DATE_ADD(Post1.post_date, INTERVAL 6 DAY)
  GROUP BY Post1.user_id, Post1.post_id
),
AverageWeeklyPosts AS (
  SELECT
    user_id,
    COUNT(*) / 4 AS avg_weekly_posts
  FROM Posts
  WHERE post_date BETWEEN '2024-02-01' AND '2024-02-28'
  GROUP BY user_id
)
SELECT
  SevenDayPostCounts.user_id,
  MAX(SevenDayPostCounts.post_count) AS max_7day_posts,
  AverageWeeklyPosts.avg_weekly_posts
FROM SevenDayPostCounts
JOIN AverageWeeklyPosts
  USING (user_id)
GROUP BY SevenDayPostCounts.user_id, AverageWeeklyPosts.avg_weekly_posts
HAVING max_7day_posts >= avg_weekly_posts * 2
ORDER BY SevenDayPostCounts.user_id;
```

## Complexity

- Time: O(n^2) worst case for the self-join computing rolling windows, where n is the number of posts.
- Space: O(n^2) worst case for the intermediate joined rows.
