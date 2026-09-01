# 3103. Find Trending Hashtags II

**Difficulty:** Hard
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

This is a variant of [Find Trending Hashtags](find-trending-hashtags.md) that must account for tweets containing **multiple** hashtags (not just the first). Write a solution to find the top 3 trending hashtags in February 2024, counting every hashtag mention in every tweet, ordered by count descending then hashtag descending.

### Schema

```sql
Create table If Not Exists Tweets (user_id int, tweet_date date, tweet varchar(300))
```

## Approach

Filter to February 2024 tweets. Since a tweet's text may contain several hashtags, use a recursive common table expression to repeatedly peel off the first hashtag found in the remaining text: each recursive step extracts the next `#...` token and removes it from the working copy of the tweet, continuing until no `#` remains. This produces one row per hashtag mention across all tweets. Group by hashtag, count, and return the top 3.

## SQL Solution

```sql
WITH RECURSIVE FebruaryTweets AS (
  SELECT * FROM Tweets
  WHERE YEAR(tweet_date) = 2024 AND MONTH(tweet_date) = 2
),
HashtagToTweet AS (
  SELECT
    REGEXP_SUBSTR(tweet, '#[^\\s]+') AS hashtag,
    REGEXP_REPLACE(tweet, '#[^\\s]+', '', 1, 1) AS tweet
  FROM FebruaryTweets
  UNION ALL
  SELECT
    REGEXP_SUBSTR(tweet, '#[^\\s]+') AS hashtag,
    REGEXP_REPLACE(tweet, '#[^\\s]+', '', 1, 1) AS tweet
  FROM HashtagToTweet
  WHERE POSITION('#' IN tweet) > 0
)
SELECT hashtag, COUNT(*) AS count
FROM HashtagToTweet
WHERE hashtag IS NOT NULL
GROUP BY hashtag
ORDER BY count DESC, hashtag DESC
LIMIT 3;
```

## Complexity

- Time: O(n * h) — n is the number of February tweets and h is the max hashtags per tweet, since the recursive CTE peels off one hashtag per step.
- Space: O(n * h) — one row produced per hashtag mention.
