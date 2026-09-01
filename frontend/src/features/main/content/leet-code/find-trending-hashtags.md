# 3087. Find Trending Hashtags

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a solution to find the top 3 trending hashtags for February, based on how many tweets from that month mention them. Return the hashtag (including the leading `#`) and its count, ordered by count descending, then hashtag descending, limited to the top 3.

### Schema

```sql
Create table If Not Exists Tweets (user_id int, tweet_date date, tweet varchar(300))
```

`Tweets` has one row per tweet, including the raw `tweet` text (which may contain a `#hashtag`).

## Approach

Filter to tweets whose `tweet_date` falls in February. Extract the hashtag from each tweet's text using string functions — take everything after the first `#`, then cut it off at the next space (so only the hashtag word remains). Group by the extracted hashtag, count occurrences, order by count descending then hashtag descending, and take the top 3.

## SQL Solution

```sql
SELECT
  CONCAT(
    '#',
    SUBSTRING_INDEX(SUBSTRING_INDEX(tweet, '#', -1), ' ', 1)
  ) AS hashtag,
  COUNT(*) AS hashtag_count
FROM Tweets
WHERE MONTH(tweet_date) = 2
GROUP BY hashtag
ORDER BY hashtag_count DESC, hashtag DESC
LIMIT 3;
```

## Complexity

- Time: O(n log n) for the grouping/sort, where n is the number of tweets in February.
- Space: O(n) for the intermediate grouped rows.
