# 3529. Count Cells in Overlapping Horizontal and Vertical Substrings

**Difficulty:** Hard
**Category:** Array, String, Matrix, Hash Function, Rolling Hash, String Matching

## Problem
You are given an `m x n` grid of lowercase letters and a string `pattern`. A cell `(i, j)` is considered **covered** if it lies within some occurrence of `pattern` read left-to-right along its row (a "horizontal" match) **and** it also lies within some occurrence of `pattern` read top-to-bottom along its column (a "vertical" match). Return the number of cells that are covered by both a horizontal and a vertical occurrence of `pattern`.

### Example
If `pattern = "ab"` occurs horizontally in row 0 at columns `[2,3]` and also occurs vertically in column 3 at rows `[0,1]`, then cell `(0,3)` is covered both ways and counts toward the answer.

## Approach
1. Flatten the grid row-major into one long string (`flattenedRow`) for horizontal matching, and flatten it column-major (`flattenedCol`) for vertical matching.
2. Use **Rabin–Karp rolling hash** to find every starting index where `pattern` occurs in each flattened string in `O(length)` time.
3. For every match found, mark the whole matched span as "covered" using a difference-array technique (increment at the start, decrement just after the end, then prefix-sum), separately for horizontal and vertical coverage.
4. Map each flattened-string position back to its `(row, col)` grid cell, and count the cells where both the horizontal-covered and vertical-covered flags are set.

## C# Solution

```csharp
public class Solution {
    private const long Base = 13;
    private const long HashMod = 1_000_000_007;

    public int CountCells(char[][] grid, string pattern) {
        int m = grid.Length, n = grid[0].Length;

        var flattenedRow = new char[m * n];
        int idx = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                flattenedRow[idx++] = grid[i][j];

        var flattenedCol = new char[m * n];
        idx = 0;
        for (int j = 0; j < n; j++)
            for (int i = 0; i < m; i++)
                flattenedCol[idx++] = grid[i][j];

        bool[,] horizontalMatches = MarkMatchedCells(flattenedRow, pattern, m, n, true);
        bool[,] verticalMatches = MarkMatchedCells(flattenedCol, pattern, m, n, false);

        int ans = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (horizontalMatches[i, j] && verticalMatches[i, j]) ans++;

        return ans;
    }

    private bool[,] MarkMatchedCells(char[] flattened, string pattern, int m, int n, bool isHorizontal) {
        var matchMatrix = new bool[m, n];
        int len = flattened.Length;
        var matchPrefix = new int[len + 1];

        int patLen = pattern.Length;
        var pows = new long[patLen];
        pows[0] = 1;
        for (int i = 1; i < patLen; i++) pows[i] = (pows[i - 1] * Base) % HashMod;

        long patternHash = 0;
        foreach (char c in pattern) patternHash = (patternHash * Base + (c - 'a')) % HashMod;

        long runningHash = 0;
        for (int i = 0; i < len; i++) {
            runningHash = (runningHash * Base + (flattened[i] - 'a')) % HashMod;
            if (i >= patLen - 1) {
                if (runningHash == patternHash) {
                    matchPrefix[i - patLen + 1]++;
                    matchPrefix[i + 1]--;
                }
                long oldestLetterHash = (pows[patLen - 1] * (flattened[i - patLen + 1] - 'a')) % HashMod;
                runningHash = (runningHash - oldestLetterHash % HashMod + HashMod) % HashMod;
            }
        }

        int running = 0;
        for (int k = 0; k < len; k++) {
            running += matchPrefix[k];
            if (running > 0) {
                int i = isHorizontal ? k / n : k % m;
                int j = isHorizontal ? k % n : k / m;
                matchMatrix[i, j] = true;
            }
        }

        return matchMatrix;
    }
}
```

## Complexity

- **Time:** O(m * n) for the two rolling-hash scans and difference-array passes
- **Space:** O(m * n) for the flattened strings, prefix arrays, and match matrices
