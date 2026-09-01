# 3763. Maximum Total Sum with Threshold Constraints

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting, Binary Search
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given an integer array `nums` and an integer `threshold`. You may select any subset of the array's elements, but the subset is valid only if the **minimum** value among the selected elements multiplied by the **count** of selected elements is less than or equal to `threshold`. Among all valid subsets, return the maximum possible sum of a selected subset.

## Approach
Sort the array in descending order. Because the constraint depends on `min(selected) * count(selected) <= threshold`, and larger elements contribute more to the sum, greedily consider taking the largest `k` elements for increasing `k` starting from `1`. Since the array is sorted descending, the minimum of the first `k` elements is `nums[k-1]` (0-indexed), so the constraint becomes `nums[k-1] * k <= threshold`. For each `k` from `1` to `n`, check this constraint; if satisfied, the sum of the first `k` elements is a valid candidate for the answer (this is valid because for a fixed count `k`, taking the `k` largest elements maximizes the sum while minimizing the risk of violating the threshold, since the minimum of the top `k` is as large as possible, and if a smaller `k`-element subset with a smaller minimum satisfies the constraint that only makes it easier, not harder). Track the maximum sum encountered across all valid `k`, using prefix sums for O(1) sum lookups per `k`.

## C# Solution

```csharp
public class Solution 
{
    public long MaxTotalSum(int[] nums, int threshold)
    {
        int n = nums.Length;
        int[] sorted = (int[])nums.Clone();
        Array.Sort(sorted);
        Array.Reverse(sorted);

        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++)
        {
            prefix[i + 1] = prefix[i] + sorted[i];
        }

        long best = 0;
        for (int k = 1; k <= n; k++)
        {
            long minVal = sorted[k - 1];
            if (minVal * (long)k <= threshold)
            {
                best = Math.Max(best, prefix[k]);
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
