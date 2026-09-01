# 1855. Maximum Distance Between a Pair of Values

**Difficulty:** Medium
**Category:** Array, Two Pointers, Binary Search, Greedy

## Problem

Given two non-increasing integer arrays `nums1` and `nums2`, a pair `(i, j)` is valid if `i <= j` and `nums1[i] <= nums2[j]`. Return the maximum value of `j - i` over all valid pairs, or `0` if none exists.

### Example

```
Input: nums1 = [55,30,5,4,2], nums2 = [100,20,10,10,5]
Output: 2
```

## Approach

Use two pointers `i` and `j`, both starting at `0`. If `nums1[i] > nums2[j]`, the current `i` cannot validly pair with `j` or any earlier `j`, so advance `i`. Otherwise, the pair `(i, j)` is valid — record `j - i` as a candidate answer — and advance `j` to look for an even larger gap, since `nums1[i]` (fixed for now) will still be `<=` any `nums2` value at a `j'` `>= j` only if `nums2` doesn't drop below it, which the loop naturally re-validates. Because both arrays are non-increasing, each pointer only moves forward, giving a linear scan.

## C# Solution

```csharp
public class Solution
{
    public int MaxDistance(int[] nums1, int[] nums2)
    {
        int i = 0, j = 0;
        int n = nums1.Length, m = nums2.Length;
        int best = 0;

        while (i < n && j < m)
        {
            if (nums1[i] > nums2[j])
            {
                i++;
            }
            else
            {
                best = Math.Max(best, j - i);
                j++;
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n + m)`.
- **Space:** `O(1)`.
