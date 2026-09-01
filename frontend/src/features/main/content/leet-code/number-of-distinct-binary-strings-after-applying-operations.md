# 2450. Number of Distinct Binary Strings After Applying Operations

**Difficulty:** Medium
**Category:** Math
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a binary string `s` of length `n` and an integer `k`. You may repeatedly apply the following operation any number of times (including zero): choose a substring of length `k` and flip every bit in it (`0` becomes `1`, `1` becomes `0`). Return the number of distinct binary strings that can be obtained after any sequence of operations, modulo `10^9 + 7`.

### Example

Input: `s = "1001"`, `k = 3`
Output: `4`
Explanation: The two possible flip windows are positions `[0,2]` and `[1,3]`, each independently applied or not, giving `2^(4-3+1) = 4` distinct strings.

## Approach

There are exactly `n - k + 1` possible flip windows (one for each starting position). Applying the same window twice cancels out, and windows commute, so the set of reachable strings corresponds exactly to the `2^(n-k+1)` possible subsets of windows to apply — each subset produces a distinct result because the transformation (each window flip toggling a contiguous range) is invertible via a prefix-XOR argument. So the answer only depends on `n` and `k`, not on the actual contents of `s`, and equals `2^(n-k+1) mod (10^9+7)`.

## C# Solution

```csharp
public class Solution 
{
    public int NumberOfStrings(string s, int k) 
    {
        const int Mod = 1_000_000_007;
        int exponent = s.Length - k + 1;

        long result = 1;
        long baseVal = 2;
        while (exponent > 0)
        {
            if ((exponent & 1) == 1) result = result * baseVal % Mod;
            baseVal = baseVal * baseVal % Mod;
            exponent >>= 1;
        }

        return (int)result;
    }
}
```

## Complexity

- **Time:** O(log n)
- **Space:** O(1)
