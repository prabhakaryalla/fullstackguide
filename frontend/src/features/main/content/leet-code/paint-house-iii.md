# 1473. Paint House III

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

There are `m` houses in a row, each either unpainted (`houses[i] == 0`) or already painted with one of `n` colors. Painting house `i` with color `c` (1-indexed) costs `cost[i][c-1]`. Return the minimum total cost to paint all unpainted houses so the row forms exactly `target` neighborhoods (maximal runs of consecutive same-colored houses), or `-1` if impossible.

### Example

```
Input: houses = [0,0,0,0,0], cost = [[1,10],[10,1],[10,1],[1,10],[5,1]], m = 5, n = 2, target = 3
Output: 9
```

## Approach

Define `dp[color][neighborhoods]` as the minimum cost to paint houses processed so far, ending with the most recent house colored `color` and having formed `neighborhoods` groups. Process houses left to right: for each house, if it's already painted, only its fixed color is allowed (at zero cost); otherwise, try every color at its listed cost. Transition from every possible previous color/neighborhood-count state: staying the same color keeps the neighborhood count unchanged, while switching colors increments it. The answer is the minimum cost across all colors with exactly `target` neighborhoods after the last house.

## C# Solution

```csharp
public class Solution
{
    public int MinCost(int[] houses, int[][] cost, int m, int n, int target)
    {
        const int INF = int.MaxValue / 2;
        var prev = new int[n + 1, target + 1];
        for (int c = 0; c <= n; c++)
            for (int t = 0; t <= target; t++)
                prev[c, t] = INF;
        prev[0, 0] = 0;

        for (int i = 0; i < m; i++)
        {
            var cur = new int[n + 1, target + 1];
            for (int c = 0; c <= n; c++)
                for (int t = 0; t <= target; t++)
                    cur[c, t] = INF;

            int colorFixed = houses[i];

            for (int c = 1; c <= n; c++)
            {
                if (colorFixed != 0 && colorFixed != c) continue;
                int paintCost = colorFixed == 0 ? cost[i][c - 1] : 0;

                for (int pc = 0; pc <= n; pc++)
                {
                    for (int t = 0; t <= target; t++)
                    {
                        if (prev[pc, t] == INF) continue;

                        int nt;
                        if (pc == 0)
                        {
                            if (t != 0) continue;
                            nt = 1;
                        }
                        else if (pc == c)
                        {
                            nt = t;
                        }
                        else
                        {
                            nt = t + 1;
                        }

                        if (nt > target) continue;

                        int total = prev[pc, t] + paintCost;
                        if (total < cur[c, nt]) cur[c, nt] = total;
                    }
                }
            }

            prev = cur;
        }

        int best = INF;
        for (int c = 1; c <= n; c++) best = Math.Min(best, prev[c, target]);

        return best >= INF ? -1 : best;
    }
}
```

## Complexity

- **Time:** `O(m * n^2 * target)`.
- **Space:** `O(n * target)` for the rolling DP arrays.
