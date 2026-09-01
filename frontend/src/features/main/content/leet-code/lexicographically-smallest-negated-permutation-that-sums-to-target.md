# 3752. Lexicographically Smallest Negated Permutation That Sums to Target

**Difficulty:** Medium
**Category:** Greedy, Array, Math

## Problem
You are given two integers `n` and `target`. Consider a permutation of the numbers `1` to `n`, where each element may optionally be negated (multiplied by `-1`). Among all ways of choosing signs such that the resulting array of `n` values (a permutation of `{-1, 1, ..., -n, n}` selections, one per magnitude from `1..n`) sums exactly to `target`, return the lexicographically smallest such array. If no valid assignment of signs exists, return an empty array.

## Approach
The maximum possible sum is `n*(n+1)/2` (all positive) and the minimum is `-n*(n+1)/2` (all negative); any achievable `target` must have the same parity as `maxSum`, so first check feasibility: `diffTotal = maxSum - target` must be non-negative and even, otherwise return empty. The amount that must be "removed" via negation is `diff = diffTotal / 2` — the subset of magnitudes we negate must sum exactly to `diff`. To build the lexicographically smallest array (compared position by position, positions holding magnitudes `1..n` in order), greedily scan magnitudes from `1` to `n` and prefer negating the current magnitude `i` (since `-i < i` makes an earlier position smaller). Negating `i` is only safe if the remaining budget `diff - i` can still be completed using the still-available magnitudes `i+1..n`; because subset sums of the consecutive range `i+1..n` cover every integer from `0` up to their total, this is simply checking `0 <= diff - i <= sum(i+1..n)`. If negating `i` keeps the remainder feasible, commit to it and subtract `i` from `diff`; otherwise leave `i` positive and move on. If `diff` reaches exactly `0` after processing all magnitudes, the construction succeeds; it always will whenever the initial parity/range check passes.

## C# Solution

```csharp
public class Solution 
{
    public int[] SmallestNegatedPermutation(int n, int target)
    {
        long maxSum = (long)n * (n + 1) / 2;
        long diffTotal = maxSum - target;

        if (diffTotal < 0 || diffTotal % 2 != 0)
        {
            return new int[0];
        }

        long diff = diffTotal / 2;
        bool[] negate = new bool[n + 1];

        for (int i = 1; i <= n; i++)
        {
            long remainingAfter = maxSum - (long)i * (i + 1) / 2; // sum of (i+1..n)
            if (diff - i >= 0 && diff - i <= remainingAfter)
            {
                negate[i] = true;
                diff -= i;
            }
        }

        if (diff != 0)
        {
            return new int[0];
        }

        int[] result = new int[n];
        for (int i = 1; i <= n; i++)
        {
            result[i - 1] = negate[i] ? -i : i;
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
