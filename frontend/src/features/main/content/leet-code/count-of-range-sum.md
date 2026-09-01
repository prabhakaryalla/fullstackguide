# 327. Count of Range Sum

**Difficulty:** Hard
**Category:** Array, Binary Indexed Tree, Segment Tree, Merge Sort, Divide and Conquer

## Problem

Given an integer array `nums` and two integers `lower` and `upper`, return the number of range sums that lie in `[lower, upper]` inclusive, where a range sum `S(i, j)` is the sum of `nums[i]` to `nums[j]` (`i <= j`).

### Example

```
Input: nums = [-2,5,-1], lower = -2, upper = 2
Output: 3
```

### Constraints

- `1 <= nums.length <= 10^5`
- `-2^31 <= nums[i] <= 2^31 - 1`
- `-10^5 <= lower <= upper <= 10^5`

## Approach

Convert the problem into counting pairs `(i, j)` of prefix sums with `lower <= prefixSum[j] - prefixSum[i] <= upper`, then count such pairs using a merge-sort-based divide and conquer: while merging two sorted halves of prefix sums, for each left element use two sliding pointers over the right half to count how many right elements fall in the valid range.

## C# Solution

```csharp
public class Solution
{
    public int CountRangeSum(int[] nums, int lower, int upper)
    {
        int n = nums.Length;
        var prefixSums = new long[n + 1];
        for (int i = 0; i < n; i++)
            prefixSums[i + 1] = prefixSums[i] + nums[i];

        return MergeCount(prefixSums, 0, n, lower, upper);
    }

    private int MergeCount(long[] sums, int lo, int hi, int lower, int upper)
    {
        if (hi - lo <= 1) return 0;

        int mid = lo + (hi - lo) / 2;
        int count = MergeCount(sums, lo, mid, lower, upper) + MergeCount(sums, mid, hi, lower, upper);

        int j = mid, k = mid;
        for (int i = lo; i < mid; i++)
        {
            while (j < hi && sums[j] - sums[i] < lower) j++;
            while (k < hi && sums[k] - sums[i] <= upper) k++;
            count += k - j;
        }

        var merged = new long[hi - lo];
        int p1 = lo, p2 = mid, idx = 0;
        while (p1 < mid && p2 < hi)
            merged[idx++] = sums[p1] <= sums[p2] ? sums[p1++] : sums[p2++];
        while (p1 < mid) merged[idx++] = sums[p1++];
        while (p2 < hi) merged[idx++] = sums[p2++];

        Array.Copy(merged, 0, sums, lo, merged.Length);
        return count;
    }
}
```

## Complexity

- **Time:** `O(n log n)` — merge sort with constant extra work per merge step.
- **Space:** `O(n)` for the prefix sums and merge buffer.
