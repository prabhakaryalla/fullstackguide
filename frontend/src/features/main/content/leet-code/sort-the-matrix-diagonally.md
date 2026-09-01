# 1329. Sort the Matrix Diagonally

**Difficulty:** Medium
**Category:** Array, Sorting, Matrix

## Problem

Given an `m x n` matrix, sort each diagonal (running top-left to bottom-right) in ascending order and return the resulting matrix.

### Example

```
Input: mat = [[3,3,1,1],[2,2,1,2],[1,1,1,2]]
Output: [[1,1,1,1],[1,2,2,2],[1,2,3,3]]
```

## Approach

Every cell on the same diagonal shares the value `row - col`. Group all cell values by that key, sort each group, then write the sorted values back along their diagonal from top-left to bottom-right.

## C# Solution

```csharp
public class Solution
{
    public int[][] DiagonalSort(int[][] mat)
    {
        int m = mat.Length, n = mat[0].Length;
        var diagonals = new Dictionary<int, List<int>>();

        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                int key = i - j;
                if (!diagonals.ContainsKey(key)) diagonals[key] = new List<int>();
                diagonals[key].Add(mat[i][j]);
            }
        }

        foreach (var list in diagonals.Values) list.Sort();

        var indices = new Dictionary<int, int>();
        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                int key = i - j;
                int idx = indices.GetValueOrDefault(key, 0);
                mat[i][j] = diagonals[key][idx];
                indices[key] = idx + 1;
            }
        }

        return mat;
    }
}
```

## Complexity

- **Time:** `O(m * n * log(min(m, n)))`.
- **Space:** `O(m * n)` for the diagonal groups.
