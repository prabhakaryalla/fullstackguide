# 1621. Number of Sets of K Non-Overlapping Line Segments

**Difficulty:** Medium
**Category:** Dynamic Programming

## Problem

Given `n` points numbered `1` to `n` on a line, a line segment connects two points and its length is the difference between the endpoints. Return the number of ways to draw exactly `k` non-overlapping line segments (segments may share an endpoint) modulo `10^9 + 7`.

### Example

```
Input: n = 4, k = 2
Output: 5
```

## Approach

Use a two-state DP over points processed left to right: `dp[j][0]` counts arrangements with `j` segments placed where the current point is not covered by an in-progress segment, and `dp[j][1]` counts arrangements where it is covered (the current segment may still extend). Transitioning to the next point: staying uncovered inherits both prior states; becoming covered either starts a fresh segment from an uncovered state (consuming one of the `k` segments) or continues an already-open segment.

## C# Solution

```csharp
public class Solution
{
    private const int Mod = 1_000_000_007;

    public int NumberOfSets(int n, int k)
    {
        long[,] dp = new long[k + 1, 2];
        dp[0, 0] = 1;

        for (int i = 1; i < n; i++)
        {
            long[,] next = new long[k + 1, 2];
            next[0, 0] = 1;

            for (int j = 1; j <= k; j++)
            {
                next[j, 0] = (dp[j, 0] + dp[j, 1]) % Mod;
                next[j, 1] = (dp[j, 1] + dp[j - 1, 0] + dp[j - 1, 1]) % Mod;
            }

            dp = next;
        }

        return (int)((dp[k, 0] + dp[k, 1]) % Mod);
    }
}
```

## Complexity

- **Time:** `O(n * k)`.
- **Space:** `O(k)`.
