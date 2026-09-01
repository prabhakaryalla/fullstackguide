# 2199. Finding the Topic of Each Post

**Difficulty:** Hard
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

This is a SQL database problem where you need to identify the topics associated with each post based on keywords.

You have two tables:
- `Posts`: contains post_id and content
- `Keywords`: contains topic_id and word

A post is associated with a topic if its content contains at least one keyword from that topic. Find all topic_id and post_id pairs, ordered by post_id ascending, then topic_id ascending.

### Schema

```sql
Posts table:
+----------+-----------------------------------+
| post_id  | content                           |
+----------+-----------------------------------+

Keywords table:
+----------+----------+
| topic_id | word     |
+----------+----------+
```

## Approach

Use a SQL query with string matching (LIKE or REGEXP) to find which keywords appear in each post's content. Join the Posts and Keywords tables on the condition that the content contains the keyword.

## SQL Solution

```sql
SELECT DISTINCT p.post_id, k.topic_id
FROM Posts p
JOIN Keywords k ON CONCAT(' ', p.content, ' ') LIKE CONCAT('% ', k.word, ' %')
ORDER BY p.post_id, k.topic_id;
```

Alternative using REGEXP:

```sql
SELECT DISTINCT p.post_id, k.topic_id
FROM Posts p
JOIN Keywords k ON p.content REGEXP CONCAT('[[:<:]]', k.word, '[[:>:]]')
ORDER BY p.post_id, k.topic_id;
```

## Complexity

- **Time:** Depends on database implementation and indexing
- **Space:** O(result size)
