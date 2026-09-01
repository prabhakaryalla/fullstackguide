# 1994. The Number of Good Subsets

**Difficulty:** Hard
**Category:** Array, Math, Dynamic Programming, Bit Manipulation, Bitmask

## Problem

Given an integer array `nums` (values `1` to `30`), a "good subset" is a non-empty subset whose product is a product of distinct prime numbers (i.e., square-free: no prime factor appears more than once across the chosen elements, and elements equal to `1` may be freely included since they don't affect the product's prime factorization but each contributes a distinct subset choice). Return the number of good subsets, modulo `10^9 + 7`.

### Example

```
Input: nums = [1,2,3,4]
Output: 6
Explanation: Good subsets are [1,2],[1,2,3],[1,3],[2],[2,3],[3]; note 4 = 2*2 can never be used since it repeats the prime 2.
```

### Constraints

- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 30`

## Approach

There are only 10 primes up to 30 (`2,3,5,7,11,13,17,19,23,29`). Any number containing a squared prime factor (e.g., `4, 8, 9, 12, 16, 18, 20, 24, 25, 27, 28`) can never be part of any good subset and is discarded. For the remaining usable numbers `2..30`, represent each by a bitmask of which of the 10 primes divide it. Use bitmask DP over "which primes are used so far": `dp[mask]` = number of ways (as a multiset of distinct usable values, not counting repeated `nums[i]` duplicates yet) to achieve exactly that prime-usage mask. For each distinct usable value (only counted once per distinct value, since using it twice would repeat a prime), update `dp` by iterating masks in reverse and adding `dp[mask] * count[value]` to `dp[mask | valueMask]` (this is the classic subset-product counting via bitmask knapsack). Multiply the final answer by `2^(count of 1s)` (each `1` can be freely included or excluded) and sum over all non-zero final masks.

## C# Solution

```csharp
public class Solution
{
    private const int Mod = 1_000_000_007;
    private static readonly int[] Primes = { 2, 3, 5, 7, 11, 13, 17, 19, 23, 29 };

    public int NumberOfGoodSubsets(int[] nums)
    {
        int[] count = new int[31];
        foreach (int num in nums) count[num]++;

        int fullMask = 1 << Primes.Length;
        long[] dp = new long[fullMask];
        dp[0] = 1;

        for (int value = 2; value <= 30; value++)
        {
            if (count[value] == 0) continue;

            int mask = GetPrimeMask(value);
            if (mask == -1) continue; // has a squared prime factor, unusable

            for (int m = fullMask - 1; m >= 0; m--)
            {
                if (dp[m] == 0) continue;
                if ((m & mask) != 0) continue;

                int newMask = m | mask;
                dp[newMask] = (dp[newMask] + dp[m] * count[value]) % Mod;
            }
        }

        long ones = count[1];
        long onesMultiplier = ModPow(2, ones, Mod);

        long total = 0;
        for (int m = 1; m < fullMask; m++)
        {
            total = (total + dp[m]) % Mod;
        }

        total = total * onesMultiplier % Mod;
        return (int)total;
    }

    private int GetPrimeMask(int value)
    {
        int mask = 0;
        for (int i = 0; i < Primes.Length; i++)
        {
            int p = Primes[i];
            if (value % p == 0)
            {
                if ((value / p) % p == 0) return -1;
                mask |= 1 << i;
            }
        }
        return mask;
    }

    private long ModPow(long baseValue, long exp, long mod)
    {
        long result = 1;
        baseValue %= mod;
        while (exp > 0)
        {
            if ((exp & 1) == 1) result = result * baseValue % mod;
            baseValue = baseValue * baseValue % mod;
            exp >>= 1;
        }
        return result;
    }
}
```

## Complexity

- **Time:** `O(30 * 2^10)` — a bounded bitmask knapsack over at most 30 distinct values and 1024 masks.
- **Space:** `O(2^10)` for the dp array.
