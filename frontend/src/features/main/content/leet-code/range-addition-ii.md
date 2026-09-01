# 598. Range Addition II

**Difficulty:** Easy
**Category:** Array, Math

## Problem

Given an `m x n` matrix `M` initialized with all `0`s, and an array of operations `ops` where each `ops[i] = [ai, bi]` means increment every element in the submatrix `[0..ai-1][0..bi-1]` by 1, return the count of the maximum integer in the matrix after performing all the operations.

### Example

```
Input: m = 3, n = 3, ops = [[2,2],[3,3]]
Output: 4
```

### Constraints

- `1 <= m, n <= 4 * 10^4`
- `0 <= ops.length <= 10^4`
- `ops[i].length == 2`

## Approach

The maximum value in the matrix always occurs in the region overlapped by *every* operation, since each operation only increments a submatrix anchored at the origin. That overlapping region is exactly `[0..minRow-1][0..minCol-1]`, where `minRow` and `minCol` are the smallest row and column bounds across all operations (or the full matrix dimensions if there are no operations). The count of cells achieving the maximum is simply the area of that region.

## C# Solution

```csharp
public class Solution
{
    public int MaxCount(int m, int n, int[][] ops)
    {
        int minRow = m, minCol = n;

        foreach (var op in ops)
        {
            minRow = Math.Min(minRow, op[0]);
            minCol = Math.Min(minCol, op[1]);
        }

        return minRow * minCol;
    }
}
```

## Complexity

- **Time:** `O(k)`, where `k` is the number of operations.
- **Space:** `O(1)`.
