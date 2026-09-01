# 2035. Partition Array Into Two Arrays to Minimize Sum Difference

**Difficulty:** Hard
**Category:** Array, Two Pointers, Binary Search, Bitmask, Sorting

## Problem

You are given an integer array `nums` of `2 * n` integers. Partition `nums` into two arrays of length `n` each, and return *the minimum possible absolute difference between the sums of the two arrays*.

## Approach

Split `nums` into two halves, `left` and `right`, each of size `n`. Use meet-in-the-middle: for each half, enumerate all `2^n` subsets and group the resulting subset sums by how many elements were chosen (`sumsByCount[c]` = list of sums achievable using exactly `c` elements from that half). Sort each `right` bucket.

We want to choose exactly `n` elements total (forming one partition) whose sum is as close as possible to `total / 2`. For every count `c` from `0` to `n`, and every achievable sum `ls` in `leftSums[c]`, we need `n - c` more elements from the right half; binary-search the sorted `rightSums[n - c]` bucket for the value closest to `total / 2 - ls`, check both the candidate at that position and the one just before it (to catch both the floor and ceiling), and update the best difference `|total - 2 * (ls + rs)|`.

## C# Solution

```csharp
public class Solution
{
    public int MinimumDifference(int[] nums)
    {
        int n = nums.Length / 2;
        int[] left = nums[0..n];
        int[] right = nums[n..];

        var leftSums = GenerateSumsByCount(left, n);
        var rightSums = GenerateSumsByCount(right, n);

        for (int c = 0; c <= n; c++)
            rightSums[c].Sort();

        long total = nums.Sum(x => (long)x);
        long best = long.MaxValue;

        for (int c = 0; c <= n; c++)
        {
            var rs = rightSums[n - c];
            foreach (var ls in leftSums[c])
            {
                long targetHalf = total / 2 - ls;
                int idx = LowerBound(rs, targetHalf);

                if (idx < rs.Count)
                    best = Math.Min(best, Math.Abs(total - 2 * (ls + rs[idx])));
                if (idx > 0)
                    best = Math.Min(best, Math.Abs(total - 2 * (ls + rs[idx - 1])));
            }
        }

        return (int)best;
    }

    private List<long>[] GenerateSumsByCount(int[] arr, int n)
    {
        var result = new List<long>[n + 1];
        for (int i = 0; i <= n; i++) result[i] = new List<long>();

        int len = arr.Length;
        for (int mask = 0; mask < (1 << len); mask++)
        {
            int count = System.Numerics.BitOperations.PopCount((uint)mask);
            long sum = 0;
            for (int i = 0; i < len; i++)
                if ((mask & (1 << i)) != 0)
                    sum += arr[i];

            result[count].Add(sum);
        }

        return result;
    }

    private int LowerBound(List<long> sorted, long target)
    {
        int lo = 0, hi = sorted.Count;
        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (sorted[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}
```

## Complexity

- **Time:** `O(2^n * n)` to generate the subset sums, plus `O(2^n * log(2^n))` for the binary-search combination step, where `n = nums.Length / 2`.
- **Space:** `O(2^n)` for the subset sum buckets.
