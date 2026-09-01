# 2323. Find Minimum Time to Finish All Jobs II

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given two 0-indexed integer arrays `jobs` and `workers` of equal length, where `jobs[i]` is the amount of time needed to complete the ith job, and `workers[i]` is the amount of time the ith worker can work each day.

Each job should be assigned to exactly one worker such that each worker works on only one job. Return the minimum number of days needed to complete all jobs after assignment.

### Example

```
Input: jobs = [5,2,4], workers = [1,7,5]
Output: 2
Explanation:
- Assign the 2nd worker to the 0th job (takes 5/7 < 1 day)
- Assign the 3rd worker to the 2nd job (takes 4/5 < 1 day)  
- Assign the 1st worker to the 1st job (takes 2/1 = 2 days)
The minimum number of days is 2.
```

## Approach

Use a greedy matching strategy:
1. Sort jobs in descending order
2. Sort workers in descending order
3. Match the largest job with the largest available worker
4. The answer is the maximum of ceil(job[i] / worker[i]) for all assignments

This greedy approach minimizes the maximum time by pairing harder jobs with more capable workers.

## C# Solution

```csharp
public class Solution
{
    public int MinimumTime(int[] jobs, int[] workers)
    {
        Array.Sort(jobs);
        Array.Sort(workers);
        Array.Reverse(jobs);
        Array.Reverse(workers);
        
        int maxDays = 0;
        
        for (int i = 0; i < jobs.Length; i++)
        {
            int days = (jobs[i] + workers[i] - 1) / workers[i];
            maxDays = Math.Max(maxDays, days);
        }
        
        return maxDays;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(1)
