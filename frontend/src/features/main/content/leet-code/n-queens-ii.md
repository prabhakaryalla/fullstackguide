# 52. N-Queens II

**Difficulty:** Hard
**Category:** Backtracking

## Problem

The n-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other. Given an integer `n`, return the number of distinct solutions to the n-queens puzzle.

### Example 1

```
Input: n = 4
Output: 2
```

### Example 2

```
Input: n = 1
Output: 1
```

### Constraints

- `1 <= n <= 9`

## Approach

Identical backtracking search to N-Queens, but since only the count of valid boards is needed, there is no need to materialize each board — simply increment a counter whenever a full valid placement (row == n) is reached.

## C# Solution

```csharp
public class Solution
{
    public int TotalNQueens(int n)
    {
        return Backtrack(0, n, new HashSet<int>(), new HashSet<int>(), new HashSet<int>());
    }

    private int Backtrack(int row, int n, HashSet<int> cols, HashSet<int> diagonals, HashSet<int> antiDiagonals)
    {
        if (row == n) return 1;

        int count = 0;

        for (int col = 0; col < n; col++)
        {
            int diag = row - col, antiDiag = row + col;
            if (cols.Contains(col) || diagonals.Contains(diag) || antiDiagonals.Contains(antiDiag)) continue;

            cols.Add(col);
            diagonals.Add(diag);
            antiDiagonals.Add(antiDiag);

            count += Backtrack(row + 1, n, cols, diagonals, antiDiagonals);

            cols.Remove(col);
            diagonals.Remove(diag);
            antiDiagonals.Remove(antiDiag);
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n!)` worst case — same pruned backtracking search as N-Queens.
- **Space:** `O(n)` — tracking sets and recursion depth.
