# 574. Winning Candidate

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Candidate` table (`id`, `name`) and a `Vote` table (`id`, `candidateId`), write a query to report the name of the candidate who received the most votes.

### Schema

```
Candidate: id (PK), name
Vote: id (PK), candidateId (FK)
```

## Approach

Join votes to candidates, group by candidate, and count votes per group. Sort by vote count descending and take just the top result to find the winning candidate's name.

## SQL Solution

```sql
SELECT c.name
FROM Candidate c
JOIN Vote v ON c.id = v.candidateId
GROUP BY v.candidateId
ORDER BY COUNT(*) DESC
LIMIT 1;
```

## Complexity

- **Time:** `O(n log n)` for the sort, where `n` is the number of votes.
- **Space:** `O(n)` for the grouped intermediate result.
