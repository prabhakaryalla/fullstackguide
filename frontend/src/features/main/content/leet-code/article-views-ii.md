# 1149. Article Views II

**Difficulty:** Medium
**Category:** SQL, Database

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given a `Views` table (`article_id`, `author_id`, `viewer_id`, `view_date`), find all viewer IDs who viewed at least two distinct articles on the same date, sorted by ID ascending.

### Schema

```
Views: article_id, author_id, viewer_id, view_date
```

## Approach

Group the rows by `(viewer_id, view_date)` and keep only groups with at least two distinct `article_id` values, since that means the viewer read multiple different articles on that single day. Selecting `DISTINCT` on the outer query then collapses viewers who qualified on more than one date.

## SQL Solution

```sql
SELECT DISTINCT viewer_id AS id
FROM Views
GROUP BY viewer_id, view_date
HAVING COUNT(DISTINCT article_id) >= 2
ORDER BY id;
```

## Complexity

- **Time:** `O(n log n)` for the grouping and sort.
- **Space:** `O(n)` for the intermediate grouped result.
