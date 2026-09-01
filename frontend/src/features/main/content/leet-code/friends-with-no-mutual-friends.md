# 3058. Friends With No Mutual Friends

**Difficulty:** Hard
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a solution to find every pair of friends (from the `Friends` table) who share **no** mutual friends in common. Return the pairs ordered by the first user id, then the second.

### Schema

```sql
Create table If Not Exists Friends (user_id1 int, user_id2 int)
```

`Friends` has one row per undirected friendship, stored once as `(user_id1, user_id2)`.

## Approach

Build a symmetric ("two-way") view of the friendship graph by unioning each row with its reverse. From that, self-join on shared `friend_id` to find, for every pair of distinct users, whether they have a common friend — this produces the set of user pairs that **do** have a mutual friend. Finally, left-join the original `Friends` pairs against that mutual-friend set and keep only the pairs where no match was found.

## SQL Solution

```sql
WITH TwoWayFriends AS (
  SELECT user_id1 AS user_id, user_id2 AS friend_id FROM Friends
  UNION ALL
  SELECT user_id2, user_id1 FROM Friends
),
UserToMutualFriend AS (
  SELECT
    User1.user_id,
    User2.user_id AS friend_id
  FROM TwoWayFriends AS User1
  JOIN TwoWayFriends AS User2
    USING (friend_id)
  WHERE User1.user_id != User2.user_id
)
SELECT Friends.*
FROM Friends
LEFT JOIN UserToMutualFriend
  ON Friends.user_id1 = UserToMutualFriend.user_id
  AND Friends.user_id2 = UserToMutualFriend.friend_id
WHERE UserToMutualFriend.friend_id IS NULL
ORDER BY Friends.user_id1, Friends.user_id2;
```

## Complexity

- Time: O(n^2) worst case for the mutual-friend self-join, where n is the number of (directed) friendship edges.
- Space: O(n^2) worst case for the intermediate mutual-friend pairs.
