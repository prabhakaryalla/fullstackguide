# 3127. Make a Square with the Same Color

**Difficulty:** Easy
**Category:** Array, Enumeration, Matrix

## Problem

You are given a `3 x 3` grid of characters, each either `'B'` (black) or `'W'` (white). Return `true` if there exists a `2 x 2` square within the grid where at least 3 of its 4 cells share the same color.

## Approach

There are only 4 possible top-left positions for a `2 x 2` square within a `3 x 3` grid: `(0,0)`, `(0,1)`, `(1,0)`, `(1,1)`. For each, count how many of its 4 cells are `'B'` versus `'W'`; if either count reaches `3` or more, return `true`. If none of the 4 squares qualify, return `false`.

## C# Solution

```csharp
public class Solution {
    public bool CanMakeSquare(char[][] grid) {
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                int black = 0, white = 0;
                for (int x = 0; x < 2; x++)
                    for (int y = 0; y < 2; y++)
                        if (grid[i + x][j + y] == 'B')
                            black++;
                        else
                            white++;
                if (black >= 3 || white >= 3)
                    return true;
            }
        }
        return false;
    }
}
```

## Complexity

- Time: O(1) — a fixed 4 squares x 4 cells each.
- Space: O(1).
