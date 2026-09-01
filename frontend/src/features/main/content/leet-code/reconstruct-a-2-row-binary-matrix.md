# 1253. Reconstruct a 2-Row Binary Matrix

**Difficulty:** Medium
**Category:** Array, Greedy

## Problem

Given `upper` and `lower` (the total of row 0 and row 1) and `colsum` (each column's total, `0`, `1`, or `2`), reconstruct any valid `2 x n` binary matrix satisfying all three constraints, or return an empty result if impossible.

### Example

```
Input: upper = 2, lower = 1, colsum = [1,1,1]
Output: [[1,1,0],[0,0,1]]
```

## Approach

Process columns greedily. A column summing to `2` must have `1` in both rows, decrementing both `upper` and `lower`. A column summing to `0` gets `0` in both rows. A column summing to `1` should go to whichever row currently has more remaining budget — this greedy choice never causes a shortfall later, since it balances the two row totals as evenly as possible. After processing all columns, if `upper` and `lower` haven't both reached exactly `0`, no valid matrix exists.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> ReconstructMatrix(int upper, int lower, int[] colsum)
    {
        int n = colsum.Length;
        var row0 = new int[n];
        var row1 = new int[n];

        for (int i = 0; i < n; i++)
        {
            if (colsum[i] == 2)
            {
                row0[i] = 1;
                row1[i] = 1;
                upper--;
                lower--;
            }
            else if (colsum[i] == 1)
            {
                if (upper > lower)
                {
                    row0[i] = 1;
                    upper--;
                }
                else
                {
                    row1[i] = 1;
                    lower--;
                }
            }
        }

        if (upper != 0 || lower != 0) return new List<IList<int>>();

        return new List<IList<int>> { row0.ToList(), row1.ToList() };
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the two output rows.
