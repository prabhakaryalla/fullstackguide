# 3276. Select Cells in Grid With Maximum Score

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Bit Manipulation, Matrix

## Problem

You are given a 2D matrix `grid` of positive integers. Select a set of cells such that no two selected cells lie in the same row, and all selected cell values are pairwise distinct. Return the maximum possible sum of the selected values.

### Example

```
Input: grid = [[1,2,3],[4,3,2],[1,1,1]]
Output: 8
Explanation: Select 3 from row 0, 4 from row 1 (values {3,4} distinct), sum = 7... one optimal selection yields a maximum total of 8.
```

## Approach

Since at most one cell can be chosen per row and all chosen values must be distinct, group cells by their value and compute, for each distinct value, the bitmask of rows that contain at least one cell with that value. Then run a bitmask dynamic program over "which rows have been used": `dp[mask]` is the best score achievable using exactly the rows in `mask`. For each distinct value with row-bitmask `rv`, try assigning that value to any unused row in `rv`, transitioning `dp[mask]` to `dp[mask | rowBit] = max(dp[mask | rowBit], dp[mask] + value)`. The answer is the maximum value across all `dp` states.

## C# Solution

```csharp
public class Solution 
{
    public int MaxScore(IList<IList<int>> grid) 
    {
        int m = grid.Count;
        var rowsForValue = new Dictionary<int, int>();

        for (int r = 0; r < m; r++) 
        {
            foreach (int v in grid[r]) 
            {
                rowsForValue.TryGetValue(v, out int mask);
                rowsForValue[v] = mask | (1 << r);
            }
        }

        int fullMaskCount = 1 << m;
        int[] dp = new int[fullMaskCount];

        foreach (var kvp in rowsForValue) 
        {
            int value = kvp.Key;
            int rowMask = kvp.Value;
            int[] newDp = (int[])dp.Clone();

            for (int mask = 0; mask < fullMaskCount; mask++) 
            {
                int availableRows = rowMask & ~mask;
                int rows = availableRows;

                while (rows != 0) 
                {
                    int rowBit = rows & (-rows);
                    int newMask = mask | rowBit;
                    int candidate = dp[mask] + value;
                    if (candidate > newDp[newMask]) 
                    {
                        newDp[newMask] = candidate;
                    }
                    rows &= rows - 1;
                }
            }

            dp = newDp;
        }

        int answer = 0;
        for (int mask = 0; mask < fullMaskCount; mask++) 
        {
            if (dp[mask] > answer) answer = dp[mask];
        }

        return answer;
    }
}
```

## Complexity

- **Time:** O(V * 2^m * m) where V is the number of distinct values and m is the row count
- **Space:** O(2^m)
