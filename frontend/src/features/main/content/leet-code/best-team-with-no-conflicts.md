# 1626. Best Team With No Conflicts

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Sorting

## Problem

Given parallel arrays `scores` and `ages` for `n` players, choose a team (any subset) with maximum total score such that no player with a lower age has a strictly higher score than a player with a higher age (this would cause a conflict). Return the maximum possible total score.

### Example

```
Input: scores = [1,3,5,10,15], ages = [1,2,3,4,5]
Output: 34
```

## Approach

Sort players by age (breaking ties by score) so any valid team, read left to right, has non-decreasing age. This reduces the problem to a "longest increasing subsequence"-style DP: `dp[i]` is the best total score of a valid team ending with player `i`, built by extending any earlier player `j` whose score does not exceed player `i`'s score.

## C# Solution

```csharp
public class Solution
{
    public int BestTeamScore(int[] scores, int[] ages)
    {
        int n = scores.Length;
        int[][] players = new int[n][];

        for (int i = 0; i < n; i++)
        {
            players[i] = new int[] { ages[i], scores[i] };
        }

        Array.Sort(players, (x, y) => x[0] != y[0] ? x[0] - y[0] : x[1] - y[1]);

        int[] dp = new int[n];
        int best = 0;

        for (int i = 0; i < n; i++)
        {
            dp[i] = players[i][1];

            for (int j = 0; j < i; j++)
            {
                if (players[j][1] <= players[i][1])
                {
                    dp[i] = Math.Max(dp[i], dp[j] + players[i][1]);
                }
            }

            best = Math.Max(best, dp[i]);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n)`.
