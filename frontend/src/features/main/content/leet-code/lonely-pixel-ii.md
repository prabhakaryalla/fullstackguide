# 533. Lonely Pixel II

**Difficulty:** Medium
**Category:** Array, Matrix
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a picture of black `'B'` and white `'W'` pixels and an integer `target`, return the number of black pixels located at position `(r, c)` such that: the number of black pixels in row `r` equals `target`, the number of black pixels in column `c` equals `target`, and all rows that have exactly `target` black pixels are identical to each other.

### Example

```
Input: picture = [["W","B","W","B","B","W"],["W","B","W","B","B","W"],["W","B","W","B","B","W"],["W","W","B","W","B","W"]], target = 3
Output: 6
```

### Constraints

- `1 <= picture.length, picture[i].length <= 200`
- `1 <= target <= picture.length`

## Approach

Precompute the black-pixel count for every row and column, and represent each row as a full pattern string. Group rows whose black count equals `target` by their pattern string; only patterns that repeat exactly `target` times (matching every qualifying row's requirement of being identical to other qualifying rows) can contribute. Then for each column with exactly `target` black pixels, count black pixels lying in rows that satisfy both the row-count and repeated-pattern conditions.

## C# Solution

```csharp
public class Solution
{
    public int FindBlackPixel(char[][] picture, int target)
    {
        int rows = picture.Length, cols = picture[0].Length;
        var rowCounts = new int[rows];
        var colCounts = new int[cols];
        var rowPatterns = new string[rows];

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (picture[r][c] == 'B')
                {
                    rowCounts[r]++;
                    colCounts[c]++;
                }
            }

            rowPatterns[r] = new string(picture[r]);
        }

        var patternCounts = new Dictionary<string, int>();
        for (int r = 0; r < rows; r++)
        {
            if (rowCounts[r] == target)
                patternCounts[rowPatterns[r]] = patternCounts.GetValueOrDefault(rowPatterns[r]) + 1;
        }

        int result = 0;
        for (int c = 0; c < cols; c++)
        {
            if (colCounts[c] != target) continue;

            for (int r = 0; r < rows; r++)
            {
                if (picture[r][c] == 'B' && rowCounts[r] == target
                    && patternCounts.GetValueOrDefault(rowPatterns[r]) == target)
                {
                    result++;
                }
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(rows * cols)` for the row patterns and pattern-count map.
