# 3150. Invalid Tweets II

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a solution to find every invalid tweet: one whose content exceeds 140 characters, or contains more than 3 `'@'` mentions, or contains more than 3 `'#'` hashtags. Return the invalid tweet ids, ordered ascending.

### Schema

```sql
Create table If Not Exists Tweets (tweet_id int, content varchar(200))
```

## Approach

Check three independent conditions using string-length arithmetic: the raw content length exceeds `140`; or the count of `'@'` characters (computed as the difference between the original length and the length after stripping all `'@'`) exceeds `3`; or the same trick applied to `'#'` exceeds `3`. Any tweet matching at least one condition is invalid.

## SQL Solution

```sql
SELECT tweet_id
FROM Tweets
WHERE
  LENGTH(content) > 140
  OR LENGTH(content) - LENGTH(REPLACE(content, '@', '')) > 3
  OR LENGTH(content) - LENGTH(REPLACE(content, '#', '')) > 3
ORDER BY tweet_id;
```

## Complexity

- Time: O(n * L) — n is the number of tweets, L their average content length (for the REPLACE calls).
- Space: O(n) for the result set.
