# 1879. Minimum XOR Sum of Two Arrays

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Bitmask

## Problem

Given two integer arrays `nums1` and `nums2` of the same length, the XOR sum is `sum(nums1[i] XOR nums2[i])` for some permutation of `nums2`. Return the minimum possible XOR sum over all permutations.

### Example

```
Input: nums1 = [1,2], nums2 = [2,3]
Output: 2
```

## Approach

Use bitmask DP where `mask` represents which elements of `nums2` have already been assigned to some prefix of `nums1`. The number of set bits in `mask` tells us which index of `nums1` is being assigned next. For each state, try assigning every not-yet-used `nums2[j]` to the current `nums1[i]`, transitioning to `mask | (1 << j)` with an added cost of `nums1[i] XOR nums2[j]`. The answer is the minimum cost to reach the full mask (all of `nums2` used).

## C# Solution

```csharp
public class Solution
{
    public int MinimumXORSum(int[] nums1, int[] nums2)
    {
        int n = nums1.Length;
        int full = 1 << n;
        var dp = new int[full];
        Array.Fill(dp, int.MaxValue);
        dp[0] = 0;

        for (int mask = 0; mask < full; mask++)
        {
            if (dp[mask] == int.MaxValue) continue;

            int i = System.Numerics.BitOperations.PopCount((uint)mask);
            if (i >= n) continue;

            for (int j = 0; j < n; j++)
            {
                if ((mask & (1 << j)) != 0) continue;

                int newMask = mask | (1 << j);
                int cost = dp[mask] + (nums1[i] ^ nums2[j]);
                if (cost < dp[newMask]) dp[newMask] = cost;
            }
        }

        return dp[full - 1];
    }
}
```

## Complexity

- **Time:** `O(n * 2^n)`.
- **Space:** `O(2^n)` for the DP table.
