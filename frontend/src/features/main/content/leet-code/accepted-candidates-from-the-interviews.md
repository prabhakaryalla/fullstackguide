# 2041. Accepted Candidates From the Interviews

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Table `Candidates(candidate_id, name, years_of_exp, interview_id)` and table `Rounds(interview_id, round_id, score)`. A candidate is accepted if they have at least 2 years of experience and the sum of their interview scores (summed across all rounds tied to their `interview_id`) is strictly greater than 15. Return the `candidate_id` of every accepted candidate.

### Schema

```
Candidates: candidate_id (PK), name, years_of_exp, interview_id
Rounds: interview_id, round_id, score
```

## Approach

Join `Candidates` to `Rounds` on `interview_id`, filter for `years_of_exp >= 2`, group by candidate, and keep groups whose total score exceeds 15.

## SQL Solution

```sql
SELECT Candidates.candidate_id
FROM Candidates
INNER JOIN Rounds
    ON Candidates.interview_id = Rounds.interview_id
WHERE Candidates.years_of_exp >= 2
GROUP BY Candidates.candidate_id
HAVING SUM(Rounds.score) > 15;
```

## Complexity

- **Time:** O(n + m) for the join and aggregation
- **Space:** O(n)
