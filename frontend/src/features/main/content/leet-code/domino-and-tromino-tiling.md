# 790. Domino and Tromino Tiling

**Difficulty:** Medium
**Category:** Dynamic Programming

## Problem

You have `2 x 1` dominoes and `L`-shaped trominoes (covering 3 cells). Given `n`, return the number of ways to tile a `2 x n` board using these shapes, modulo `10^9 + 7`.

### Example

```
Input: n = 3
Output: 5
```

## Approach

Let `f(n)` be the number of ways to fully tile a `2 x n` board. A well-known recurrence for this tiling problem is `f(n) = 2 * f(n-1) + f(n-3)`, with base cases `f(0) = 1`, `f(1) = 1`, `f(2) = 2`. This recurrence accounts for all the ways a tromino or domino can extend a fully-tiled smaller board (including the partially-filled configurations that arise from L-shaped pieces, which resolve back into the same recurrence when derived from the full combinatorial analysis). Compute iteratively up to `n`, taking the modulo at each step.

## C# Solution

```csharp
public class Solution
{
    public int NumTilings(int n)
    {
        const int MOD = 1_000_000_007;
        if (n == 1) return 1;
        if (n == 2) return 2;

        var dp = new long[n + 1];
        dp[0] = 1;
        dp[1] = 1;
        dp[2] = 2;

        for (int i = 3; i <= n; i++)
        {
            dp[i] = (2 * dp[i - 1] % MOD + dp[i - 3]) % MOD;
        }

        return (int)dp[n];
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the DP array.
