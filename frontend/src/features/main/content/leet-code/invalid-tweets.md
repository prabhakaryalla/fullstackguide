# 1683. Invalid Tweets

**Difficulty:** Easy
**Category:** SQL, Database

## Problem

Given a `Tweets` table (`tweet_id`, `content`), return the ids of tweets whose `content` exceeds 15 characters.

### Schema

```
Tweets: tweet_id (PK), content
```

## Approach

Measure each tweet's content length and filter for those exceeding 15 characters.

## SQL Solution

```sql
SELECT tweet_id
FROM Tweets
WHERE CHAR_LENGTH(content) > 15;
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of tweets.
- **Space:** `O(n)` for the result set.
