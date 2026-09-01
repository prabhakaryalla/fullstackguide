# 3548. Equal Sum Grid Partition II

**Difficulty:** Hard
**Category:** Array, Hash Table, Matrix, Prefix Sum

## Problem
You are given an `m x n` matrix `grid` of positive integers. Determine whether a single horizontal or vertical cut can split the grid into two non-empty sections such that either:
- the sums of the two sections are already equal, or
- they can be made equal by discounting **at most one single cell in total** from either section — and if a cell is discounted, the remaining cells of that section must still be **connected** (reachable from one another via up/down/left/right moves).

Return `true` if such a partition exists, otherwise `false`.

### Example
Input: `grid = [[1,2],[3,4]]` → A vertical cut after column 0 gives sums `1+3=4` and `2+4=6`. Discounting `2` from the right section makes it `4`, and the remaining single cell `4` is trivially connected. Output: `true`.

Input: `grid = [[1,2,4],[2,3,5]]` → A horizontal cut after row 0 gives `1+2+4=7` and `2+3+5=10`. Discounting `3` from the bottom section makes it `7`, but this splits the bottom section into two disconnected parts (`[2]` and `[5]`), so this discount is invalid — no valid cut exists here. Output: `false`.

## Approach
Check both cut directions (rows and columns), and for both directions also try the grid **reversed** (to symmetrically test cuts from either end without extra bookkeeping). For a cut after row `i` (top rows `0..i`, bottom rows `i+1..end`) with total sum `sum`:
- If `topSum == botSum`, no modification is needed — success.
- Otherwise, the deficit `diff = topSum - botSum` can only be eliminated by discounting a cell from the **larger (top)** section (a symmetric check on the reversed/transposed grid handles the case where the bottom/right section is larger). Whether a candidate cell can safely be removed depends on connectivity:
  - If the top section is a single row (`i == 0`) or the grid has a single column (`n == 1`), it is just a 1D line — only its two endpoints can be removed without splitting it, so only `grid[0][0]` and the last cell of that line are checked.
  - Otherwise the top section spans more than one row **and** more than one column, so it is a solid rectangular region with no cut vertices — removing *any* single cell from it keeps the rest connected. In that case any previously seen value in the top section is a valid candidate for `diff`.

Repeat this check for: the original grid, the row-reversed grid, the transposed grid, and the transposed-and-reversed grid, to cover horizontal cuts from either side and vertical cuts from either side.

## C# Solution

```csharp
public class Solution {
    public bool CanPartitionGrid(int[][] grid) {
        long sum = 0;
        foreach (int[] row in grid)
            foreach (int val in row)
                sum += val;

        return CanPartition(grid, sum)
            || CanPartition(Reversed(grid), sum)
            || CanPartition(Reversed(Transposed(grid)), sum)
            || CanPartition(Transposed(grid), sum);
    }

    private bool CanPartition(int[][] grid, long sum) {
        long topSum = 0;
        var seen = new HashSet<int>();

        for (int i = 0; i < grid.Length; i++) {
            foreach (int val in grid[i]) topSum += val;
            long botSum = sum - topSum;
            foreach (int val in grid[i]) seen.Add(val);

            long diff = topSum - botSum;
            if (diff == 0
                || diff == grid[0][0]
                || diff == grid[0][^1]
                || diff == grid[i][0]
                || (grid[0].Length > 1 && i > 0 && seen.Contains((int)diff))) {
                return true;
            }
        }

        return false;
    }

    private int[][] Transposed(int[][] grid) {
        int m = grid.Length, n = grid[0].Length;
        var res = new int[n][];
        for (int j = 0; j < n; j++) res[j] = new int[m];
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                res[j][i] = grid[i][j];
        return res;
    }

    private int[][] Reversed(int[][] grid) {
        int m = grid.Length;
        var res = new int[m][];
        for (int i = 0; i < m; i++) res[i] = grid[m - 1 - i];
        return res;
    }
}
```

## Complexity

- **Time:** O(m * n) for each of the four orientation checks
- **Space:** O(m * n) for the transposed/reversed grid copies and the seen-values set
