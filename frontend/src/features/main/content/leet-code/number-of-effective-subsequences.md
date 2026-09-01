# 3757. Number of Effective Subsequences

**Difficulty:** Hard
**Category:** Array, Math, Dynamic Programming, Bit Manipulation, Combinatorics

## Problem

Given an integer array `nums`, its strength is the bitwise OR of all elements. A subsequence is "effective" if removing it strictly decreases the strength of the remaining elements (the OR of an empty array is `0`). Return the number of effective subsequences, modulo `10^9 + 7`.

### Example

Input: `nums = [1,2,3]`
Output: `3`

## Approach

Let `k` be the number of set bits in `totalOR` and compress `nums` values into a `k`-bit mask (safe since every value is a subset of `totalOR`). Using inclusion-exclusion over subsets `T` of these bits, the count of subsequences whose complement still achieves the full OR is `bad = sum_T (-1)^|T| * 2^(zeroCount(T))`, where `zeroCount(T)` (count of elements disjoint from `T`) is obtained via a subset-sum (SOS) transform of the compressed frequency array. The answer is `2^n - bad`.

## C# Solution

```csharp
public class Solution 
{
    private const long MOD = 1_000_000_007;

    public int NumberOfEffectiveSubsequences(int[] nums) 
    {
        int n = nums.Length;
        int totalOr = 0;
        foreach (int v in nums) totalOr |= v;

        var bitPositions = new List<int>();
        for (int b = 0; b < 32; b++) if ((totalOr & (1 << b)) != 0) bitPositions.Add(b);
        int k = bitPositions.Count;
        int size = 1 << k;

        var freq = new long[size];
        foreach (int v in nums)
        {
            int compressed = 0;
            for (int j = 0; j < k; j++)
                if ((v & (1 << bitPositions[j])) != 0) compressed |= (1 << j);
            freq[compressed]++;
        }

        // Sum over subsets (SOS) transform.
        var sumSubset = (long[])freq.Clone();
        for (int b = 0; b < k; b++)
            for (int mask = 0; mask < size; mask++)
                if ((mask & (1 << b)) != 0)
                    sumSubset[mask] += sumSubset[mask ^ (1 << b)];

        var pow2 = new long[n + 1];
        pow2[0] = 1;
        for (int i = 1; i <= n; i++) pow2[i] = (pow2[i - 1] * 2) % MOD;

        long acc = 0;
        for (int u = 0; u < size; u++)
        {
            int popcount = System.Numerics.BitOperations.PopCount((uint)u);
            long term = pow2[sumSubset[u]] * (popcount % 2 == 0 ? 1 : -1);
            acc = (acc + term) % MOD;
        }
        // bad = (-1)^k * acc
        long bad = (k % 2 == 0) ? acc : -acc;
        bad = ((bad % MOD) + MOD) % MOD;

        long ans = ((pow2[n] - bad) % MOD + MOD) % MOD;
        return (int)ans;
    }
}
```

## Complexity

- **Time:** O(n + k * 2^k)
- **Space:** O(2^k)
