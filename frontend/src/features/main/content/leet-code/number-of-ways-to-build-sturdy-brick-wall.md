# 2184. Number of Ways to Build Sturdy Brick Wall

**Difficulty:** Medium
**Category:** Dynamic Programming, Bit Manipulation
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given integers `height` and `width` representing the dimensions of a wall. You are also given a 1-indexed array of integers `bricks` where `bricks[i]` is the width of the i-th type of brick.

You want to build the wall such that:
- Each row is exactly `width` units long
- No vertical crack extends through adjacent rows (sturdy condition)

Return the number of ways to build a sturdy wall. The answer may be large, so return it modulo 10^9 + 7.

### Example

```
Input: height = 2, width = 3, bricks = [1,2]
Output: 2
Explanation: Two valid arrangements:
Row 1: [1,1,1], Row 2: [1,2]
Row 1: [1,2], Row 2: [1,1,1] or [2,1]
```

## Approach

1. First, generate all valid row configurations that sum to `width` using the given brick sizes
2. For each pair of row configurations, check if they can be adjacent (no aligned vertical cracks)
3. Use dynamic programming to count the number of ways to build `height` rows

The DP state is: `dp[row][configuration]` = number of ways to build `row` rows with the last row having the given configuration.

## C# Solution

```csharp
public class Solution
{
    private const int MOD = 1000000007;
    
    public int BuildWall(int height, int width, int[] bricks)
    {
        List<List<int>> validRows = new List<List<int>>();
        GenerateRows(bricks, width, new List<int>(), 0, validRows);
        
        int n = validRows.Count;
        bool[,] canFollow = new bool[n, n];
        
        // Check which rows can follow each other
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if (CanBeAdjacent(validRows[i], validRows[j]))
                {
                    canFollow[i, j] = true;
                }
            }
        }
        
        // DP
        long[] dp = new long[n];
        for (int i = 0; i < n; i++)
        {
            dp[i] = 1;
        }
        
        for (int row = 1; row < height; row++)
        {
            long[] newDp = new long[n];
            for (int i = 0; i < n; i++)
            {
                for (int j = 0; j < n; j++)
                {
                    if (canFollow[j, i])
                    {
                        newDp[i] = (newDp[i] + dp[j]) % MOD;
                    }
                }
            }
            dp = newDp;
        }
        
        long result = 0;
        foreach (long count in dp)
        {
            result = (result + count) % MOD;
        }
        
        return (int)result;
    }
    
    private void GenerateRows(int[] bricks, int width, List<int> current, int sum, List<List<int>> result)
    {
        if (sum == width)
        {
            result.Add(new List<int>(current));
            return;
        }
        if (sum > width) return;
        
        foreach (int brick in bricks)
        {
            current.Add(brick);
            GenerateRows(bricks, width, current, sum + brick, result);
            current.RemoveAt(current.Count - 1);
        }
    }
    
    private bool CanBeAdjacent(List<int> row1, List<int> row2)
    {
        int pos1 = 0, pos2 = 0;
        int i = 0, j = 0;
        
        while (i < row1.Count && j < row2.Count)
        {
            pos1 += row1[i];
            pos2 += row2[j];
            
            if (pos1 == pos2) return false; // Aligned crack
            
            if (pos1 < pos2) i++;
            else j++;
        }
        
        return true;
    }
}
```

## Complexity

- **Time:** O(R^2 * W + H * R^2), where R is the number of valid row configurations
- **Space:** O(R^2 + R)
