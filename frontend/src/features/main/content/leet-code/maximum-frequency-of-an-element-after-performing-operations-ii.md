# 3347. Maximum Frequency of an Element After Performing Operations II

**Difficulty:** Hard
**Category:** Array, Binary Search, Sliding Window, Sorting, Prefix Sum

## Problem

You are given an integer array `nums` and two integers `k` and `numOperations`, with values up to `10^9`. You must perform `numOperations` operations, each selecting an index not previously selected and adding an integer in `[-k, k]` to `nums[i]`.

Return the maximum possible frequency of any element in `nums` after performing the operations.

### Example

Input: `nums = [1,4,5], k = 1, numOperations = 2`

Output: `2`

## Approach

This is the large-constraint version of the same problem. Because values can be huge, the optimal target value is not guaranteed to be an existing array value alone — the relevant candidates are `nums[i] - k`, `nums[i]`, and `nums[i] + k` for every `i` (the points where the window boundaries align with actual data).

For each candidate target `V`:
- `windowSize` = count of elements in `[V - k, V + k]` via binary search on the sorted array.
- `countEqual` = number of elements exactly equal to `V` (0 if `V` isn't an original array value).
- Achievable frequency = `min(windowSize, countEqual + numOperations)`.

Track the maximum achievable frequency across all `3n` candidates.

## C# Solution

```csharp
public class Solution 
{
    public int MaxFrequency(int[] nums, int k, int numOperations) 
    {
        int[] sorted = (int[])nums.Clone();
        Array.Sort(sorted);

        var freq = new Dictionary<int, int>();
        foreach (int v in nums) freq[v] = freq.GetValueOrDefault(v, 0) + 1;

        int ans = 0;
        foreach (int v in nums)
        {
            long[] candidates = { (long)v - k, v, (long)v + k };
            foreach (long target in candidates)
            {
                long lowBound = target - k;
                long highBound = target + k;
                int lo = LowerBound(sorted, lowBound);
                int hi = UpperBound(sorted, highBound) - 1;
                if (hi < lo) continue;

                int windowSize = hi - lo + 1;
                int countEqual = (target >= int.MinValue && target <= int.MaxValue)
                    ? freq.GetValueOrDefault((int)target, 0)
                    : 0;
                int achievable = Math.Min(windowSize, countEqual + numOperations);
                ans = Math.Max(ans, achievable);
            }
        }
        return ans;
    }

    private int LowerBound(int[] arr, long value)
    {
        int lo = 0, hi = arr.Length;
        while (lo < hi)
        {
            int mid = (lo + hi) / 2;
            if (arr[mid] < value) lo = mid + 1; else hi = mid;
        }
        return lo;
    }

    private int UpperBound(int[] arr, long value)
    {
        int lo = 0, hi = arr.Length;
        while (lo < hi)
        {
            int mid = (lo + hi) / 2;
            if (arr[mid] <= value) lo = mid + 1; else hi = mid;
        }
        return lo;
    }
}
```

## Complexity

- **Time:** O(n log n) — 3n candidates, each resolved with two binary searches.
- **Space:** O(n) for the sorted array and frequency map.
