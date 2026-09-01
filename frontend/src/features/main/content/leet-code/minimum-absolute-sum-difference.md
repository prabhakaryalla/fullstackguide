# 1818. Minimum Absolute Sum Difference

**Difficulty:** Medium
**Category:** Array, Binary Search, Sorting

## Problem

Given two arrays `nums1` and `nums2` of the same length, the absolute sum difference is `sum(|nums1[i] - nums2[i]|)`. You may replace at most one element of `nums1` with any other element from `nums1` to minimize this sum. Return the minimum possible sum modulo `1e9 + 7`.

### Example

```
Input: nums1 = [1,7,5], nums2 = [2,3,5]
Output: 3
Explanation: Replacing nums1[1]=7 with nums1[0]=1 gives |1-2|+|1-3|+|5-5| = 1+2+0 = 3.
```

## Approach

Compute the original total absolute difference. For each index `i`, find the best possible replacement value from a sorted copy of `nums1` using binary search for the closest value to `nums2[i]` — check both the insertion point and the element just before it, since one of those two candidates is the closest match. Track the maximum possible reduction ("gain") over all indices, and subtract that single best gain from the original total.

## C# Solution

```csharp
public class Solution
{
    public int MinAbsoluteSumDiff(int[] nums1, int[] nums2)
    {
        const int Mod = 1_000_000_007;
        int n = nums1.Length;
        var sorted = (int[])nums1.Clone();
        Array.Sort(sorted);

        long total = 0;
        long maxGain = 0;

        for (int i = 0; i < n; i++)
        {
            int diff = Math.Abs(nums1[i] - nums2[i]);
            total += diff;

            int pos = LowerBound(sorted, nums2[i]);
            if (pos < n)
                maxGain = Math.Max(maxGain, diff - Math.Abs(sorted[pos] - nums2[i]));
            if (pos > 0)
                maxGain = Math.Max(maxGain, diff - Math.Abs(sorted[pos - 1] - nums2[i]));
        }

        return (int)((total - maxGain) % Mod);
    }

    private int LowerBound(int[] arr, int target)
    {
        int lo = 0, hi = arr.Length;
        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (arr[mid] < target) lo = mid + 1; else hi = mid;
        }
        return lo;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for sorting plus a binary search per index.
- **Space:** `O(n)` for the sorted copy.
