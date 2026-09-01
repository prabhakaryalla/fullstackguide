# 1264. Page Recommendations

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Friendship` table (`user1_id`, `user2_id`) and a `Likes` table (`user_id`, `page_id`), recommend to user `1` all pages liked by their friends that user `1` has not already liked.

### Schema

```
Friendship: user1_id, user2_id
Likes: user_id, page_id
```

## Approach

Because a friendship row can list user `1` on either side, normalize each row to identify the *other* person in the pair using an `IF` expression. Join that friend id to `Likes` to gather pages the friend has liked, then exclude any page that already appears in user `1`'s own `Likes` rows via a `NOT IN` subquery, and de-duplicate with `DISTINCT` since multiple friends might like the same page.

## SQL Solution

```sql
SELECT DISTINCT l.page_id
FROM Friendship f
JOIN Likes l
    ON l.user_id = IF(f.user1_id = 1, f.user2_id, f.user1_id)
WHERE (f.user1_id = 1 OR f.user2_id = 1)
  AND l.page_id NOT IN (SELECT page_id FROM Likes WHERE user_id = 1);
```

## Complexity

- **Time:** `O(n log n)` for the join and de-duplication.
- **Space:** `O(n)` for the intermediate joined rows.
