# 1235. Maximum Profit in Job Scheduling

**Difficulty:** Hard
**Category:** Array, Binary Search, Dynamic Programming, Sorting

## Problem

Given `startTime`, `endTime`, and `profit` arrays describing `n` jobs, choose a subset of non-overlapping jobs (a job occupies `[startTime[i], endTime[i])`) to maximize total profit, and return that maximum.

### Example

```
Input: startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]
Output: 120
```

## Approach

Sort jobs by end time and build a DP array where `dp[i]` is the best profit achievable using only the first `i` jobs (in sorted order). For each job, either skip it (`dp[i-1]`) or take it, in which case add its profit to the best profit achievable from jobs that finish at or before this job's start time — found quickly via binary search over the sorted end times, since that subset is a prefix of the sorted order.

## C# Solution

```csharp
public class Solution
{
    public int JobScheduling(int[] startTime, int[] endTime, int[] profit)
    {
        int n = startTime.Length;
        var jobs = Enumerable.Range(0, n)
            .Select(i => (Start: startTime[i], End: endTime[i], Profit: profit[i]))
            .OrderBy(j => j.End)
            .ToArray();

        var endTimes = jobs.Select(j => j.End).ToArray();
        var dp = new int[n + 1];

        for (int i = 1; i <= n; i++)
        {
            var job = jobs[i - 1];
            int prevIndex = FindLatestNonConflicting(endTimes, i - 1, job.Start);
            dp[i] = Math.Max(dp[i - 1], job.Profit + dp[prevIndex]);
        }

        return dp[n];
    }

    private int FindLatestNonConflicting(int[] endTimes, int count, int start)
    {
        int lo = 0, hi = count;
        while (lo < hi)
        {
            int mid = lo + (hi - lo + 1) / 2;
            if (endTimes[mid - 1] <= start) lo = mid;
            else hi = mid - 1;
        }
        return lo;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)`.
