# 1510. Stone Game IV

**Difficulty:** Hard
**Category:** Math, Dynamic Programming, Game Theory

## Problem

Alice and Bob take turns, with Alice starting first. There are `n` stones in a pile. On each player's turn, they remove a non-zero perfect square number of stones. The player who cannot make a move (because there are no stones left, since a move requires removing a positive number) loses. Both players play optimally. Return `true` if Alice wins, otherwise `false`.

### Example

```
Input: n = 4
Output: true
Explanation: Alice removes 4 stones (2^2) and wins immediately.
```

## Approach

Standard game-theory DP: `dp[i]` is `true` if the player about to move with `i` stones remaining can force a win. `dp[0] = false` (no moves means the player to move loses). For each `i`, try every perfect square `k*k <= i`; `dp[i]` is `true` if any resulting `dp[i - k*k]` is `false` (the opponent then loses).

## C# Solution

```csharp
public class Solution
{
    public bool WinnerSquareGame(int n)
    {
        bool[] dp = new bool[n + 1];

        for (int i = 1; i <= n; i++)
        {
            for (int k = 1; k * k <= i; k++)
            {
                if (!dp[i - k * k])
                {
                    dp[i] = true;
                    break;
                }
            }
        }

        return dp[n];
    }
}
```

## Complexity

- **Time:** `O(n * sqrt(n))` — for each of the `n` states we try up to `sqrt(n)` perfect squares.
- **Space:** `O(n)` for the DP array.
