# 3418. Maximum Amount of Money Robot Can Earn

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Matrix

## Problem

You are given an `m x n` grid `coins`, where `coins[i][j]` can be negative (representing a penalty, e.g., a robber) or non-negative (representing money). A robot starts at `(0, 0)` and moves to `(m-1, n-1)`, only moving right or down at each step.

The robot can **neutralize** the penalty of at most **2** cells with negative values along its path (treating them as `0` instead of their negative value). Return the maximum total money the robot can collect.

### Example

`coins = [[0,1,-1],[1,-2,3],[2,-3,4]]`

Path `(0,0) -> (1,0) -> (2,0) -> (2,1) -> (2,2)`: values `0,1,2,-3,4`. Neutralizing the `-3` gives `0+1+2+0+4 = 7`.

## Approach

Use a 3D DP where `dp[i][j][c]` is the maximum money to reach cell `(i, j)` having used exactly `c` (0, 1, or 2) neutralizations so far. At each cell, two transitions are possible:

- Take the cell's value as-is, carrying forward the same neutralization count `c`.
- If the cell's value is negative and `c > 0`, neutralize it (treat as `0`), consuming one neutralization from state `c-1`.

The final answer is the best value among `dp[m-1][n-1][0..2]`.

## C# Solution

```csharp
public class Solution 
{
    public int MaximumAmount(int[][] coins) 
    {
        int m = coins.Length, n = coins[0].Length;
        int negInf = int.MinValue / 2;
        int[,,] dp = new int[m, n, 3];

        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                for (int c = 0; c < 3; c++)
                    dp[i, j, c] = negInf;

        for (int i = 0; i < m; i++) 
        {
            for (int j = 0; j < n; j++) 
            {
                int value = coins[i][j];
                for (int c = 0; c < 3; c++) 
                {
                    int prevBest = negInf;
                    if (i == 0 && j == 0) 
                    {
                        prevBest = 0;
                    } 
                    else 
                    {
                        if (i > 0) prevBest = Math.Max(prevBest, dp[i - 1, j, c]);
                        if (j > 0) prevBest = Math.Max(prevBest, dp[i, j - 1, c]);
                    }

                    int withoutNeutralize = prevBest > negInf ? prevBest + value : negInf;

                    int withNeutralize = negInf;
                    if (value < 0 && c > 0) 
                    {
                        int prevBestLower = negInf;
                        if (i == 0 && j == 0) 
                        {
                            prevBestLower = 0;
                        } 
                        else 
                        {
                            if (i > 0) prevBestLower = Math.Max(prevBestLower, dp[i - 1, j, c - 1]);
                            if (j > 0) prevBestLower = Math.Max(prevBestLower, dp[i, j - 1, c - 1]);
                        }
                        if (prevBestLower > negInf) 
                        {
                            withNeutralize = prevBestLower;
                        }
                    }

                    dp[i, j, c] = Math.Max(withoutNeutralize, withNeutralize);
                }
            }
        }

        int answer = negInf;
        for (int c = 0; c < 3; c++) 
        {
            answer = Math.Max(answer, dp[m - 1, n - 1, c]);
        }
        return answer;
    }
}
```

## Complexity

- **Time:** O(m * n)
- **Space:** O(m * n)
