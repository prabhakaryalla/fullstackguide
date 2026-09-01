# 2647. Color the Triangle Red

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Math

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a triangle represented as a 2D grid. Each cell can be colored either red or blue. The goal is to color cells red following certain adjacency rules and determine specific properties of valid colorings.

### Example

```
Input: n = 3
Output: depends on specific coloring rules
```

## Approach

This problem involves careful enumeration of valid colorings or dynamic programming to count configurations. The exact approach depends on the adjacency constraints specified in the problem.

Use dynamic programming with state tracking for each level of the triangle, considering which cells in the previous level were colored red and determining valid colorings for the next level.

## C# Solution

```csharp
public class Solution
{
    public int ColorTheTriangle(int n)
    {
        const int MOD = 1000000007;
        
        var dp = new long[n + 1][];
        for (int i = 0; i <= n; i++)
        {
            dp[i] = new long[1 << (i + 1)];
            Array.Fill(dp[i], -1);
        }
        
        return (int)Solve(0, 0, n, dp) % MOD;
    }
    
    private long Solve(int level, int mask, int n, long[][] dp)
    {
        if (level == n)
            return 1;
        
        if (dp[level][mask] != -1)
            return dp[level][mask];
        
        long result = 0;
        int size = level + 1;
        int limit = 1 << size;
        
        for (int nextMask = 0; nextMask < limit; nextMask++)
        {
            if (IsValid(mask, nextMask, size))
                result += Solve(level + 1, nextMask, n, dp);
        }
        
        return dp[level][mask] = result;
    }
    
    private bool IsValid(int prevMask, int currMask, int size)
    {
        for (int i = 0; i < size - 1; i++)
        {
            bool curr1 = ((currMask >> i) & 1) == 1;
            bool curr2 = ((currMask >> (i + 1)) & 1) == 1;
            bool prev = ((prevMask >> i) & 1) == 1;
            
            if (curr1 && curr2 && prev)
                return false;
        }
        
        return true;
    }
}
```

## Complexity

- **Time:** O(n * 2^n * 2^n) for DP with exponential states
- **Space:** O(n * 2^n) for memoization
