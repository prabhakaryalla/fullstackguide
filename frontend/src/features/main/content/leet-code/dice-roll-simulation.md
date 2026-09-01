# 1223. Dice Roll Simulation

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

Given an integer `n` (number of rolls) and an array `rollMax` where `rollMax[i]` is the maximum allowed number of consecutive rolls showing face `i+1`, return the number of distinct sequences of `n` rolls that respect every face's consecutive-roll limit, modulo `10^9 + 7`.

### Example

```
Input: n = 2, rollMax = [1,1,2,2,2,3]
Output: 34
```

## Approach

Maintain a DP table `dp[face][streak]` representing the number of ways to reach the current roll count ending with `streak` consecutive occurrences of `face`. For each new roll, a face can start a fresh streak of length `1` by summing all ways from every other face at the previous step, or extend its own streak by one (bounded by `rollMax[face]`) by reusing the previous step's shorter-streak count. Sum all valid combinations after `n` rolls.

## C# Solution

```csharp
public class Solution
{
    public int DieSimulator(int n, int[] rollMax)
    {
        const int Mod = 1_000_000_007;

        var dp = new long[6][];
        for (int face = 0; face < 6; face++)
        {
            dp[face] = new long[rollMax[face] + 1];
            dp[face][1] = 1;
        }

        for (int roll = 2; roll <= n; roll++)
        {
            var next = new long[6][];
            for (int face = 0; face < 6; face++) next[face] = new long[rollMax[face] + 1];

            long total = 0;
            for (int face = 0; face < 6; face++)
                for (int streak = 1; streak <= rollMax[face]; streak++)
                    total = (total + dp[face][streak]) % Mod;

            for (int face = 0; face < 6; face++)
            {
                long ownTotal = 0;
                for (int streak = 1; streak <= rollMax[face]; streak++)
                    ownTotal = (ownTotal + dp[face][streak]) % Mod;

                next[face][1] = ((total - ownTotal) % Mod + Mod) % Mod;

                for (int streak = 2; streak <= rollMax[face]; streak++)
                    next[face][streak] = dp[face][streak - 1];
            }

            dp = next;
        }

        long answer = 0;
        for (int face = 0; face < 6; face++)
            for (int streak = 1; streak <= rollMax[face]; streak++)
                answer = (answer + dp[face][streak]) % Mod;

        return (int)answer;
    }
}
```

## Complexity

- **Time:** `O(n * 6 * maxRollMax)`.
- **Space:** `O(6 * maxRollMax)`.
