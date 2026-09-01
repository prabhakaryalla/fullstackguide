# 634. Find the Derangement of An Array

**Difficulty:** Medium
**Category:** Math, Dynamic Programming
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

A derangement is a permutation of `[1, n]` where no element appears in its original position. Given an integer `n`, return the number of derangements of `n` elements, modulo `10^9 + 7`.

### Example

```
Input: n = 3
Output: 2
```

### Constraints

- `1 <= n <= 10^6`

## Approach

Use the classic derangement recurrence: `D(n) = (n - 1) * (D(n-1) + D(n-2))`. This comes from considering where element `n` goes — swapping it with some element `k` (giving `n-1` choices) either fully deranges the remaining `n-2` elements, or leaves a valid derangement of `n-1` elements once that swap is accounted for. Compute iteratively bottom-up with the base cases `D(1) = 0` and `D(2) = 1`.

## C# Solution

```csharp
public class Solution
{
    private const int Mod = 1_000_000_007;

    public int FindDerangement(int n)
    {
        if (n == 1) return 0;

        var dp = new long[n + 1];
        dp[1] = 0;
        dp[2] = 1;

        for (int i = 3; i <= n; i++)
            dp[i] = (i - 1) * (dp[i - 1] + dp[i - 2]) % Mod;

        return (int)dp[n];
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the DP array.
