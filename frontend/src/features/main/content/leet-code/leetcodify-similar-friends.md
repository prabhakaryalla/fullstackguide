# 1919. Leetcodify Similar Friends

**Difficulty:** Hard
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

`Table: Listens(user_id, song_id, day)` and `Table: Friendship(user1_id, user2_id)`. Two friends are "similar" if there exists at least one day on which they listened to exactly the same set of songs (the sets of songs each listened to that day are equal, not just overlapping). Return all pairs of similar friends without duplicate/reversed pairs (report with `user1_id < user2_id`).

### Example

```
Input:
Friendship: (1,2)
Listens on day '2021-01-01': user 1 -> songs {2,3}; user 2 -> songs {2,3}
Output: (1,2)
```

## Approach

For each `(user, day)` build the set of songs listened to. Only friends need to be compared, so join `Friendship` to two aggregated `(user, day, song-set)` groupings — one per side of the friendship — matching on `day`, and check that the two songs sets are identical by comparing a canonical, sorted, comma-joined string of `song_id`s aggregated with `STRING_AGG`/`GROUP_CONCAT` (ordered) for equality.

```sql
WITH UserDaySongs AS (
    SELECT user_id, day,
           GROUP_CONCAT(DISTINCT song_id ORDER BY song_id) AS songs
    FROM Listens
    GROUP BY user_id, day
)
SELECT DISTINCT f.user1_id, f.user2_id
FROM Friendship f
JOIN UserDaySongs a ON a.user_id = f.user1_id
JOIN UserDaySongs b ON b.user_id = f.user2_id AND b.day = a.day
WHERE a.songs = b.songs;
```

## Complexity

- **Time:** `O(n log n)` — grouping/sorting song sets per user-day plus a join over friendships.
- **Space:** `O(n)` for the aggregated per-user-day song strings.
