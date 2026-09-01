# 602. Friend Requests II: Who Has the Most Friends

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `RequestAccepted` table (`requester_id`, `accepter_id`, `accept_date`) representing accepted friend requests, write a query to find the person with the most friends and report their id along with the friend count.

### Schema

```
RequestAccepted: requester_id, accepter_id, accept_date
```

## Approach

Since a friendship is counted for both the requester and the accepter, combine both columns into a single list of person-appearances using `UNION ALL` (both roles count toward a person's total friend count). Group by person id, count occurrences, and take the person with the highest count.

## SQL Solution

```sql
SELECT id, COUNT(*) AS num
FROM (
    SELECT requester_id AS id FROM RequestAccepted
    UNION ALL
    SELECT accepter_id AS id FROM RequestAccepted
) AS combined
GROUP BY id
ORDER BY num DESC
LIMIT 1;
```

## Complexity

- **Time:** `O(n log n)` for the grouping and sort, where `n` is the number of accepted requests.
- **Space:** `O(n)` for the combined intermediate result.
