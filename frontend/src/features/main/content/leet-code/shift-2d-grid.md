# 1260. Shift 2D Grid

**Difficulty:** Easy
**Category:** Array, Matrix, Simulation

## Problem

Given a 2D `grid` and an integer `k`, shift the grid `k` times. Each shift moves every element to the next position in row-major order, wrapping the last element of the grid around to the first position. Return the grid after `k` shifts.

### Example

```
Input: grid = [[1,2,3],[4,5,6],[7,8,9]], k = 1
Output: [[9,1,2],[3,4,5],[6,7,8]]
```

## Approach

Flatten the grid conceptually into a single row-major sequence of length `rows * cols`. Shifting `k` times is then just a circular rotation of that sequence by `k` positions, so reduce `k` modulo the total size first. Each output cell at flattened index `i` simply reads from flattened index `(i - k + total) % total` of the original grid, avoiding any actual repeated shifting.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> ShiftGrid(int[][] grid, int k)
    {
        int rows = grid.Length, cols = grid[0].Length;
        int total = rows * cols;
        k %= total;

        var flat = new int[total];
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                flat[r * cols + c] = grid[r][c];

        var result = new List<IList<int>>();
        for (int r = 0; r < rows; r++)
        {
            var row = new List<int>();
            for (int c = 0; c < cols; c++)
            {
                int index = (r * cols + c - k + total) % total;
                row.Add(flat[index]);
            }
            result.Add(row);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(rows * cols)`.
