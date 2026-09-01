# 2643. Row With Maximum Ones

**Difficulty:** Easy
**Category:** Array, Matrix

## Problem

Given a binary matrix `mat` (containing only 0s and 1s), return an array `[row_index, count]` where `row_index` is the index of the row with the maximum number of 1s, and `count` is the number of 1s in that row.

If multiple rows have the same maximum count, return the one with the smallest index.

### Example

```
Input: mat = [[0,1],[1,0]]
Output: [0,1]
Explanation: Both rows have 1 one. Row 0 comes first.

Input: mat = [[0,0,0],[0,1,1]]
Output: [1,2]
Explanation: Row 1 has 2 ones, which is the maximum.
```

## Approach

Iterate through each row, counting the number of 1s. Track the row with the maximum count. Since we iterate from top to bottom, we naturally prefer lower indices when counts are equal.

## C# Solution

```csharp
public class Solution
{
    public int[] RowAndMaximumOnes(int[][] mat)
    {
        int maxCount = 0;
        int maxRow = 0;
        
        for (int i = 0; i < mat.Length; i++)
        {
            int count = 0;
            for (int j = 0; j < mat[i].Length; j++)
            {
                if (mat[i][j] == 1)
                    count++;
            }
            
            if (count > maxCount)
            {
                maxCount = count;
                maxRow = i;
            }
        }
        
        return new int[] { maxRow, maxCount };
    }
}
```

## Complexity

- **Time:** O(m * n) where m is number of rows and n is number of columns
- **Space:** O(1)
