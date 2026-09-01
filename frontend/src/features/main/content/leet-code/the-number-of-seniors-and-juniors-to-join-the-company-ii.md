# 2010. The Number of Seniors and Juniors to Join the Company II

**Difficulty:** Hard
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Same setup as "The Number of Seniors and Juniors to Join the Company": `Candidates(employee_id, name, experience, salary)`, budget $70000. Hire seniors first (ordered by ascending salary, ties by employee_id) while the running total stays strictly under $70000, then hire juniors the same way with whatever budget remains. Return the `employee_id` of every hired candidate (this variant only asks for the ids, not counts).

### Schema

```
Candidates: employee_id (PK), name, experience ('Senior'|'Junior'), salary
```

## Approach

Identical accumulation technique as problem 2004: compute a running salary total per experience group ordered by `(salary, employee_id)` using a window function, keep the prefix under budget for seniors, then filter juniors against the leftover budget.

## SQL Solution

```sql
WITH AccumulatedCandidates AS (
    SELECT
        employee_id,
        experience,
        SUM(salary) OVER (
            PARTITION BY experience
            ORDER BY salary, employee_id
        ) AS accumulated_salary
    FROM Candidates
),
HiredSeniors AS (
    SELECT employee_id, accumulated_salary
    FROM AccumulatedCandidates
    WHERE experience = 'Senior' AND accumulated_salary < 70000
)
SELECT employee_id
FROM HiredSeniors
UNION ALL
SELECT juniors.employee_id
FROM AccumulatedCandidates AS juniors
WHERE
    juniors.experience = 'Junior'
    AND juniors.accumulated_salary < (
        SELECT 70000 - IFNULL(MAX(accumulated_salary), 0)
        FROM HiredSeniors
    );
```

## Complexity

- **Time:** O(n log n) for the window-function sort
- **Space:** O(n)
