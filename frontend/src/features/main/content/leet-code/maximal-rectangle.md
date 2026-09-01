# 85. Maximal Rectangle

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Stack, Matrix

## Problem

Given a `rows x cols` binary matrix filled with `0`'s and `1`'s, find the largest rectangle containing only `1`'s and return its area.

### Example 1

```
Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 6
```

```mermaid
graph TB
    R0["row 0 heights: 1 0 1 0 0"]
    R1["row 1 heights: 2 0 2 1 1"]
    R2["row 2 heights: 3 1 3 2 2"]
    style R2 fill:#4caf50,color:#fff
```

### Example 2

```
Input: matrix = [["0"]]
Output: 0
```

### Constraints

- `rows == matrix.length`
- `cols == matrix[i].length`
- `1 <= rows, cols <= 200`
- `matrix[i][j]` is `'0'` or `'1'`.

## Approach

Reduce this to repeated calls of Largest Rectangle in Histogram: build a running "heights" array where `heights[col]` is the number of consecutive `1`'s stacked in that column up to the current row (reset to `0` whenever a `0` is encountered). After updating the heights for each row, compute the largest rectangle in that row's histogram and track the overall maximum.

## C# Solution

```csharp
public class Solution
{
    public int MaximalRectangle(char[][] matrix)
    {
        if (matrix.Length == 0) return 0;

        int cols = matrix[0].Length;
        var heights = new int[cols];
        int maxArea = 0;

        foreach (var row in matrix)
        {
            for (int col = 0; col < cols; col++)
            {
                heights[col] = row[col] == '1' ? heights[col] + 1 : 0;
            }

            maxArea = Math.Max(maxArea, LargestRectangleArea(heights));
        }

        return maxArea;
    }

    private int LargestRectangleArea(int[] heights)
    {
        var stack = new Stack<int>();
        int maxArea = 0;
        int n = heights.Length;

        for (int i = 0; i <= n; i++)
        {
            int currentHeight = (i == n) ? 0 : heights[i];

            while (stack.Count > 0 && heights[stack.Peek()] >= currentHeight)
            {
                int height = heights[stack.Pop()];
                int width = stack.Count == 0 ? i : i - stack.Peek() - 1;
                maxArea = Math.Max(maxArea, height * width);
            }

            stack.Push(i);
        }

        return maxArea;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)` — each row runs an `O(cols)` histogram computation.
- **Space:** `O(cols)` — for the heights array and stack.
