# 935. Knight Dialer

**Difficulty:** Medium
**Category:** Dynamic Programming

## Problem

A chess knight starts on any digit of a phone dial pad (digits `0`-`9` arranged in a standard 4x3 grid, with `*`/`#` missing) and makes `n - 1` valid knight moves. Return the number of distinct phone numbers of length `n` that can be dialed this way, modulo `10^9 + 7`.

### Example

```
Input: n = 1
Output: 10
```

## Approach

Precompute which digits a knight can reach from each digit. Track `dp[d]` = number of ways to end on digit `d` after the current number of moves, starting with `dp[d] = 1` for all digits (length-1 numbers). For each additional digit, compute a new `dp` where each digit accumulates contributions from every digit that can knight-move into it.

## C# Solution

```csharp
public class Solution
{
    private static readonly int[][] Moves =
    {
        new[] { 4, 6 }, new[] { 6, 8 }, new[] { 7, 9 }, new[] { 4, 8 },
        new[] { 0, 3, 9 }, Array.Empty<int>(), new[] { 0, 1, 7 }, new[] { 2, 6 },
        new[] { 1, 3 }, new[] { 2, 4 }
    };

    public int KnightDialer(int n)
    {
        const long MOD = 1_000_000_007;
        var dp = new long[10];
        Array.Fill(dp, 1);

        for (int step = 1; step < n; step++)
        {
            var next = new long[10];

            for (int digit = 0; digit < 10; digit++)
            {
                foreach (var dest in Moves[digit])
                {
                    next[dest] = (next[dest] + dp[digit]) % MOD;
                }
            }

            dp = next;
        }

        return (int)(dp.Sum() % MOD);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
