# 343. Integer Break

**Difficulty:** Medium
**Category:** Math, Dynamic Programming

## Problem

Given an integer `n`, break it into the sum of at least two positive integers and maximize the product of those integers. Return the maximum product.

### Example

```
Input: n = 10
Output: 36
Explanation: 10 = 3 + 3 + 4, 3 * 3 * 4 = 36
```

### Constraints

- `2 <= n <= 58`

## Approach

Use bottom-up dynamic programming: `dp[i]` is the maximum product obtainable by breaking `i`. For every split point `j` from `1` to `i - 1`, compare leaving the remainder whole (`j * (i - j)`) against breaking it further (`j * dp[i - j]`), keeping the best across all splits.

## C# Solution

```csharp
public class Solution
{
    public int IntegerBreak(int n)
    {
        var dp = new int[n + 1];
        dp[1] = 1;

        for (int i = 2; i <= n; i++)
        {
            for (int j = 1; j < i; j++)
            {
                dp[i] = Math.Max(dp[i], Math.Max(j * (i - j), j * dp[i - j]));
            }
        }

        return dp[n];
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n)` for the DP array.
