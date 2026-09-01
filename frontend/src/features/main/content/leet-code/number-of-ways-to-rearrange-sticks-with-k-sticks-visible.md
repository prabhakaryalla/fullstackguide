# 1866. Number of Ways to Rearrange Sticks With K Sticks Visible

**Difficulty:** Hard
**Category:** Dynamic Programming, Math, Combinatorics

## Problem

There are `n` sticks of distinct lengths `1` through `n`. Return the number of ways to arrange all `n` sticks in a line such that, viewed from the left, exactly `k` sticks are "visible" (a stick is visible if it is taller than every stick before it). Answer modulo `1e9 + 7`.

### Example

```
Input: n = 3, k = 2
Output: 3
```

## Approach

This count is exactly the unsigned Stirling number of the first kind, `c(n, k)`. It satisfies the recurrence `c(n, k) = c(n-1, k-1) + (n-1) * c(n-1, k)`: the tallest stick either is placed such that it becomes the newest visible stick when appended in a specific way (`c(n-1, k-1)`), or it's inserted among the `n-1` non-last positions of an arrangement of the other sticks without adding a new visible stick (`(n-1)` choices times `c(n-1, k)`). Build this as a bottom-up 2D DP table with base case `c(0, 0) = 1`.

## C# Solution

```csharp
public class Solution
{
    public int RearrangeSticks(int n, int k)
    {
        const int Mod = 1_000_000_007;
        var dp = new long[n + 1, k + 1];
        dp[0, 0] = 1;

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= k; j++)
            {
                dp[i, j] = (dp[i - 1, j - 1] + (long)(i - 1) * dp[i - 1, j]) % Mod;
            }
        }

        return (int)dp[n, k];
    }
}
```

## Complexity

- **Time:** `O(n * k)`.
- **Space:** `O(n * k)` for the DP table.
