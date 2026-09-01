# 1269. Number of Ways to Stay in the Same Place After Some Steps

**Difficulty:** Hard
**Category:** Dynamic Programming

## Problem

A pointer starts at index `0` of a conceptual array of length `arrLen`. In `steps` moves, each move can go left, go right, or stay, but the pointer may never move outside `[0, arrLen - 1]`. Return the number of distinct ways to make exactly `steps` moves and end back at index `0`, modulo `10^9 + 7`.

### Example

```
Input: steps = 3, arrLen = 2
Output: 4
```

## Approach

Since only `steps` moves are available, the pointer can never usefully travel further than `steps / 2` positions from the start (it would have no way back), so cap the DP range at `min(arrLen - 1, steps)` instead of the full `arrLen`, keeping the state space small. Use `dp[pos]` = number of ways to be at `pos` after the current number of moves, updating each position as the sum of the ways to have been at `pos - 1`, `pos`, or `pos + 1` one move earlier (whichever are in range).

## C# Solution

```csharp
public class Solution
{
    public int NumWays(int steps, int arrLen)
    {
        const int Mod = 1_000_000_007;
        int maxPos = Math.Min(arrLen - 1, steps);
        var dp = new long[maxPos + 1];
        dp[0] = 1;

        for (int step = 1; step <= steps; step++)
        {
            var next = new long[maxPos + 1];

            for (int pos = 0; pos <= maxPos; pos++)
            {
                long ways = dp[pos];
                if (pos > 0) ways = (ways + dp[pos - 1]) % Mod;
                if (pos < maxPos) ways = (ways + dp[pos + 1]) % Mod;
                next[pos] = ways;
            }

            dp = next;
        }

        return (int)dp[0];
    }
}
```

## Complexity

- **Time:** `O(steps * min(steps, arrLen))`.
- **Space:** `O(min(steps, arrLen))`.
