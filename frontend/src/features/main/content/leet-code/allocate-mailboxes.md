# 1478. Allocate Mailboxes

**Difficulty:** Hard
**Category:** Array, Math, Dynamic Programming, Sorting

## Problem

Given the positions of `houses` on a number line and an integer `k`, place `k` mailboxes to minimize the sum of distances from each house to its nearest mailbox. Return that minimum total distance.

### Example

```
Input: houses = [1,4,8,10,20], k = 3
Output: 5
```

## Approach

Sort the houses. Any optimal solution assigns each mailbox to a contiguous run of houses (in sorted order), and the best location for a mailbox serving a fixed group is the group's median, which minimizes the sum of absolute distances. Precompute `cost[i][j]`, the cost of grouping houses `i..j` under one mailbox at their median. Then run a partition DP: `dp[i][j]` is the minimum cost to place `j` mailboxes covering the first `i` houses, trying every possible split point for the last group.

## C# Solution

```csharp
public class Solution
{
    public int MinDistance(int[] houses, int k)
    {
        Array.Sort(houses);
        int n = houses.Length;

        var cost = new int[n, n];
        for (int i = 0; i < n; i++)
        {
            for (int j = i; j < n; j++)
            {
                int mid = (i + j) / 2;
                int c = 0;
                for (int x = i; x <= j; x++) c += Math.Abs(houses[x] - houses[mid]);
                cost[i, j] = c;
            }
        }

        const int INF = int.MaxValue / 2;
        var dp = new int[n + 1, k + 1];
        for (int i = 0; i <= n; i++)
            for (int j = 0; j <= k; j++)
                dp[i, j] = INF;
        dp[0, 0] = 0;

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= k; j++)
            {
                for (int p = 0; p < i; p++)
                {
                    if (dp[p, j - 1] == INF) continue;
                    dp[i, j] = Math.Min(dp[i, j], dp[p, j - 1] + cost[p, i - 1]);
                }
            }
        }

        return dp[n, k];
    }
}
```

## Complexity

- **Time:** `O(n^2 * k)`.
- **Space:** `O(n^2)` for the cost table.
