# 1949. Strong Friendship

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

`Table: Friendship(user1_id, user2_id)`. Two users have a "strong friendship" if they are friends and they have at least 3 common friends. Return all pairs of users with a strong friendship (each pair reported once with `user1_id < user2_id`) along with the number of common friends.

### Example

```
Input:
Friendship: (1,2),(1,3),(2,3),(1,4),(2,4),(1,5),(2,5),(1,7),(3,7),(1,6),(3,6),(2,6)
Output: (1,2,3)
```

## Approach

Normalize `Friendship` into a symmetric adjacency view (both `(a,b)` and `(b,a)` directions) with a self-union. For every pair of friends `(a, b)` with `a < b`, count how many users `c` are friends with both `a` and `b` by joining the symmetric adjacency table to itself, then filter for pairs that are themselves friends and have `common_friends >= 3`.

```sql
WITH Adj AS (
    SELECT user1_id, user2_id FROM Friendship
    UNION
    SELECT user2_id, user1_id FROM Friendship
)
SELECT a.user1_id AS user1_id, a.user2_id AS user2_id, COUNT(*) AS common_friend
FROM Friendship a
JOIN Adj f1 ON f1.user1_id = a.user1_id
JOIN Adj f2 ON f2.user1_id = a.user2_id AND f2.user2_id = f1.user2_id
WHERE a.user1_id < a.user2_id
GROUP BY a.user1_id, a.user2_id
HAVING COUNT(*) >= 3;
```

## Complexity

- **Time:** `O(n^2)` in the worst case for the friend-of-friend joins.
- **Space:** `O(n)` for the symmetric adjacency view.
