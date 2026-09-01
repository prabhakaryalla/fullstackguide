# 378. Kth Smallest Element in a Sorted Matrix

**Difficulty:** Medium
**Category:** Array, Binary Search, Sorting, Heap, Matrix

## Problem

Given an `n x n` matrix where each row and column is sorted in ascending order, return the `k`th smallest element in the matrix.

### Example

```
Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
Output: 13
```

### Constraints

- `n == matrix.length == matrix[i].length`
- `1 <= n <= 300`
- `-10^9 <= matrix[i][j] <= 10^9`
- All the rows and columns of `matrix` are guaranteed to be sorted in non-decreasing order.
- `1 <= k <= n^2`

## Approach

Binary search on the *value* range `[matrix[0][0], matrix[n-1][n-1]]` rather than on indices. For each candidate midpoint value, count how many matrix elements are `<= mid` in `O(n)` time by walking from the bottom-left corner (moving up when a value is too large, right when the count can include the whole column above). Narrow the value range until it converges to the `k`th smallest value.

## C# Solution

```csharp
public class Solution
{
    public int KthSmallest(int[][] matrix, int k)
    {
        int n = matrix.Length;
        int left = matrix[0][0], right = matrix[n - 1][n - 1];

        while (left < right)
        {
            int mid = left + (right - left) / 2;
            int count = CountLessOrEqual(matrix, mid);

            if (count < k) left = mid + 1;
            else right = mid;
        }

        return left;
    }

    private int CountLessOrEqual(int[][] matrix, int value)
    {
        int n = matrix.Length;
        int count = 0, row = n - 1, col = 0;

        while (row >= 0 && col < n)
        {
            if (matrix[row][col] <= value)
            {
                count += row + 1;
                col++;
            }
            else
            {
                row--;
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n log(max - min))`.
- **Space:** `O(1)`.
