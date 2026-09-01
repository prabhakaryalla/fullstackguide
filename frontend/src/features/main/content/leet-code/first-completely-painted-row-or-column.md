# 2661. First Completely Painted Row or Column

**Difficulty:** Medium
**Category:** Array, Hash Table, Matrix

## Problem

You are given a 0-indexed integer array `arr`, and an `m x n` integer matrix `mat`. `arr` and `mat` both contain all the integers in the range `[1, m * n]`.

Go through each index `i` in `arr` starting from index `0` and paint the cell in `mat` containing the integer `arr[i]`.

Return the smallest index `i` at which either a row or a column will be completely painted in `mat`.

### Example

```
Input: arr = [1,3,4,2], mat = [[1,4],[2,3]]
Output: 2
Explanation: After arr[2] = 4, row 0 is complete: [1,4].
```

## Approach

Create a position map for each value in the matrix. For each index in `arr`, mark the cell as painted and increment counters for that row and column. When any counter reaches its full count, return the current index.

## C# Solution

```csharp
public class Solution
{
    public int FirstCompleteIndex(int[] arr, int[][] mat)
    {
        int m = mat.Length;
        int n = mat[0].Length;
        var pos = new Dictionary<int, (int, int)>();
        
        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                pos[mat[i][j]] = (i, j);
            }
        }
        
        int[] rowCount = new int[m];
        int[] colCount = new int[n];
        
        for (int i = 0; i < arr.Length; i++)
        {
            var (r, c) = pos[arr[i]];
            rowCount[r]++;
            colCount[c]++;
            
            if (rowCount[r] == n || colCount[c] == m)
                return i;
        }
        
        return -1;
    }
}
```

## Complexity

- **Time:** O(m × n) — building position map and processing array
- **Space:** O(m × n) — for the position map
