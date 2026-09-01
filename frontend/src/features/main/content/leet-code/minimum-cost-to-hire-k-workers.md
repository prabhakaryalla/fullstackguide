# 857. Minimum Cost to Hire K Workers

**Difficulty:** Hard
**Category:** Array, Greedy, Sorting, Heap

## Problem

Given `quality` and minimum `wage` requirements for `n` workers, hire exactly `k` of them into a group, paying each worker in proportion to their quality, subject to the constraint that every hired worker must be paid at least their minimum wage, and all workers in the group are paid at the same wage-to-quality ratio. Return the minimum total cost to hire `k` workers.

### Example

```
Input: quality = [10,20,5], wage = [70,50,30], k = 2
Output: 105.00000
```

## Approach

Since every worker in a chosen group is paid at the same ratio, that ratio must be at least the maximum individual `wage/quality` ratio among the chosen workers. Sort workers by their individual ratio ascending, and process them in that order, maintaining a max-heap of the qualities of the workers considered so far. For each new worker (whose ratio is the largest seen so far in this iteration, since we go in ascending order), if the heap already holds `k` workers, remove the one with the largest quality (to minimize total quality cost). Whenever the heap holds exactly `k` workers, compute the total cost using the current ratio and the sum of qualities in the heap, tracking the minimum.

## C# Solution

```csharp
public class Solution
{
    public double MincostToHireWorkers(int[] quality, int[] wage, int k)
    {
        int n = quality.Length;
        var workers = new (double Ratio, int Quality)[n];

        for (int i = 0; i < n; i++)
            workers[i] = ((double)wage[i] / quality[i], quality[i]);

        Array.Sort(workers, (a, b) => a.Ratio.CompareTo(b.Ratio));

        var heap = new PriorityQueue<int, int>();
        int qualitySum = 0;
        double minCost = double.MaxValue;

        foreach (var (ratio, q) in workers)
        {
            heap.Enqueue(q, -q);
            qualitySum += q;

            if (heap.Count > k)
            {
                heap.TryDequeue(out var removed, out _);
                qualitySum -= removed;
            }

            if (heap.Count == k)
                minCost = Math.Min(minCost, ratio * qualitySum);
        }

        return minCost;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the heap and sorted workers.
