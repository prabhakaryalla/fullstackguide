# 1241. Number of Comments per Post

**Difficulty:** Easy
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Submissions` table (`sub_id`, `parent_id`) where a `NULL` `parent_id` marks a post and a non-null `parent_id` marks a comment on the post with that `sub_id`, report the number of distinct comments for every post, including posts with zero comments.

### Schema

```
Submissions: sub_id (PK), parent_id
```

## Approach

Self-join the table: treat rows with `parent_id IS NULL` as posts, and left join to all rows whose `parent_id` references that post's `sub_id` as its comments. A `LEFT JOIN` ensures posts without any comments still appear (with a `NULL` comment side), and `COUNT(DISTINCT ...)` on the comment's `sub_id` correctly yields `0` for those posts.

## SQL Solution

```sql
SELECT p.sub_id AS post_id, COUNT(DISTINCT c.sub_id) AS number_of_comments
FROM Submissions p
LEFT JOIN Submissions c ON c.parent_id = p.sub_id
WHERE p.parent_id IS NULL
GROUP BY p.sub_id
ORDER BY p.sub_id;
```

## Complexity

- **Time:** `O(n log n)` for the self-join and grouping.
- **Space:** `O(n)` for the joined intermediate result.
