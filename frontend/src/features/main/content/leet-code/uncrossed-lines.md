# 1035. Uncrossed Lines

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

Given two integer arrays `nums1` and `nums2`, draw connecting lines between equal-valued elements such that no two lines intersect. Return the maximum number of connecting lines that can be drawn.

### Example

```
Input: nums1 = [1,4,2], nums2 = [1,2,4]
Output: 2
```

## Approach

Two lines cross only when the connections aren't in increasing order in both arrays simultaneously, so this is exactly the Longest Common Subsequence problem between `nums1` and `nums2`. Use the standard 2D DP: `dp[i][j]` is the LCS length using the first `i` elements of `nums1` and first `j` elements of `nums2` — extend by one when the elements match, otherwise take the best of skipping one element from either array.

## C# Solution

```csharp
public class Solution
{
    public int MaxUncrossedLines(int[] nums1, int[] nums2)
    {
        int m = nums1.Length, n = nums2.Length;
        var dp = new int[m + 1, n + 1];

        for (int i = 1; i <= m; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                if (nums1[i - 1] == nums2[j - 1])
                    dp[i, j] = dp[i - 1, j - 1] + 1;
                else
                    dp[i, j] = Math.Max(dp[i - 1, j], dp[i, j - 1]);
            }
        }

        return dp[m, n];
    }
}
```

## Complexity

- **Time:** `O(m * n)`.
- **Space:** `O(m * n)`.
