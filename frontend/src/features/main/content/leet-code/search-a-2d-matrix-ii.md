# 240. Search a 2D Matrix II

**Difficulty:** Medium
**Category:** Array, Binary Search, Divide and Conquer, Matrix

## Problem

Write an efficient algorithm that searches for a value `target` in an `m x n` integer matrix. Each row is sorted in ascending order from left to right, and each column is sorted in ascending order from top to bottom.

### Example

```
Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
Output: true
```

### Constraints

- `1 <= m, n <= 300`
- `-10^9 <= matrix[i][j], target <= 10^9`

## Approach

Start at the top-right corner. If the current value equals the target, return true. If it is greater than the target, the whole column below it is too large, so move left. If it is smaller, the whole row to the left is too small, so move down. This eliminates one row or column per step.

## C# Solution

```csharp
public class Solution
{
    public bool SearchMatrix(int[][] matrix, int target)
    {
        int row = 0;
        int col = matrix[0].Length - 1;

        while (row < matrix.Length && col >= 0)
        {
            if (matrix[row][col] == target) return true;
            if (matrix[row][col] > target) col--;
            else row++;
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(m + n)` — at most one row or column is eliminated per step.
- **Space:** `O(1)`.
