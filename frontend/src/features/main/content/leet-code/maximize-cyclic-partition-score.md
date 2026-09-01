# 3743. Maximize Cyclic Partition Score

**Difficulty:** Hard
**Category:** Array, Greedy, Sorting

## Problem
You are given a **circular** integer array `nums` of length `n` and an integer `k` (`k <= n`). Partition the circle into exactly `k` contiguous (non-empty) segments. The score of a partition is the sum of the maximum element within each segment.

Return the maximum possible score over all valid partitions.

## Approach
For any contiguous (circular) partition into `k` segments, it is always possible to arrange the cut points so that each of the `k` largest values in `nums` ends up isolated as the maximum of its own segment: process candidate values from largest to smallest, and each one can be given its own segment boundary without conflicting with larger values that have already been assigned their own segments elsewhere on the circle.

Therefore the maximum achievable score is simply the sum of the `k` largest elements of `nums`, independent of their arrangement around the circle.

## C# Solution

```csharp
public class Solution
{
    public long MaxPartitionScore(int[] nums, int k)
    {
        int[] sorted = (int[])nums.Clone();
        Array.Sort(sorted);

        long score = 0;
        for (int i = sorted.Length - 1; i >= sorted.Length - k; i--)
        {
            score += sorted[i];
        }

        return score;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
