# 3132. Find the Integer Added to Array II

**Difficulty:** Medium
**Category:** Array, Enumeration, Sorting

## Problem

You are given two integer arrays `nums1` and `nums2`, where `nums1.Length == nums2.Length + 2`. Every remaining element of `nums1` (after removing exactly two elements) was increased by the same integer `x` to form a permutation of `nums2`. Return the minimum possible value of `x`.

## Approach

Sort both arrays. After removing two elements from `nums1`, at least one of its first three elements (indices `0`, `1`, or `2`) must survive and map to `nums2[0]` (the smallest surviving element overall). So try each of the three candidate offsets `x = nums2[0] - nums1[i]` for `i in {0, 1, 2}`; for each candidate, greedily walk through sorted `nums1`, matching consecutive elements of `nums2` whenever `num + x` equals the next expected `nums2` value, and count how many `nums1` elements had to be skipped (not matched). A candidate is valid if at most 2 elements were skipped. Return the smallest valid `x`.

## C# Solution

```csharp
public class Solution {
    public int MinimumAddedInteger(int[] nums1, int[] nums2) {
        int ans = int.MaxValue;
        Array.Sort(nums1);
        Array.Sort(nums2);

        for (int i = 0; i < 3; i++) {
            int inc = nums2[0] - nums1[i];
            if (IsValidDiff(nums1, nums2, inc))
                ans = Math.Min(ans, inc);
        }

        return ans;
    }

    private bool IsValidDiff(int[] nums1, int[] nums2, int inc) {
        int removed = 0;
        int i = 0;

        foreach (int num in nums1) {
            if (i < nums2.Length && num + inc == nums2[i]) {
                i++;
                if (i == nums2.Length)
                    break;
            } else {
                removed++;
            }
        }

        return removed <= 2;
    }
}
```

## Complexity

- Time: O(n log n) — dominated by sorting; the matching pass is linear.
- Space: O(1) — beyond the sorted input arrays.
