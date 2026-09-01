# 1380. Lucky Numbers in a Matrix

**Difficulty:** Easy
**Category:** Array, Matrix

## Problem

Given an `m x n` matrix with distinct values, a lucky number is the minimum in its row and the maximum in its column. Return all lucky numbers (there is at most one).

### Example

```
Input: matrix = [[3,7,8],[9,11,13],[15,16,17]]
Output: [15]
```

## Approach

Find the minimum value of each row and the maximum value of each column, then check every cell to see if it equals both its row minimum and its column maximum.

## C# Solution

```csharp
public class Solution
{
    public IList<int> LuckyNumbers(int[][] matrix)
    {
        int m = matrix.Length, n = matrix[0].Length;
        var rowMin = new int[m];
        var colMax = new int[n];

        for (int i = 0; i < m; i++) rowMin[i] = matrix[i].Min();
        for (int j = 0; j < n; j++) colMax[j] = Enumerable.Range(0, m).Max(i => matrix[i][j]);

        var result = new List<int>();
        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if (matrix[i][j] == rowMin[i] && matrix[i][j] == colMax[j])
                {
                    result.Add(matrix[i][j]);
                }
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(m * n)`.
- **Space:** `O(m + n)` for the row/column extremes.
