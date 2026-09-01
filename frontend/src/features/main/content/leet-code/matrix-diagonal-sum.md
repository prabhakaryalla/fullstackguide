# 1572. Matrix Diagonal Sum

**Difficulty:** Easy
**Category:** Array, Matrix

## Problem

Given a square matrix `mat`, return the sum of the elements on its primary diagonal and its secondary (anti) diagonal. If a cell belongs to both diagonals (only possible for the center cell of an odd-sized matrix), count it only once.

### Example

```
Input: mat = [[1,2,3],[4,5,6],[7,8,9]]
Output: 25
```

## Approach

Iterate over each row index `i`, adding `mat[i][i]` (primary diagonal) and `mat[i][n - 1 - i]` (secondary diagonal). If the matrix has odd size and `i` is the exact middle row, the two indices coincide, so subtract the duplicate contribution once at the end.

## C# Solution

```csharp
public class Solution
{
    public int DiagonalSum(int[][] mat)
    {
        int n = mat.Length;
        long sum = 0;

        for (int i = 0; i < n; i++)
        {
            sum += mat[i][i];
            sum += mat[i][n - 1 - i];
        }

        if (n % 2 == 1)
        {
            sum -= mat[n / 2][n / 2];
        }

        return (int)sum;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over the diagonal indices.
- **Space:** `O(1)`.
