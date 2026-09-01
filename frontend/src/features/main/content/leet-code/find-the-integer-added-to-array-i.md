# 3131. Find the Integer Added to Array I

**Difficulty:** Easy
**Category:** Array

## Problem

You are given two equal-length integer arrays `nums1` and `nums2`. Every element of `nums1` was increased (or decreased) by the same integer `x` to produce a permutation of `nums2`. Return `x`.

### Example

```
Input: nums1 = [2,6,4], nums2 = [9,7,5]
Output: 3
```

## Approach

Since every element shifts by the same constant `x`, the minimum of `nums1` maps to the minimum of `nums2`. So `x` is simply the difference between the two arrays' minimums.

## C# Solution

```csharp
public class Solution {
    public int AddedInteger(int[] nums1, int[] nums2) {
        return nums2.Min() - nums1.Min();
    }
}
```

## Complexity

- Time: O(n) — finding the minimum of each array.
- Space: O(1).
