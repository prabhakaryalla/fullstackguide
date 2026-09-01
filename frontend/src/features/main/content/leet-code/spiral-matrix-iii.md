# 885. Spiral Matrix III

**Difficulty:** Medium
**Category:** Array, Matrix, Simulation

## Problem

Starting at `(rStart, cStart)` in a `rows x cols` grid facing east, walk in a clockwise spiral, visiting every cell (including those outside the grid boundary, which are simply skipped without being recorded). Return the coordinates of all grid cells in the order visited.

### Example

```
Input: rows = 1, cols = 4, rStart = 0, cStart = 0
Output: [[0,0],[0,1],[0,2],[0,3]]
```

## Approach

Simulate the spiral directly: maintain a current direction (cycling east, south, west, north) and a step count that increases by one every two direction changes (since a spiral's leg lengths follow the pattern 1,1,2,2,3,3,...). At each step, move one cell in the current direction, and if the new position lies within the grid, record it. Continue until every grid cell has been recorded.

## C# Solution

```csharp
public class Solution
{
    public int[][] SpiralMatrixIII(int rows, int cols, int rStart, int cStart)
    {
        var result = new List<int[]>();
        int[] dr = { 0, 1, 0, -1 };
        int[] dc = { 1, 0, -1, 0 };

        int r = rStart, c = cStart;
        result.Add(new[] { r, c });

        int dir = 0;
        int steps = 1;

        while (result.Count < rows * cols)
        {
            for (int i = 0; i < 2; i++)
            {
                for (int s = 0; s < steps; s++)
                {
                    r += dr[dir];
                    c += dc[dir];

                    if (r >= 0 && r < rows && c >= 0 && c < cols)
                        result.Add(new[] { r, c });
                }

                dir = (dir + 1) % 4;
            }

            steps++;
        }

        return result.ToArray();
    }
}
```

## Complexity

- **Time:** `O(max(rows, cols)^2)` in the worst case.
- **Space:** `O(rows * cols)` for the output.
