# 733. Flood Fill

**Difficulty:** Easy
**Category:** Array, Depth-First Search, Breadth-First Search, Matrix

## Problem

Given an image represented as a grid of integers, a starting pixel `(sr, sc)`, and a new `color`, perform a flood fill: change the color of the starting pixel and every pixel connected to it (4-directionally) with the same original color, then return the modified image.

### Example

```
Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2
Output: [[2,2,2],[2,2,0],[2,0,1]]
```

## Approach

Record the original color at the starting pixel. If it already matches the new color, no work is needed (and returning immediately also avoids infinite recursion). Otherwise, recursively visit the starting pixel and its neighbors, changing color and continuing to spread only through cells that still match the original color.

## C# Solution

```csharp
public class Solution
{
    public int[][] FloodFill(int[][] image, int sr, int sc, int color)
    {
        int originalColor = image[sr][sc];
        if (originalColor == color) return image;

        Dfs(image, sr, sc, originalColor, color);
        return image;
    }

    private void Dfs(int[][] image, int r, int c, int originalColor, int newColor)
    {
        int rows = image.Length, cols = image[0].Length;
        if (r < 0 || r >= rows || c < 0 || c >= cols || image[r][c] != originalColor) return;

        image[r][c] = newColor;

        Dfs(image, r + 1, c, originalColor, newColor);
        Dfs(image, r - 1, c, originalColor, newColor);
        Dfs(image, r, c + 1, originalColor, newColor);
        Dfs(image, r, c - 1, originalColor, newColor);
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(rows * cols)` for the recursion stack in the worst case.
