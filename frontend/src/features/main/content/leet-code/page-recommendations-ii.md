# 1892. Page Recommendations II

**Difficulty:** Hard
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Friendship` table (`user1_id`, `user2_id`) and a `Likes` table (`user_id`, `page_id`), recommend to each user every page liked by at least one of their friends but not already liked by the user themself. Return `(user_id, page_id, friends_likes)` where `friends_likes` is the number of distinct friends who liked that page.

### Schema

```
Friendship: user1_id, user2_id
Likes: user_id, page_id
```

## Approach

Since friendship is undirected but stored as a single row per pair, first build a symmetric `(user_id, friend_id)` relation via `UNION ALL` of both directions. Left join that to `Likes` (as `FriendLikes`) to find pages friends liked, and left join again to `Likes` (as `UserLikes`) matching the same user and page to detect whether the user already likes it. Filtering to rows where `UserLikes.page_id IS NULL` keeps only not-yet-liked pages, and grouping by `(user_id, page_id)` with `COUNT(DISTINCT friend_id)` gives the friend-like count.

## SQL Solution

```sql
WITH UserToFriends AS (
    SELECT user1_id AS user_id, user2_id AS friend_id FROM Friendship
    UNION ALL
    SELECT user2_id AS user_id, user1_id AS friend_id FROM Friendship
)
SELECT
    UserToFriends.user_id,
    FriendLikes.page_id,
    COUNT(DISTINCT UserToFriends.friend_id) AS friends_likes
FROM UserToFriends
LEFT JOIN Likes AS FriendLikes
    ON UserToFriends.friend_id = FriendLikes.user_id
LEFT JOIN Likes AS UserLikes
    ON UserToFriends.user_id = UserLikes.user_id
    AND FriendLikes.page_id = UserLikes.page_id
WHERE UserLikes.page_id IS NULL
GROUP BY UserToFriends.user_id, FriendLikes.page_id;
```

## Complexity

- **Time:** `O(f * l)` in the worst case for the joins, where `f` is friendship rows and `l` is likes rows (much faster in practice with indexes).
- **Space:** `O(f)` for the symmetric friendship CTE.
