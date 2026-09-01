# 597. Friend Requests I: Overall Acceptance Rate

**Difficulty:** Easy
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `FriendRequest` table (`sender_id`, `send_to_id`, `request_date`) and a `RequestAccepted` table (`requester_id`, `accepter_id`, `accept_date`), write a query to report the overall acceptance rate of friend requests, rounded to 2 decimal places (treating duplicate requests or acceptances between the same pair as a single request).

### Schema

```
FriendRequest: sender_id, send_to_id, request_date
RequestAccepted: requester_id, accepter_id, accept_date
```

## Approach

Deduplicate both tables down to distinct sender/receiver pairs, since the same pair might submit or accept a request more than once but should only count once. Divide the count of distinct accepted pairs by the count of distinct sent pairs to get the acceptance rate, guarding against division by zero (no requests sent at all) by defaulting to `0`.

## SQL Solution

```sql
SELECT
    ROUND(
        IFNULL(
            (SELECT COUNT(*) FROM (SELECT DISTINCT requester_id, accepter_id FROM RequestAccepted) AS accepted)
            /
            (SELECT COUNT(*) FROM (SELECT DISTINCT sender_id, send_to_id FROM FriendRequest) AS sent),
            0
        ),
        2
    ) AS accept_rate;
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of request/acceptance rows.
- **Space:** `O(n)` for the deduplicated intermediate sets.
