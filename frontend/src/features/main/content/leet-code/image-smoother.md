# 661. Image Smoother

**Difficulty:** Easy
**Category:** Array, Matrix

## Problem

Given an `m x n` integer matrix `img` representing grayscale image values, return an image where every cell is the average (rounded down) of itself and its up-to-8 surrounding neighbors, using only the cells that actually exist within the image bounds.

### Example

```
Input: img = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[0,0,0],[0,0,0],[0,0,0]]
```

### Constraints

- `m == img.length`
- `n == img[i].length`
- `1 <= m, n <= 200`

## Approach

For each cell, scan its 3x3 neighborhood (itself plus up to 8 neighbors), skipping any position that falls outside the grid boundary, and accumulate a running sum and count of valid cells. The smoothed value is the integer-divided average of that sum by the count.

## C# Solution

```csharp
public class Solution
{
    public int[][] ImageSmoother(int[][] img)
    {
        int rows = img.Length, cols = img[0].Length;
        var result = new int[rows][];
        for (int i = 0; i < rows; i++)
            result[i] = new int[cols];

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                int sum = 0, count = 0;

                for (int dr = -1; dr <= 1; dr++)
                {
                    for (int dc = -1; dc <= 1; dc++)
                    {
                        int nr = r + dr, nc = c + dc;
                        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;

                        sum += img[nr][nc];
                        count++;
                    }
                }

                result[r][c] = sum / count;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(rows * cols)` for the output image.
