# 1148. Article Views I

**Difficulty:** Easy
**Category:** SQL, Database

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given a `Views` table (`article_id`, `author_id`, `viewer_id`, `view_date`), find all authors who viewed at least one of their own articles, sorted by ID ascending.

### Schema

```
Views: article_id, author_id, viewer_id, view_date
```

## Approach

Filter rows where `author_id` equals `viewer_id` (an author viewing their own article) and select the distinct author IDs, sorted ascending.

## SQL Solution

```sql
SELECT DISTINCT author_id AS id
FROM Views
WHERE author_id = viewer_id
ORDER BY id;
```

## Complexity

- **Time:** `O(n log n)` for the distinct sort.
- **Space:** `O(n)` for the intermediate distinct set.
