# 1252. Cells with Odd Values in a Matrix

**Difficulty:** Easy
**Category:** Array, Math, Simulation

## Problem

Given the dimensions `m x n` of a matrix initialized to all zeros, and an array `indices` where each `[ri, ci]` means "increment every value in row `ri` and every value in column `ci` by 1," return the number of cells with an odd value after applying all increments.

### Example

```
Input: m = 2, n = 3, indices = [[0,1],[1,1]]
Output: 6
```

## Approach

Rather than simulating the full matrix, just track how many times each row and each column was incremented. A cell `(r, c)`'s final value has the same parity as `rowIncrements[r] + colIncrements[c]`, which is odd exactly when one of the two counts is odd and the other is even. So count odd rows and odd columns, then combine: odd-row cells paired with even columns, plus even-row cells paired with odd columns.

## C# Solution

```csharp
public class Solution
{
    public int OddCells(int m, int n, int[][] indices)
    {
        var rowIncrements = new int[m];
        var colIncrements = new int[n];

        foreach (var idx in indices)
        {
            rowIncrements[idx[0]]++;
            colIncrements[idx[1]]++;
        }

        int oddRows = rowIncrements.Count(r => r % 2 == 1);
        int oddCols = colIncrements.Count(c => c % 2 == 1);

        return oddRows * (n - oddCols) + oddCols * (m - oddRows);
    }
}
```

## Complexity

- **Time:** `O(m + n + q)`, where `q` is the number of indices.
- **Space:** `O(m + n)`.
