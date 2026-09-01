# 3363. Find the Maximum Number of Fruits Collected

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Matrix

## Problem
You are given an `n x n` matrix `fruits`, where `fruits[i][j]` is the number of fruits at cell `(i, j)`. Three children start at the three corners `(0, 0)`, `(0, n-1)`, and `(n-1, 0)`, and each must reach `(n-1, n-1)`. On each move, a child can go to one of the three diagonally-forward cells (increasing its "depth" by one row or column while shifting by -1, 0, or +1 in the other dimension), staying within the grid at all times. Fruits at a cell are collected only once even if multiple children visit it. Return the maximum total number of fruits the three children can collect together.

## Approach
The child starting at `(0, 0)` moves down the rows, shifting its column by -1, 0, or +1 each step; a simple DP over `(row, col)` finds its best path. The child starting at `(0, n-1)` uses the same move pattern but is restricted to strictly stay in the region `col > row`, so its path never crosses the main diagonal already covered by the first child — this keeps the three collected regions disjoint. The child starting at `(n-1, 0)` is symmetric to the second child but transposed (it is restricted to `row > col`), so its optimal value can be computed with the exact same DP run on the transposed grid. Summing the three independent DP results gives the maximum total, since their optimal regions never overlap.

## C# Solution

```csharp
public class Solution 
{
    public int MaxFruits(int[][] fruits) 
    {
        int n = fruits.Length;
        int child1 = SolveChild1(fruits, n);
        int child2 = SolveChild2(fruits, n);
        int child3 = SolveChild2(Transpose(fruits, n), n);

        return child1 + child2 + child3;
    }

    private int SolveChild1(int[][] fruits, int n) 
    {
        int[,] dp = new int[n, n];
        for (int r = 0; r < n; r++)
            for (int c = 0; c < n; c++)
                dp[r, c] = int.MinValue;
        dp[0, 0] = fruits[0][0];

        for (int i = 1; i < n; i++) 
        {
            for (int j = 0; j < n; j++) 
            {
                int best = int.MinValue;
                for (int dj = -1; dj <= 1; dj++) 
                {
                    int pj = j - dj;
                    if (pj >= 0 && pj < n && dp[i - 1, pj] != int.MinValue)
                        best = Math.Max(best, dp[i - 1, pj]);
                }
                if (best != int.MinValue) dp[i, j] = best + fruits[i][j];
            }
        }
        return dp[n - 1, n - 1];
    }

    // Stays strictly in the region column > row, avoiding the main diagonal
    // already collected by the first child.
    private int SolveChild2(int[][] fruits, int n) 
    {
        int[,] dp = new int[n, n];
        for (int r = 0; r < n; r++)
            for (int c = 0; c < n; c++)
                dp[r, c] = int.MinValue;
        dp[0, n - 1] = fruits[0][n - 1];

        for (int i = 1; i < n; i++) 
        {
            for (int j = i + 1; j < n; j++) 
            {
                int best = int.MinValue;
                for (int dj = -1; dj <= 1; dj++) 
                {
                    int pj = j - dj;
                    if (pj > i - 1 && pj < n && dp[i - 1, pj] != int.MinValue)
                        best = Math.Max(best, dp[i - 1, pj]);
                }
                if (best != int.MinValue) dp[i, j] = best + fruits[i][j];
            }
        }
        return Math.Max(dp[n - 1, n - 1], 0);
    }

    private int[][] Transpose(int[][] a, int n) 
    {
        int[][] t = new int[n][];
        for (int i = 0; i < n; i++) 
        {
            t[i] = new int[n];
            for (int j = 0; j < n; j++) t[i][j] = a[j][i];
        }
        return t;
    }
}
```

## Complexity

- **Time:** O(n^2)
- **Space:** O(n^2)
