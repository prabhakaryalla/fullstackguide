# 3033. Modify the Matrix

**Difficulty:** Easy
**Category:** Array, Matrix

## Problem

You are given a 0-indexed integer matrix `matrix`. Create a new matrix `answer` with the same dimensions, where `answer[i][j] = matrix[i][j]` if `matrix[i][j] != -1`, and otherwise `answer[i][j]` equals the maximum value found anywhere in column `j` of the original matrix.

### Example

```
Input: matrix = [[1,2,-1],[4,-1,6],[7,8,9]]
Output: [[1,2,9],[4,8,6],[7,8,9]]
```

## Approach

For each column, first find the maximum value across the entire column, then replace every `-1` cell in that column with that maximum.

## C# Solution

```csharp
public class Solution {
    public int[][] ModifiedMatrix(int[][] matrix) {
        int m = matrix.Length, n = matrix[0].Length;
        int[][] ans = new int[m][];
        for (int i = 0; i < m; i++)
            ans[i] = (int[])matrix[i].Clone();

        for (int j = 0; j < n; j++) {
            int mx = 0;
            for (int i = 0; i < m; i++)
                mx = Math.Max(mx, matrix[i][j]);
            for (int i = 0; i < m; i++)
                if (matrix[i][j] == -1)
                    ans[i][j] = mx;
        }
        return ans;
    }
}
```

## Complexity

- Time: O(m * n) — two passes per column.
- Space: O(m * n) — the result matrix.
