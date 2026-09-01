# 1799. Maximize Score After N Operations

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Bit Manipulation, Math, Combinatorics

## Problem

Given an integer array `nums` of `2n` elements, perform `n` operations. On the `ith` operation (1-indexed), choose two remaining elements `x` and `y`, gain `i * gcd(x, y)` points, then remove both. Return the maximum score obtainable.

### Example

```
Input: nums = [1,2]
Output: 1
```

## Approach

Use bitmask dynamic programming: `dp[mask]` is the best score achievable using exactly the elements marked in `mask` (only defined for masks with an even population count, representing a whole number of completed pairs). For each mask, try every pair of set bits as the most recently removed pair, using the operation number `popcount(mask) / 2` as the multiplier, and combine with the best score for the mask without that pair.

## C# Solution

```csharp
public class Solution
{
    public int MaxScore(int[] nums)
    {
        int n = nums.Length;
        int[] dp = new int[1 << n];

        for (int mask = 1; mask < (1 << n); mask++)
        {
            int bits = CountBits(mask);
            if (bits % 2 != 0) continue;

            int op = bits / 2;
            for (int j = 0; j < n; j++)
            {
                if ((mask & (1 << j)) == 0) continue;
                for (int i = 0; i < j; i++)
                {
                    if ((mask & (1 << i)) == 0) continue;

                    int prevMask = mask ^ (1 << i) ^ (1 << j);
                    int score = op * Gcd(nums[i], nums[j]) + dp[prevMask];
                    if (score > dp[mask]) dp[mask] = score;
                }
            }
        }

        return dp[(1 << n) - 1];
    }

    private int CountBits(int mask)
    {
        int count = 0;
        while (mask > 0) { count += mask & 1; mask >>= 1; }
        return count;
    }

    private int Gcd(int a, int b) => b == 0 ? a : Gcd(b, a % b);
}
```

## Complexity

- **Time:** `O(2^(2n) * n^2)` where `2n` is the array length.
- **Space:** `O(2^(2n))` for the DP table.
