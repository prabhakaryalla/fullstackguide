# 2912. Number of Ways to Reach Destination in the Grid

**Difficulty:** Hard
**Category:** Dynamic Programming, Math
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a grid of size `m x n` and an integer `k`. Starting from position (0, 0), you can move right or down. Additionally, you can use a special move up to `k` times to jump to any cell. Return the number of ways to reach (m-1, n-1) modulo 10^9 + 7.

### Example

```
Input: m = 2, n = 3, k = 1
Output: 8
```

## Approach

Use dynamic programming with three dimensions: `dp[i][j][jumps]` representing ways to reach (i, j) using exactly `jumps` special moves. For each cell, consider normal moves (right/down) and special jumps. Sum all possibilities for 0 to k jumps at the destination.

## C# Solution

```csharp
public class Solution 
{
    public int NumberOfPaths(int m, int n, int k) 
    {
        const int MOD = 1000000007;
        long[,,] dp = new long[m, n, k + 1];
        dp[0, 0, 0] = 1;
        
        for (int jumps = 0; jumps <= k; jumps++) 
        {
            for (int i = 0; i < m; i++) 
            {
                for (int j = 0; j < n; j++) 
                {
                    if (i > 0) 
                    {
                        dp[i, j, jumps] = (dp[i, j, jumps] + dp[i - 1, j, jumps]) % MOD;
                    }
                    if (j > 0) 
                    {
                        dp[i, j, jumps] = (dp[i, j, jumps] + dp[i, j - 1, jumps]) % MOD;
                    }
                    
                    if (jumps > 0) 
                    {
                        for (int pi = 0; pi < m; pi++) 
                        {
                            for (int pj = 0; pj < n; pj++) 
                            {
                                if (pi != i || pj != j) 
                                {
                                    dp[i, j, jumps] = (dp[i, j, jumps] + dp[pi, pj, jumps - 1]) % MOD;
                                }
                            }
                        }
                    }
                }
            }
        }
        
        long result = 0;
        for (int jumps = 0; jumps <= k; jumps++) 
        {
            result = (result + dp[m - 1, n - 1, jumps]) % MOD;
        }
        
        return (int)result;
    }
}
```

## Complexity

- **Time:** O(m^2 * n^2 * k)
- **Space:** O(m * n * k)
