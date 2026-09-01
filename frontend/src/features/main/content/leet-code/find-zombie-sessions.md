# 3673. Find Zombie Sessions

**Difficulty:** Medium
**Category:** Database

## Problem
Table `Sessions` holds columns `session_id`, `user_id`, `login_time`, and `logout_time` (which may be `NULL` if the session was never explicitly closed).

A session is called a **zombie session** if its `logout_time` is `NULL` and the same user later started another session (a session with a strictly greater `login_time`) — meaning the earlier session was abandoned rather than properly closed.

Write a solution to find the `session_id` of every zombie session, ordered by `session_id` ascending.

## Approach
Filter for sessions where `logout_time IS NULL`, then check whether the same user has any other session with a later `login_time` using a correlated `EXISTS` subquery. If such a later session exists, the current session is a zombie.

## SQL Solution

```sql
SELECT s.session_id
FROM Sessions s
WHERE s.logout_time IS NULL
  AND EXISTS (
      SELECT 1
      FROM Sessions s2
      WHERE s2.user_id = s.user_id
        AND s2.login_time > s.login_time
  )
ORDER BY s.session_id;
```

## Complexity

- **Time:** O(n^2) in the worst case without indexes, O(n log n) with an index on `(user_id, login_time)`
- **Space:** O(1) additional space beyond the result set
