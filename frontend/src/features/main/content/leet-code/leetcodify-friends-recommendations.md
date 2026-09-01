# 1917. Leetcodify Friends Recommendations

**Difficulty:** Hard
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

`Table: Listens(user_id, song_id, day)` and `Table: Friendship(user1_id, user2_id)`. Recommend user `x` to user `y` if: (1) `x` and `y` are not friends, and (2) on at least one day, both `x` and `y` listened to at least 3 common songs. Return all such recommended pairs, ordered arbitrarily but without duplicates in either direction (i.e., report both `(x, y)` and `(y, x)` if applicable, since it's a recommendation for `y`, not a symmetric friendship).

### Example

```
Input:
Listens: multiple rows showing user 1 and user 2 both listened to songs 2,3,4 on day '2021-01-01'
Friendship: (empty)
Output: (1,2), (2,1)
```

## Approach

Self-join `Listens` on matching `day` and `song_id` for two different users to find common-song listens per day, count distinct common songs per `(user_x, user_y, day)` group, filter groups with at least 3 distinct songs, and exclude pairs that already appear (in either order) in `Friendship`.

```sql
SELECT DISTINCT l1.user_id AS user1_id, l2.user_id AS user2_id
FROM Listens l1
JOIN Listens l2
  ON l1.day = l2.day
 AND l1.song_id = l2.song_id
 AND l1.user_id <> l2.user_id
WHERE NOT EXISTS (
    SELECT 1 FROM Friendship f
    WHERE (f.user1_id = l1.user_id AND f.user2_id = l2.user_id)
       OR (f.user1_id = l2.user_id AND f.user2_id = l1.user_id)
)
GROUP BY l1.user_id, l2.user_id, l1.day
HAVING COUNT(DISTINCT l1.song_id) >= 3;
```

## Complexity

- **Time:** `O(n^2)` in the worst case for the self-join over `Listens` rows sharing a day.
- **Space:** `O(n)` for the intermediate grouped result.
