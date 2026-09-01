# 2004. The Number of Seniors and Juniors to Join the Company

**Difficulty:** Hard
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Table `Candidates(employee_id, name, experience, salary)` where `experience` is either `'Senior'` or `'Junior'`. The company has a budget of $70000 to hire new employees. Hiring rules:
- Hire as many seniors as possible: process seniors ordered by ascending salary (ties broken by employee_id), keep accumulating salary and stop hiring seniors as soon as the running total would reach or exceed $70000.
- Use whatever budget remains after hiring seniors to hire juniors the same way (ordered by ascending salary, ties by employee_id), stopping once the running total for juniors would reach or exceed the remaining budget.

Return the `employee_id` of every hired candidate.

### Schema

```
Candidates: employee_id (PK), name, experience ('Senior'|'Junior'), salary
```

## Approach

For each experience group, order candidates by salary then employee_id and compute a running total with a window `SUM(...) OVER (PARTITION BY experience ORDER BY salary, employee_id)`. Because salaries are positive, this running total is strictly increasing, so keeping rows where `accumulated_salary < 70000` yields exactly the greedy prefix that can be hired. Find the total salary spent on hired seniors, subtract it from 70000 to get the remaining budget, then apply the same running-total filter to juniors against that remaining budget.

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
