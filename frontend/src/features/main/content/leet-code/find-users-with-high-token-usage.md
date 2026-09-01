# 3793. Find Users with High Token Usage

**Difficulty:** Easy
**Category:** SQL, Database

## Problem

Table `prompts(user_id, prompt, tokens)` records AI prompts submitted by users. For each user with at least 3 prompts and at least one prompt whose tokens exceed their own average tokens, return `user_id`, total prompt count, and average tokens (rounded to 2 decimals), ordered by average tokens descending then `user_id` ascending.

### Schema

```
Table: prompts
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| user_id     | int     |
| prompt      | varchar |
| tokens      | int     |
+-------------+---------+
(user_id, prompt) is unique.
```

## Approach

Group by `user_id`, filter with `HAVING COUNT(*) >= 3` and `MAX(tokens) > AVG(tokens)` (a max above the average implies at least one prompt exceeds it), then order the result as required.

## SQL Solution

```sql
SELECT
    user_id,
    COUNT(*) AS prompt_count,
    ROUND(AVG(tokens), 2) AS avg_tokens
FROM prompts
GROUP BY user_id
HAVING COUNT(*) >= 3 AND MAX(tokens) > AVG(tokens)
ORDER BY avg_tokens DESC, user_id ASC;
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
