# 1458. Max Dot Product of Two Subsequences

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

Given `nums1` and `nums2`, return the maximum dot product between a non-empty subsequence of `nums1` and a non-empty subsequence of `nums2` of the same length.

### Example

```
Input: nums1 = [2,1,-2,5], nums2 = [3,0,-6]
Output: 18
```

## Approach

Define `dp[i][j]` as the best dot product achievable using elements from `nums1[0..i-1]` and `nums2[0..j-1]`, where the boundary rows/columns (`i = 0` or `j = 0`) represent "no elements available" and are seeded with negative infinity. For `i, j >= 1`, either skip `nums1[i-1]` (`dp[i-1][j]`), skip `nums2[j-1]` (`dp[i][j-1]`), or pair them together — contributing their product, optionally extended by the best prior pairing `dp[i-1][j-1]` if that's positive (since adding a negative-total previous pairing would only hurt). Take the maximum of these options.

## C# Solution

```csharp
public class Solution
{
    public int MaxDotProduct(int[] nums1, int[] nums2)
    {
        int n = nums1.Length, m = nums2.Length;
        const int NegInf = int.MinValue / 2;

        var dp = new int[n + 1, m + 1];
        for (int i = 0; i <= n; i++) dp[i, 0] = NegInf;
        for (int j = 0; j <= m; j++) dp[0, j] = NegInf;

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= m; j++)
            {
                int product = nums1[i - 1] * nums2[j - 1];
                int best = product + Math.Max(dp[i - 1, j - 1], 0);
                best = Math.Max(best, dp[i - 1, j]);
                best = Math.Max(best, dp[i, j - 1]);
                dp[i, j] = best;
            }
        }

        return dp[n, m];
    }
}
```

## Complexity

- **Time:** `O(n * m)`.
- **Space:** `O(n * m)` for the DP table.
