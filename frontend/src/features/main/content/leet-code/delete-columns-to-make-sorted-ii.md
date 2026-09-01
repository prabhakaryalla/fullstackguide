# 955. Delete Columns to Make Sorted II

**Difficulty:** Medium
**Category:** Array, String, Greedy
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array of equal-length strings `strs`, return the minimum number of columns to delete so that the remaining columns make `strs` lexicographically sorted from top to bottom (row by row, not per-column).

### Example

```
Input: strs = ["ca","bb","ac"]
Output: 1
```

## Approach

Process columns left to right, tracking which adjacent row-pairs are *already* strictly ordered by previously kept columns. For a new column, if any not-yet-ordered pair would go out of order, the column must be deleted; otherwise keep it and mark any pair that becomes strictly ordered by this column so later columns can ignore that pair.

## C# Solution

```csharp
public class Solution
{
    public int MinDeletionSize(string[] strs)
    {
        int n = strs[0].Length;
        int deletions = 0;
        var alreadySorted = new bool[strs.Length - 1];

        for (int c = 0; c < n; c++)
        {
            bool mustDelete = false;

            for (int r = 1; r < strs.Length; r++)
            {
                if (!alreadySorted[r - 1] && strs[r][c] < strs[r - 1][c]) { mustDelete = true; break; }
            }

            if (mustDelete) { deletions++; continue; }

            for (int r = 1; r < strs.Length; r++)
            {
                if (strs[r][c] > strs[r - 1][c]) alreadySorted[r - 1] = true;
            }
        }

        return deletions;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(rows)`.
