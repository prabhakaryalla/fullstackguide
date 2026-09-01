# 1289. Minimum Falling Path Sum II

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Matrix

## Problem

Given an `n x n` integer grid, choose exactly one element from each row such that no two chosen elements from adjacent rows are in the same column, and return the minimum possible sum of the chosen elements.

### Example

```
Input: grid = [[1,2,3],[4,5,6],[7,8,9]]
Output: 13
```

## Approach

Process rows top to bottom, tracking a running DP array of "best sum ending at this column so far." For each new row, instead of scanning all previous columns for every current column (an `O(n^2)` step per row), only the smallest and second-smallest values of the previous row's DP array matter: a column can extend the smallest value unless it's the same column that achieved it, in which case it must use the second-smallest instead. This keeps each row's transition to `O(n)`.

## C# Solution

```csharp
public class Solution
{
    public int MinFallingPathSum(int[][] grid)
    {
        int n = grid.Length;
        var prev = (int[])grid[0].Clone();

        for (int r = 1; r < n; r++)
        {
            var (min1, min1Index, min2) = FindTwoSmallest(prev);
            var current = new int[n];

            for (int c = 0; c < n; c++)
            {
                int best = c == min1Index ? min2 : min1;
                current[c] = grid[r][c] + best;
            }

            prev = current;
        }

        return prev.Min();
    }

    private (int Min1, int Min1Index, int Min2) FindTwoSmallest(int[] arr)
    {
        int min1 = int.MaxValue, min2 = int.MaxValue, min1Index = -1;

        for (int i = 0; i < arr.Length; i++)
        {
            if (arr[i] < min1)
            {
                min2 = min1;
                min1 = arr[i];
                min1Index = i;
            }
            else if (arr[i] < min2)
            {
                min2 = arr[i];
            }
        }

        return (min1, min1Index, min2);
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n)`.
