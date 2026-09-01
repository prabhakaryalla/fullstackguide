# 1970. Last Day Where You Can Still Cross

**Difficulty:** Hard
**Category:** Array, Union Find, Binary Search, Matrix

## Problem

Given a `row x col` grid where cells become flooded one at a time according to `cells[i] = [ri, ci]` (1-indexed, flooded on day `i+1`), return the last day on which it is still possible to walk from the top row to the bottom row using only non-flooded (land) cells, moving 4-directionally.

### Example

```
Input: row = 2, col = 2, cells = [[1,1],[2,1],[1,2],[2,2]]
Output: 2
Explanation: After day 2, cells (1,1) and (2,1) are flooded but a path still exists via (1,2)/(2,2); by day 3 no path remains.
```

### Constraints

- `2 <= row, col <= 2 * 10^4`
- `4 <= row * col <= 2 * 10^4`
- `cells.length == row * col`
- Each cell appears exactly once in `cells`.

## Approach

Binary search on the day `d`. For a fixed `d`, mark all cells flooded by day `d` as blocked, and run a BFS/DFS (or union-find) to check if any path exists from the top row to the bottom row using unblocked cells. Since feasibility is monotonic (fewer floods on smaller `d` means more connectivity), binary search finds the largest `d` for which a path still exists.

## C# Solution

```csharp
public class Solution
{
    public int LatestDayToCross(int row, int col, int[][] cells)
    {
        int lo = 1, hi = cells.Length;

        while (lo < hi)
        {
            int mid = lo + (hi - lo + 1) / 2;
            if (CanCross(row, col, cells, mid))
            {
                lo = mid;
            }
            else
            {
                hi = mid - 1;
            }
        }

        return CanCross(row, col, cells, lo) ? lo : 0;
    }

    private bool CanCross(int row, int col, int[][] cells, int day)
    {
        bool[,] flooded = new bool[row + 1, col + 1];
        for (int i = 0; i < day; i++)
        {
            flooded[cells[i][0], cells[i][1]] = true;
        }

        bool[,] visited = new bool[row + 1, col + 1];
        var queue = new Queue<(int r, int c)>();

        for (int c = 1; c <= col; c++)
        {
            if (!flooded[1, c])
            {
                queue.Enqueue((1, c));
                visited[1, c] = true;
            }
        }

        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };

        while (queue.Count > 0)
        {
            var (r, c) = queue.Dequeue();
            if (r == row) return true;

            for (int k = 0; k < 4; k++)
            {
                int nr = r + dr[k], nc = c + dc[k];
                if (nr < 1 || nr > row || nc < 1 || nc > col) continue;
                if (visited[nr, nc] || flooded[nr, nc]) continue;

                visited[nr, nc] = true;
                queue.Enqueue((nr, nc));
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(row * col * log(row * col))` — a BFS pass per binary search step.
- **Space:** `O(row * col)` for the flooded/visited grids.
