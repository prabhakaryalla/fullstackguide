# 805. Split Array With Same Average

**Difficulty:** Hard
**Category:** Array, Math, Dynamic Programming, Bitmask, Probability and Statistics

## Problem

Given an integer array `nums`, determine if it's possible to split it into two non-empty subsets (partitioning every element into exactly one subset) such that both subsets have the same average.

### Example

```
Input: nums = [1,2,3,4,5,6,7,8]
Output: true
```

## Approach

If a subset of size `k` has the same average as the whole array, its sum must equal `total * k / n`, which requires `total * k` to be divisible by `n`. By symmetry (a subset and its complement having the same average implies both subsets satisfy the condition), it suffices to check subset sizes `k` from `1` to `n / 2`. Build, for every possible subset size up to `n / 2`, the set of achievable sums using a 0/1 knapsack-style DP (iterating subset sizes downward for each new number to avoid reusing an element twice). For each valid size where `total * k` is divisible by `n`, check whether the required sum is achievable.

## C# Solution

```csharp
public class Solution
{
    public bool SplitArraySameAverage(int[] nums)
    {
        int n = nums.Length;
        int total = nums.Sum();
        int half = n / 2;

        var sumsBySize = new List<HashSet<int>>();
        for (int i = 0; i <= half; i++) sumsBySize.Add(new HashSet<int>());
        sumsBySize[0].Add(0);

        foreach (var num in nums)
        {
            for (int size = half; size >= 1; size--)
            {
                foreach (var sum in sumsBySize[size - 1].ToList())
                {
                    sumsBySize[size].Add(sum + num);
                }
            }
        }

        for (int size = 1; size <= half; size++)
        {
            if ((total * size) % n != 0) continue;

            int requiredSum = total * size / n;

            if (sumsBySize[size].Contains(requiredSum))
                return true;
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(n^2 * maxSum)` in the worst case.
- **Space:** `O(n * maxSum)` for the per-size sum sets.
