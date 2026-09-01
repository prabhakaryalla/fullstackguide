# 1595. Minimum Cost to Connect Two Groups of Points

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Bit Manipulation, Matrix

## Problem

Given two groups of points with a `cost` matrix where `cost[i][j]` is the cost of connecting point `i` from the first group to point `j` from the second group, connect the groups so that every point in both groups belongs to at least one connection. Return the minimum total cost.

### Example

```
Input: cost = [[15,96],[36,2]]
Output: 17
```

## Approach

Precompute, for every point in the second group, the minimum cost of connecting it to any single point in the first group (`minCostForSecond[j]`) — this covers points in group 2 that end up unconnected by the main DP. Use bitmask DP over `(firstGroupIndex, coveredSecondGroupMask)`: at each first-group point, either connect it to some subset of second-group points from this position onward, or skip forward while accounting for uncovered second-group points using their precomputed minimum cost once the first group is exhausted.

## C# Solution

```csharp
public class Solution
{
    public int ConnectTwoGroups(IList<IList<int>> cost)
    {
        int m = cost.Count;
        int n = cost[0].Count;
        int fullMask = (1 << n) - 1;

        int[] minCostForSecond = new int[n];
        for (int j = 0; j < n; j++)
        {
            int best = int.MaxValue;
            for (int i = 0; i < m; i++)
            {
                best = Math.Min(best, cost[i][j]);
            }
            minCostForSecond[j] = best;
        }

        int[,] memo = new int[m, 1 << n];
        for (int i = 0; i < m; i++)
        {
            for (int mask = 0; mask <= fullMask; mask++)
            {
                memo[i, mask] = -1;
            }
        }

        int Dp(int i, int mask)
        {
            if (i == m)
            {
                int remaining = 0;
                for (int j = 0; j < n; j++)
                {
                    if ((mask & (1 << j)) == 0)
                    {
                        remaining += minCostForSecond[j];
                    }
                }
                return remaining;
            }

            if (memo[i, mask] != -1)
            {
                return memo[i, mask];
            }

            int best = int.MaxValue;
            for (int j = 0; j < n; j++)
            {
                int newMask = mask | (1 << j);
                best = Math.Min(best, cost[i][j] + Dp(i + 1, newMask));
            }

            memo[i, mask] = best;
            return best;
        }

        return Dp(0, 0);
    }
}
```

## Complexity

- **Time:** `O(m * 2^n * n)` — DP over `m * 2^n` states, each trying `n` transitions.
- **Space:** `O(m * 2^n)` for the memoization table.
