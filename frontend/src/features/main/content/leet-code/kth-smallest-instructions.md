# 1643. Kth Smallest Instructions

**Difficulty:** Hard
**Category:** Math, Dynamic Programming, Combinatorics

## Problem

You start at `(0, 0)` and must reach `destination = [row, col]` using only moves `'H'` (increase column) and `'V'` (increase row). Among all valid instruction strings sorted lexicographically, return the `k`-th smallest (1-indexed).

### Example

```
Input: destination = [2,3], k = 1
Output: "HHHVV"
```

## Approach

Build the answer greedily one character at a time. At each step, if choosing `'H'` is possible, count how many valid completions exist if `'H'` is chosen next — this equals `C(remainingRow + remainingCol - 1, remainingRow)`, the number of ways to arrange the remaining moves. If `k` is within that count, commit to `'H'`; otherwise subtract that count from `k` and commit to `'V'`. Precompute Pascal's triangle up to `row + col` to answer each combination lookup in O(1).

## C# Solution

```csharp
public class Solution
{
    public string KthSmallestPath(int[] destination, int k)
    {
        int row = destination[0];
        int col = destination[1];
        long[][] pascal = BuildPascal(row + col);
        StringBuilder result = new StringBuilder();

        for (int step = 0; step < row + col; step++)
        {
            if (col == 0)
            {
                result.Append('V');
                row--;
                continue;
            }

            if (row == 0)
            {
                result.Append('H');
                col--;
                continue;
            }

            long countIfH = pascal[row + col - 1][row];

            if (k <= countIfH)
            {
                result.Append('H');
                col--;
            }
            else
            {
                k -= countIfH;
                result.Append('V');
                row--;
            }
        }

        return result.ToString();
    }

    private long[][] BuildPascal(int n)
    {
        long[][] pascal = new long[n + 1][];

        for (int i = 0; i <= n; i++)
        {
            pascal[i] = new long[n + 1];
            pascal[i][0] = 1;

            for (int j = 1; j <= i; j++)
            {
                pascal[i][j] = pascal[i - 1][j - 1] + pascal[i - 1][j];
            }
        }

        return pascal;
    }
}
```

## Complexity

- **Time:** `O((row + col)^2)` to build Pascal's triangle, `O(row + col)` to build the answer.
- **Space:** `O((row + col)^2)`.
