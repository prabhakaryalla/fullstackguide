# 498. Diagonal Traverse

**Difficulty:** Medium
**Category:** Array, Matrix, Simulation

## Problem

Given an `m x n` matrix `mat`, return all elements of the matrix in a zigzag diagonal order (alternating between traversing upward-right and downward-left along each diagonal).

### Example

```
Input: mat = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,4,7,5,3,6,9,8]
```

### Constraints

- `m == mat.length`
- `n == mat[i].length`
- `1 <= m, n <= 10^4`
- `1 <= m * n <= 10^4`

## Approach

Simulate the diagonal walk directly with a direction flag. While moving "up" (decreasing row, increasing column), hitting the last column moves down one row and flips direction; hitting the first row moves right one column and flips direction; otherwise, continue diagonally. The "down" direction mirrors this logic using the last row and first column as its boundaries.

## C# Solution

```csharp
public class Solution
{
    public int[] FindDiagonalOrder(int[][] mat)
    {
        int rows = mat.Length, cols = mat[0].Length;
        var result = new int[rows * cols];
        int r = 0, c = 0, index = 0;
        bool goingUp = true;

        while (index < result.Length)
        {
            result[index++] = mat[r][c];

            if (goingUp)
            {
                if (c == cols - 1) { r++; goingUp = false; }
                else if (r == 0) { c++; goingUp = false; }
                else { r--; c++; }
            }
            else
            {
                if (r == rows - 1) { c++; goingUp = true; }
                else if (c == 0) { r++; goingUp = true; }
                else { r++; c--; }
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(1)` extra, excluding the output array.
