# 1723. Find Minimum Time to Finish All Jobs

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Backtracking, Binary Search, Bit Manipulation

## Problem

Given an array `jobs` and an integer `k` representing the number of workers, assign every job to exactly one worker to minimize the maximum total time any single worker is assigned. Return that minimum possible maximum working time.

### Example

```
Input: jobs = [3,2,3], k = 3
Output: 3
```

## Approach

Binary search on the answer (the maximum allowed load). For a candidate limit, use backtracking to try assigning jobs (sorted descending, so large jobs are placed first and infeasibility is detected early) to workers, skipping duplicate empty-load workers to avoid redundant branches, and pruning whenever a worker's load would exceed the limit.

## C# Solution

```csharp
public class Solution
{
    public int MinimumTimeRequired(int[] jobs, int k)
    {
        Array.Sort(jobs);
        Array.Reverse(jobs);

        int lo = jobs[0], hi = jobs.Sum();
        int[] workers = new int[k];

        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            Array.Clear(workers, 0, k);
            if (CanAssign(jobs, 0, workers, mid)) hi = mid;
            else lo = mid + 1;
        }

        return lo;
    }

    private bool CanAssign(int[] jobs, int idx, int[] workers, int limit)
    {
        if (idx == jobs.Length) return true;

        var seenLoads = new HashSet<int>();
        for (int i = 0; i < workers.Length; i++)
        {
            if (!seenLoads.Add(workers[i])) continue;
            if (workers[i] + jobs[idx] > limit) continue;

            workers[i] += jobs[idx];
            if (CanAssign(jobs, idx + 1, workers, limit)) return true;
            workers[i] -= jobs[idx];
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(k^n log(sum(jobs)))` worst case, heavily pruned in practice.
- **Space:** `O(n + k)` for the recursion and worker array.
