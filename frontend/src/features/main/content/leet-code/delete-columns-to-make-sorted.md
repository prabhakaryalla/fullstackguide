# 944. Delete Columns to Make Sorted

**Difficulty:** Easy
**Category:** Array, String

## Problem

Given an array of equal-length strings `strs`, arranged as rows of a character grid, return the minimum number of columns to delete so that every remaining column is sorted (non-decreasing) from top to bottom.

### Example

```
Input: strs = ["cba","daf","ghi"]
Output: 1
```

## Approach

Check each column independently: scan down the column and if any row's character is less than the row above it, that column is unsorted and must be deleted. Count how many columns fail this check.

## C# Solution

```csharp
public class Solution
{
    public int MinDeletionSize(string[] strs)
    {
        int count = 0;
        int cols = strs[0].Length;

        for (int c = 0; c < cols; c++)
        {
            for (int r = 1; r < strs.Length; r++)
            {
                if (strs[r][c] < strs[r - 1][c]) { count++; break; }
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(1)`.
