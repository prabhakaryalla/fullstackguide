# 2194. Cells in a Range on an Excel Sheet

**Difficulty:** Easy
**Category:** String

## Problem

An Excel sheet column can be represented as a string of uppercase English letters. For example, `"A"` refers to column 1, `"B"` to column 2, `"Z"` to column 26, and so on.

You are given a string `s` in the format `"col1:col2"`, where `col1` represents the starting column and `col2` represents the ending column in the range. Return a list of all cells within this range in lexicographic order.

### Example

```
Input: s = "K1:L2"
Output: ["K1","K2","L1","L2"]
Explanation: The range includes all cells from K1 to L2.
```

## Approach

Parse the input string to extract start and end columns and rows. Then iterate through all columns from start to end, and for each column, iterate through all rows from start to end, adding each cell to the result.

## C# Solution

```csharp
public class Solution
{
    public IList<string> CellsInRange(string s)
    {
        char startCol = s[0];
        char endCol = s[3];
        char startRow = s[1];
        char endRow = s[4];
        
        List<string> result = new List<string>();
        
        for (char col = startCol; col <= endCol; col++)
        {
            for (char row = startRow; row <= endRow; row++)
            {
                result.Add($"{col}{row}");
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O((endCol - startCol + 1) * (endRow - startRow + 1))
- **Space:** O(1), excluding output
