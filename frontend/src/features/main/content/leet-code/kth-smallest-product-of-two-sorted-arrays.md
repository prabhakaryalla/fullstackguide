# 2040. Kth Smallest Product of Two Sorted Arrays

**Difficulty:** Hard
**Category:** Array, Binary Search

## Problem

Given two sorted 0-indexed integer arrays `nums1` and `nums2`, and an integer `k`, return *the `k`th smallest product* `nums1[i] * nums2[j]` among all pairs `(i, j)`.

## Approach

Binary search on the answer value `target`, over the full range of possible products (roughly `-10^10` to `10^10` given constraints). For a candidate `target`, count how many pairs have `nums1[i] * nums2[j] <= target`; the smallest `target` for which this count is `>= k` is the answer.

To count efficiently for a fixed `target`, iterate over each `num` in `nums1` and binary search within the sorted `nums2`:
- If `num == 0`: every pair contributes `0`, so all of `nums2` qualifies when `target >= 0`.
- If `num > 0`: the condition `num * x <= target` is monotonic in `x` (true for a prefix of the ascending `nums2`, since multiplying by a positive number preserves order), so binary search for the boundary directly using `long` arithmetic to avoid overflow.
- If `num < 0`: the condition holds for a **suffix** of `nums2` instead (multiplying by a negative number reverses the order), so binary search for that boundary.

Summing the qualifying counts per `num` gives the total count for `target`, and standard binary-search-for-the-boundary finds the minimal `target` whose count reaches `k`.

## C# Solution

```csharp
public class Solution
{
    public long KthSmallestProduct(int[] nums1, int[] nums2, long k)
    {
        long lo = -10_000_000_000L, hi = 10_000_000_000L;

        while (lo < hi)
        {
            long mid = lo + (hi - lo) / 2;
            if (CountLessOrEqual(nums1, nums2, mid) >= k)
                hi = mid;
            else
                lo = mid + 1;
        }

        return lo;
    }

    private long CountLessOrEqual(int[] nums1, int[] nums2, long target)
    {
        int m = nums2.Length;
        long count = 0;

        foreach (var num in nums1)
        {
            if (num == 0)
            {
                if (target >= 0) count += m;
                continue;
            }

            int left = 0, right = m;
            if (num > 0)
            {
                while (left < right)
                {
                    int mid = left + (right - left) / 2;
                    if ((long)num * nums2[mid] <= target)
                        left = mid + 1;
                    else
                        right = mid;
                }
                count += left;
            }
            else
            {
                while (left < right)
                {
                    int mid = left + (right - left) / 2;
                    if ((long)num * nums2[mid] <= target)
                        right = mid;
                    else
                        left = mid + 1;
                }
                count += m - left;
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n * log m * log R)`, where `R` is the range of possible product values.
- **Space:** `O(1)` extra.
