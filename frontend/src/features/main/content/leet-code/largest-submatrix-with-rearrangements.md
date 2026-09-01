# 1727. Largest Submatrix With Rearrangements

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting, Matrix

## Problem

Given a binary matrix `matrix`, you may rearrange the columns in any order. Return the area of the largest submatrix consisting entirely of `1`s after an optimal column rearrangement.

### Example

```
Input: matrix = [[0,0,1],[1,1,1],[1,0,1]]
Output: 4
```

## Approach

For each row, maintain the height of consecutive `1`s ending at that row for every column (a histogram that resets to `0` whenever a `0` is seen). For each row, sort the heights descending; the best rectangle ending at that row using the `k` tallest columns has area `heights[k-1] * k`, maximized over all `k` and all rows.

## C# Solution

```csharp
public class Solution
{
    public int LargestSubmatrix(int[][] matrix)
    {
        int m = matrix.Length, n = matrix[0].Length;
        int[] heights = new int[n];
        int best = 0;

        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
                heights[j] = matrix[i][j] == 1 ? heights[j] + 1 : 0;

            int[] sorted = (int[])heights.Clone();
            Array.Sort(sorted);
            Array.Reverse(sorted);

            for (int k = 0; k < n; k++)
                best = Math.Max(best, sorted[k] * (k + 1));
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(m * n log n)`.
- **Space:** `O(n)`.
