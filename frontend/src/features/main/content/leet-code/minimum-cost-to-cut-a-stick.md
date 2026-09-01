# 1547. Minimum Cost to Cut a Stick

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

Given a wooden stick of length `n` and an array of integer `cuts` positions where cuts must be made, the cost of a single cut equals the length of the stick piece being cut at that moment. Cuts can be made in any order. Return the minimum total cost to perform all the cuts.

### Example

```
Input: n = 7, cuts = [1,3,4,5]
Output: 16
```

## Approach

Add `0` and `n` as sentinel boundary points to `cuts`, then sort all the cut positions. This creates an interval-DP problem: `dp[i][j]` is the minimum cost to make all the cuts strictly between sorted-cut-position `i` and `j` (exclusive), for the current stick segment spanning `[sortedCuts[i], sortedCuts[j]]`. For each interval, try every possible cut point `k` strictly between `i` and `j` as the *first* cut in that segment, paying `sortedCuts[j] - sortedCuts[i]` for that cut plus the optimal cost of the two resulting sub-segments.

## C# Solution

```csharp
public class Solution
{
    public int MinCost(int n, int[] cuts)
    {
        var points = new List<int>(cuts) { 0, n };
        points.Sort();
        int m = points.Count;
        int[,] dp = new int[m, m];

        for (int length = 2; length < m; length++)
        {
            for (int i = 0; i + length < m; i++)
            {
                int j = i + length;
                int best = int.MaxValue;

                for (int k = i + 1; k < j; k++)
                {
                    int cost = dp[i, k] + dp[k, j] + (points[j] - points[i]);
                    best = Math.Min(best, cost);
                }

                dp[i, j] = best;
            }
        }

        return dp[0, m - 1];
    }
}
```

## Complexity

- **Time:** `O(m^3)` where `m` is the number of cut points plus 2 — classic interval DP.
- **Space:** `O(m^2)` for the DP table.
