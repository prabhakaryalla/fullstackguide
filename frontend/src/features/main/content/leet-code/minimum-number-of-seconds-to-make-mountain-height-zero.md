# 3296. Minimum Number of Seconds to Make Mountain Height Zero

**Difficulty:** Medium
**Category:** Array, Binary Search

## Problem

You are given an integer `mountainHeight` and an array `workerTimes`. Worker `i` takes `workerTimes[i]` seconds to reduce the mountain height by 1 the first time, `2 * workerTimes[i]` seconds for the second reduction, `3 * workerTimes[i]` seconds for the third, and so on (all workers work simultaneously). Return the minimum number of seconds required to make the mountain height 0.

### Example

```
Input: mountainHeight = 4, workerTimes = [2,1,1]
Output: 3
```

## Approach

Binary search on the total time `T`. For a candidate `T`, and for a worker with `workerTimes[i] = w`, the maximum number of reductions `x` that worker can perform within `T` seconds satisfies `w * x * (x + 1) / 2 <= T`; this maximum `x` can be found with an inner binary search (or the quadratic formula). Summing the maximum reductions across all workers and checking whether the total is at least `mountainHeight` gives the feasibility check for the outer binary search. The smallest feasible `T` is the answer.

## C# Solution

```csharp
public class Solution 
{
    public long MinNumberOfSeconds(int mountainHeight, int[] workerTimes) 
    {
        int minWorkerTime = workerTimes[0];
        foreach (int w in workerTimes) 
        {
            if (w < minWorkerTime) minWorkerTime = w;
        }

        long lo = 0;
        long hi = (long)minWorkerTime * mountainHeight * (mountainHeight + 1) / 2;

        while (lo < hi) 
        {
            long mid = lo + (hi - lo) / 2;
            if (CanReduce(mid, workerTimes, mountainHeight)) 
            {
                hi = mid;
            } 
            else 
            {
                lo = mid + 1;
            }
        }

        return lo;
    }

    private bool CanReduce(long time, int[] workerTimes, int mountainHeight) 
    {
        long total = 0;
        foreach (int w in workerTimes) 
        {
            total += MaxReduction(time, w, mountainHeight);
            if (total >= mountainHeight) return true;
        }
        return total >= mountainHeight;
    }

    private long MaxReduction(long time, int workerTime, int mountainHeight) 
    {
        long lo = 0, hi = mountainHeight;

        while (lo < hi) 
        {
            long mid = lo + (hi - lo + 1) / 2;
            long cost = (long)workerTime * mid * (mid + 1) / 2;
            if (cost <= time) 
            {
                lo = mid;
            } 
            else 
            {
                hi = mid - 1;
            }
        }

        return lo;
    }
}
```

## Complexity

- **Time:** O(n log(maxTime) log(mountainHeight))
- **Space:** O(1)
