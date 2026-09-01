# 1383. Maximum Performance of a Team

**Difficulty:** Hard
**Category:** Array, Greedy, Sorting, Heap (Priority Queue)

## Problem

Given `n` engineers with `speed` and `efficiency` arrays, choose at most `k` of them to form a team whose performance (sum of speeds times the minimum efficiency among chosen members) is maximized, modulo `10^9 + 7`.

### Example

```
Input: n = 6, speed = [2,10,3,1,5,8], efficiency = [5,4,3,9,7,2], k = 2
Output: 60
```

## Approach

Sort engineers by efficiency descending, so that when considering the current engineer, their efficiency is the minimum among everyone considered so far — meaning performance can be evaluated as the current efficiency times the sum of speeds of up to `k` chosen engineers. Maintain a min-heap of the speeds of the currently selected team; add the current engineer, and if the team exceeds size `k`, evict the smallest speed. Track the best performance value seen at each step.

## C# Solution

```csharp
public class Solution
{
    public int MaxPerformance(int n, int[] speed, int[] efficiency, int k)
    {
        const long MOD = 1_000_000_007;
        var engineers = Enumerable.Range(0, n)
            .OrderByDescending(i => efficiency[i])
            .ToArray();

        var minHeap = new PriorityQueue<int, int>();
        long speedSum = 0, best = 0;

        foreach (int i in engineers)
        {
            minHeap.Enqueue(speed[i], speed[i]);
            speedSum += speed[i];

            if (minHeap.Count > k)
            {
                speedSum -= minHeap.Dequeue();
            }

            best = Math.Max(best, speedSum * efficiency[i]);
        }

        return (int)(best % MOD);
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(k)` for the heap.
