# 826. Most Profit Assigning Work

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting, Two Pointers, Binary Search

## Problem

Given parallel arrays `difficulty` and `profit` describing jobs, and an array `worker` of worker abilities, assign at most one job to each worker (a worker can do a job only if their ability is `>=` the job's difficulty), and each job can be assigned to multiple workers. Return the maximum total profit achievable.

### Example

```
Input: difficulty = [2,4,6,8,10], profit = [10,20,30,40,50], worker = [4,5,6,7]
Output: 100
```

## Approach

Sort jobs by difficulty and sort workers by ability. Sweep through workers in increasing order of ability, using a pointer into the sorted jobs to advance through and unlock every job whose difficulty is now `<=` the current worker's ability, tracking the best profit seen among unlocked jobs so far. Since ability only increases as we proceed, previously unlocked jobs remain available, so each worker simply takes the best profit unlocked up to their ability level.

## C# Solution

```csharp
public class Solution
{
    public int MaxProfitAssignment(int[] difficulty, int[] profit, int[] worker)
    {
        int n = difficulty.Length;
        var jobs = new (int Difficulty, int Profit)[n];
        for (int i = 0; i < n; i++)
            jobs[i] = (difficulty[i], profit[i]);

        Array.Sort(jobs, (a, b) => a.Difficulty - b.Difficulty);
        Array.Sort(worker);

        int totalProfit = 0, bestProfit = 0, jobIndex = 0;

        foreach (var ability in worker)
        {
            while (jobIndex < n && jobs[jobIndex].Difficulty <= ability)
            {
                bestProfit = Math.Max(bestProfit, jobs[jobIndex].Profit);
                jobIndex++;
            }

            totalProfit += bestProfit;
        }

        return totalProfit;
    }
}
```

## Complexity

- **Time:** `O(n log n + m log m)`.
- **Space:** `O(n)` for the sorted jobs array.
