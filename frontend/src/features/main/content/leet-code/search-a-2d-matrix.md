# 74. Search a 2D Matrix

**Difficulty:** Medium
**Category:** Array, Binary Search, Matrix

## Problem

You are given an `m x n` integer matrix with the following properties: each row is sorted in non-decreasing order, and the first integer of each row is greater than the last integer of the previous row. Given an integer `target`, return `true` if `target` is in the matrix, or `false` otherwise. You must write a solution in `O(log(m * n))` time complexity.

### Example 1

```
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
```

```mermaid
graph LR
    A["1"] --- B["3"] --- C["5"] --- D["7"]
    style B fill:#4caf50,color:#fff
```

### Example 2

```
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false
```

### Constraints

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 100`
- `-10^4 <= matrix[i][j], target <= 10^4`

## Approach

Because rows are sorted and chained (last element of row `i` < first element of row `i+1`), the whole matrix can be treated as one flattened sorted array of length `m * n`. Run a standard binary search over the virtual index range `[0, m*n)`, converting each mid index back to `(row, col)` via `mid / n` and `mid % n`.

## C# Solution

```csharp
public class Solution
{
    public bool SearchMatrix(int[][] matrix, int target)
    {
        int m = matrix.Length, n = matrix[0].Length;
        int lo = 0, hi = m * n - 1;

        while (lo <= hi)
        {
            int mid = lo + (hi - lo) / 2;
            int value = matrix[mid / n][mid % n];

            if (value == target) return true;
            if (value < target) lo = mid + 1;
            else hi = mid - 1;
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(log(m * n))` — standard binary search over the flattened index space.
- **Space:** `O(1)`.
