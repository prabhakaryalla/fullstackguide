# 1951. All the Pairs With the Maximum Number of Common Followers

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

`Table: Relations(user_id, follower_id)`. For every pair of distinct users, compute the number of common followers they share. Return only the pairs (reported once, `user1_id < user2_id`) that achieve the maximum number of common followers among all pairs.

### Example

```
Input: Relations: (1,1),(2,1),(1,2),(2,2),(1,3),(2,3),(1,4)
Output: (1,2,3)
Explanation: Users 1 and 2 share followers 1, 2, and 3 — the maximum of any pair.
```

## Approach

Self-join `Relations` on matching `follower_id` for two different users to enumerate common-follower relationships, then group by the user pair (`user1_id < user2_id` to avoid duplicates/reversed pairs) and count the distinct common followers. Finally, keep only the group(s) whose count equals the overall maximum, found via a subquery or window function.

```sql
WITH PairCounts AS (
    SELECT r1.user_id AS user1_id, r2.user_id AS user2_id, COUNT(*) AS common_followers
    FROM Relations r1
    JOIN Relations r2
      ON r1.follower_id = r2.follower_id
     AND r1.user_id < r2.user_id
    GROUP BY r1.user_id, r2.user_id
)
SELECT user1_id, user2_id
FROM PairCounts
WHERE common_followers = (SELECT MAX(common_followers) FROM PairCounts);
```

## Complexity

- **Time:** `O(n^2)` in the worst case for the self-join over shared followers.
- **Space:** `O(n^2)` for the intermediate pair-count table.
