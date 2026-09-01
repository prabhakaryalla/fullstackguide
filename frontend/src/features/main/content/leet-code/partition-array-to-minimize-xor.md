# 3599. Partition Array to Minimize XOR

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Bit Manipulation

## Problem
Given an integer array `nums` and an integer `k`, split `nums` into exactly `k` non-empty contiguous subarrays. For each subarray compute the bitwise XOR of its elements. Return the minimum possible value of the maximum subarray XOR over all valid partitions into `k` contiguous groups.

## Approach
Because XOR is not monotonic with subarray length, a greedy or binary-search-on-answer approach (as used for sum-based partition problems) does not directly apply. Instead use dynamic programming over prefix ranges.

Let `dp[j][i]` be the minimum possible value of "the maximum subarray XOR so far" when the first `i` elements of `nums` are split into exactly `j` contiguous groups. The transition considers every possible cut point `m` for the last group:

$$dp[j][i] = \min_{j-1 \le m < i} \max\big(dp[j-1][m],\ \text{xor}(nums[m..i-1])\big)$$

where `xor(nums[m..i-1])` is computed in O(1) using a prefix-XOR array (`prefixXor[i] ^ prefixXor[m]`). The base case is `dp[0][0] = 0` and `dp[0][i] = infinity` for `i > 0`. The answer is `dp[k][n]`.

## C# Solution

```csharp
public class Solution 
{
    public int MinimumXOR(int[] nums, int k) 
    {
        int n = nums.Length;
        int[] prefixXor = new int[n + 1];
        for (int i = 0; i < n; i++)
            prefixXor[i + 1] = prefixXor[i] ^ nums[i];

        const int INF = int.MaxValue;
        int[][] dp = new int[k + 1][];
        for (int j = 0; j <= k; j++)
        {
            dp[j] = new int[n + 1];
            Array.Fill(dp[j], INF);
        }
        dp[0][0] = 0;

        for (int j = 1; j <= k; j++)
        {
            for (int i = j; i <= n; i++)
            {
                int best = INF;
                for (int m = j - 1; m < i; m++)
                {
                    if (dp[j - 1][m] == INF)
                        continue;

                    int segmentXor = prefixXor[i] ^ prefixXor[m];
                    int candidate = Math.Max(dp[j - 1][m], segmentXor);
                    if (candidate < best)
                        best = candidate;
                }
                dp[j][i] = best;
            }
        }

        return dp[k][n];
    }
}
```

## Complexity

- **Time:** O(k * n^2)
- **Space:** O(k * n)
