# 718. Maximum Length of Repeated Subarray

**Difficulty:** Medium
**Category:** Array, Binary Search, Dynamic Programming, Sliding Window, Hash Function, Rolling Hash

## Problem

Given two integer arrays `nums1` and `nums2`, return the maximum length of a contiguous subarray that appears in both arrays.

### Example

```
Input: nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]
Output: 3
```

## Approach

Use dynamic programming where `dp[i][j]` is the length of the longest common suffix ending exactly at `nums1[i]` and `nums2[j]`. If those elements match, extend the run found at `dp[i+1][j+1]` by one (processing indices from the end backward makes this recurrence straightforward); otherwise, the run resets to zero at that position. Track the maximum value seen across the whole table.

## C# Solution

```csharp
public class Solution
{
    public int FindLength(int[] nums1, int[] nums2)
    {
        int n1 = nums1.Length, n2 = nums2.Length;
        var dp = new int[n1 + 1, n2 + 1];
        int maxLength = 0;

        for (int i = n1 - 1; i >= 0; i--)
        {
            for (int j = n2 - 1; j >= 0; j--)
            {
                if (nums1[i] == nums2[j])
                {
                    dp[i, j] = dp[i + 1, j + 1] + 1;
                    maxLength = Math.Max(maxLength, dp[i, j]);
                }
            }
        }

        return maxLength;
    }
}
```

## Complexity

- **Time:** `O(n1 * n2)`.
- **Space:** `O(n1 * n2)` for the DP table.
