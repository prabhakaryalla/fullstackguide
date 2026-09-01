# 3070. Count Submatrices with Top-Left Element and Sum Less Than k

**Difficulty:** Medium
**Category:** Array, Matrix, Prefix Sum

## Problem

Given a 0-indexed `m x n` integer matrix `grid` and an integer `k`, return the number of submatrices that have their top-left corner at `(0, 0)` and whose sum of elements is less than or equal to `k`.

### Example

```
Input: grid = [[7,6,3],[6,6,1]], k = 18
Output: 4
Explanation: The submatrices [0..0][0..0], [0..0][0..1], [0..1][0..0], and [0..1][0..1] all have sums <= 18.
```

## Approach

Every valid submatrix is uniquely identified by its bottom-right corner `(i, j)` (since the top-left is fixed at the origin), so build a 2D prefix-sum table where `prefix[i+1][j+1]` is the sum of the submatrix spanning `(0,0)` to `(i,j)`. Count how many of these prefix sums are `<= k`.

## C# Solution

```csharp
public class Solution {
    public int CountSubmatrices(int[][] grid, int k) {
        int m = grid.Length, n = grid[0].Length;
        int[,] prefix = new int[m + 1, n + 1];
        int ans = 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                prefix[i + 1, j + 1] = grid[i][j] + prefix[i, j + 1] + prefix[i + 1, j] - prefix[i, j];
                if (prefix[i + 1, j + 1] <= k)
                    ans++;
            }
        }

        return ans;
    }
}
```

## Complexity

- Time: O(m * n) — one pass building the prefix-sum table.
- Space: O(m * n) — the prefix-sum table.
