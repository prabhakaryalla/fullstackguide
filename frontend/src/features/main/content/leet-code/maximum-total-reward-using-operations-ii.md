# 3181. Maximum Total Reward Using Operations II

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Bit Manipulation

## Problem
This is the larger-constraints version of "Maximum Total Reward Using Operations I": given an array of distinct reward values, repeatedly pick a value strictly greater than your current accumulated total and add it, using each value at most once. Find the maximum achievable total reward, now with a much larger input size requiring a more efficient bit-level approach.

## Approach
Use the same underlying DP concept as the smaller version, but implement it efficiently using arbitrary-precision bit manipulation (analogous to C++'s `bitset`), since .NET's `System.Numerics.BigInteger` supports fast shift and OR operations on arbitrarily large bit patterns. Maintain `dp` as a `BigInteger` bitmask where bit `x` set means total reward `x` is achievable. For each sorted reward value `num`, take the current bitmask, mask off (clear) all bits at position `num` and above (since only totals strictly less than `num` may be extended), shift the result left by `num`, and OR it into `dp`. The final answer is the index of the highest set bit in `dp`.

## C# Solution
```csharp
public class Solution {
    public int MaxTotalReward(int[] rewardValues) {
        const int kPossibleRewards = 100_000;
        System.Numerics.BigInteger dp = 1; // bit 0 set

        Array.Sort(rewardValues);

        System.Numerics.BigInteger mask = (System.Numerics.BigInteger.One << kPossibleRewards) - 1;

        foreach (int num in rewardValues) {
            System.Numerics.BigInteger lowMask = (System.Numerics.BigInteger.One << num) - 1;
            System.Numerics.BigInteger newBits = dp & lowMask;
            dp |= (newBits << num) & mask;
        }

        for (int ans = kPossibleRewards - 1; ans >= 0; ans--)
            if (((dp >> ans) & 1) == 1)
                return ans;

        return 0;
    }
}
```

## Complexity
- Time: O(n * maxReward / 64) amortized due to big-integer word operations
- Space: O(maxReward / 64)
