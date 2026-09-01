# 1504. Count Submatrices With All Ones

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Stack, Matrix, Monotonic Stack

## Problem

Given a `rows x cols` binary matrix `mat`, return the number of submatrices that have all ones.

### Example

```
Input: mat = [[1,0,1],[1,1,0],[1,1,0]]
Output: 13
```

## Approach

For each row, compute `height[j]`: the number of consecutive ones ending at row `i`, column `j` (looking upward), similar to the "maximal rectangle" histogram technique. For each row, and for each column `j`, find, for every possible top boundary, the minimum height across the range — this is done efficiently using a monotonic stack: process columns left to right, maintaining a stack of increasing heights; when height decreases, the count of rectangles ending at column `j` equals the sum of `min(height[k..j]) ` for each starting column `k`. We accumulate this using a stack that stores `(height, count of rectangles with that height as minimum)` pairs.

## C# Solution

```csharp
public class Solution
{
    public int NumSubmat(int[][] mat)
    {
        int rows = mat.Length;
        int cols = mat[0].Length;
        int[,] height = new int[rows, cols];
        long total = 0;

        for (int i = 0; i < rows; i++)
        {
            // Stack entries: (height, sum of widths contributing to that height)
            var stack = new Stack<(int Height, int Sum)>();
            int rowSum = 0;

            for (int j = 0; j < cols; j++)
            {
                height[i, j] = mat[i][j] == 0 ? 0 : (i == 0 ? 1 : height[i - 1, j] + 1);

                int currentHeight = height[i, j];
                int sum = 0;

                while (stack.Count > 0 && stack.Peek().Height >= currentHeight)
                {
                    sum += stack.Pop().Sum;
                }

                if (currentHeight > 0)
                {
                    sum += currentHeight;
                }

                stack.Push((currentHeight, sum));
                rowSum += sum;
            }

            total += rowSum;
        }

        return (int)total;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)` — each cell is pushed/popped from its row's stack at most once.
- **Space:** `O(rows * cols)` for the height matrix, `O(cols)` for the stack.
