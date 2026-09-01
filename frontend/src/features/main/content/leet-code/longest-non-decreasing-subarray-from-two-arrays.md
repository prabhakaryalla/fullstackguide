# 2771. Longest Non-decreasing Subarray From Two Arrays

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

You are given two 0-indexed integer arrays `nums1` and `nums2` of equal length `n`. You can construct an array `nums3` by choosing elements from either `nums1` or `nums2` at each index.

Find the length of the longest non-decreasing subarray in `nums3`.

### Example

```
Input: nums1 = [2,3,1], nums2 = [1,2,1]
Output: 2
Explanation: Construct nums3 = [2,3,1] by taking from nums1, or [1,2,1] from nums2, or [2,2,1] mixed. The longest non-decreasing subarray has length 2.
```

## Approach

Use dynamic programming with two states:
- `dp1[i]` = length of longest non-decreasing subarray ending at index `i` using `nums1[i]`
- `dp2[i]` = length of longest non-decreasing subarray ending at index `i` using `nums2[i]`

For each index, we can extend from either previous state if the non-decreasing property holds.

## C# Solution

```csharp
public class Solution
{
    public int MaxNonDecreasingLength(int[] nums1, int[] nums2)
    {
        int n = nums1.Length;
        int[] dp1 = new int[n];
        int[] dp2 = new int[n];
        
        dp1[0] = 1;
        dp2[0] = 1;
        int maxLen = 1;
        
        for (int i = 1; i < n; i++)
        {
            dp1[i] = 1;
            dp2[i] = 1;
            
            if (nums1[i] >= nums1[i - 1])
            {
                dp1[i] = Math.Max(dp1[i], dp1[i - 1] + 1);
            }
            if (nums1[i] >= nums2[i - 1])
            {
                dp1[i] = Math.Max(dp1[i], dp2[i - 1] + 1);
            }
            
            if (nums2[i] >= nums1[i - 1])
            {
                dp2[i] = Math.Max(dp2[i], dp1[i - 1] + 1);
            }
            if (nums2[i] >= nums2[i - 1])
            {
                dp2[i] = Math.Max(dp2[i], dp2[i - 1] + 1);
            }
            
            maxLen = Math.Max(maxLen, Math.Max(dp1[i], dp2[i]));
        }
        
        return maxLen;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the arrays
- **Space:** O(n) for the dp arrays
