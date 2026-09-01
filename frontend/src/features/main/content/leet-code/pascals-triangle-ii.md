# 119. Pascal's Triangle II

**Difficulty:** Easy
**Category:** Array, Dynamic Programming

## Problem

Given an integer `rowIndex`, return the `rowIndex`-th row (0-indexed) of Pascal's triangle.

### Example 1

```
Input: rowIndex = 3
Output: [1,3,3,1]
```

### Example 2

```
Input: rowIndex = 0
Output: [1]
```

### Constraints

- `0 <= rowIndex <= 33`

## Approach

To use only `O(rowIndex)` extra space, update a single row array in place from right to left: updating right-to-left ensures each position still reads its "old" (previous row) value from the position to its left before that position gets overwritten.

## C# Solution

```csharp
public class Solution
{
    public IList<int> GetRow(int rowIndex)
    {
        var row = new int[rowIndex + 1];
        row[0] = 1;

        for (int i = 1; i <= rowIndex; i++)
        {
            for (int j = i; j > 0; j--)
            {
                row[j] += row[j - 1];
            }
        }

        return row;
    }
}
```

## Complexity

- **Time:** `O(rowIndex^2)` — total number of updates across all rows.
- **Space:** `O(rowIndex)` extra, excluding the output.
