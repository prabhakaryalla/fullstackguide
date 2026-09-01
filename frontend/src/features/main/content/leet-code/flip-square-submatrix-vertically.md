# 3643. Flip Square Submatrix Vertically

**Difficulty:** Easy
**Category:** Array, Matrix

## Problem

Given an `n x n` grid, flip it vertically — that is, reverse the order of its rows — and return the resulting grid.

### Example

`[[1,2],[3,4]]` flipped vertically becomes `[[3,4],[1,2]]`.

## Approach

Build the result by placing row `n-1-i` of the input at row `i` of the output.

## C# Solution

```csharp
public class Solution 
{
    public int[][] ReverseSubmatrixVertically(int[][] grid) 
    {
        int n = grid.Length;
        var result = new int[n][];
        for (int i = 0; i < n; i++) 
        {
            result[i] = grid[n - 1 - i];
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(n^2)
- **Space:** O(n^2) for the output
