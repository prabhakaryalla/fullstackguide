# 3670. Maximum Product of Two Integers With No Common Bits

**Difficulty:** Medium
**Category:** Bit Manipulation, Dynamic Programming, Array

## Problem

Given an integer array `nums`, find two numbers `a` and `b` from the array such that `a & b == 0` (they share no set bits), maximizing the product `a * b`. Return `0` if no such pair exists.

### Example

Input: `nums = [12,5,3]`
Output: `15`
Explanation: `5 & 3 == 0`, giving product `15`, which is the maximum among valid pairs.

## Approach

Use a "sum over subsets" (SOS) style DP. For every possible bitmask, precompute `best[mask]` = the maximum value in `nums` that is a submask of `mask`. Then for each number `x`, any valid partner must be a submask of `~x` (restricted to the used bit range); look up `best[full ^ x]` to get the best compatible partner in O(1).

## C# Solution

```csharp
public class Solution 
{
    public long MaximumProduct(int[] nums) 
    {
        int maxVal = 0;
        foreach (int x in nums) maxVal = Math.Max(maxVal, x);
        int bits = 1;
        while ((1 << bits) <= maxVal) bits++;
        int full = (1 << bits) - 1;

        long[] best = new long[1 << bits];
        for (int i = 0; i < best.Length; i++) best[i] = -1;

        foreach (int x in nums) 
        {
            best[x] = Math.Max(best[x], (long)x);
        }
        for (int b = 0; b < bits; b++) 
        {
            for (int mask = 0; mask <= full; mask++) 
            {
                if ((mask & (1 << b)) != 0) 
                {
                    best[mask] = Math.Max(best[mask], best[mask ^ (1 << b)]);
                }
            }
        }

        long ans = 0;
        foreach (int x in nums) 
        {
            long partner = best[full ^ x];
            if (partner > 0) 
            {
                ans = Math.Max(ans, (long)x * partner);
            }
        }
        return ans;
    }
}
```

## Complexity

- **Time:** O(n + 2^B * B), where B is the bit-length of the maximum value
- **Space:** O(2^B)
