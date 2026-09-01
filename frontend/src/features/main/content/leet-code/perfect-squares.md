# 279. Perfect Squares

**Difficulty:** Medium
**Category:** Math, Dynamic Programming, Breadth-First Search

## Problem

Given an integer `n`, return the least number of perfect square numbers (e.g. `1, 4, 9, 16, ...`) that sum to `n`.

### Example

```
Input: n = 12
Output: 3
```

### Constraints

- `1 <= n <= 10^4`

## Approach

Use dynamic programming where `dp[i]` is the minimum number of perfect squares summing to `i`. For each `i`, try subtracting every perfect square `j*j <= i` and take `1 + dp[i - j*j]`, keeping the minimum over all choices of `j`. Base case: `dp[0] = 0`.

## C# Solution

```csharp
public class Solution
{
    public int NumSquares(int n)
    {
        var dp = new int[n + 1];
        Array.Fill(dp, int.MaxValue);
        dp[0] = 0;

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j * j <= i; j++)
            {
                dp[i] = Math.Min(dp[i], dp[i - j * j] + 1);
            }
        }

        return dp[n];
    }
}
```

## Complexity

- **Time:** `O(n * sqrt(n))` — for each of `n` values, trying up to `sqrt(n)` square roots.
- **Space:** `O(n)` — for the DP array.
