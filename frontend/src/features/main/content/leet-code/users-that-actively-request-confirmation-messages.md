# 1939. Users That Actively Request Confirmation Messages

**Difficulty:** Easy
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

`Table: Signups(user_id, time_stamp)` and `Table: Confirmations(user_id, time_stamp, action)`. Return the ids of users who requested a second confirmation message within 24 hours of a previous confirmation-message request (any two consecutive request timestamps for the same user that are at most 24 hours apart).

### Example

```
Input:
Confirmations: (6,'2021-03-06 00:00:00'), (6,'2021-03-07 00:00:00')
Output: (6)
Explanation: Both requests for user 6 are exactly 24 hours apart.
```

## Approach

Self-join `Confirmations` to itself on the same `user_id` with differing timestamps, and check whether the absolute time difference between any two request timestamps for that user is at most 24 hours (using a timestamp-difference function). Return the distinct set of user ids for which such a pair exists.

```sql
SELECT DISTINCT c1.user_id
FROM Confirmations c1
JOIN Confirmations c2
  ON c1.user_id = c2.user_id
 AND c1.time_stamp <> c2.time_stamp
 AND ABS(TIMESTAMPDIFF(SECOND, c1.time_stamp, c2.time_stamp)) <= 86400;
```

## Complexity

- **Time:** `O(n^2)` in the worst case for the self-join per user's request count.
- **Space:** `O(n)` for the distinct result set.
