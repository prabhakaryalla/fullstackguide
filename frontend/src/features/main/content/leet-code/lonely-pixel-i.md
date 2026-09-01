# 531. Lonely Pixel I

**Difficulty:** Medium
**Category:** Array, Matrix
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a 2D picture consisting of black `'B'` and white `'W'` pixels, return the number of black lonely pixels — a black pixel that is the only black pixel in both its row and its column.

### Example

```
Input: picture = [["W","W","B"],["W","B","W"],["B","W","W"]]
Output: 3
```

### Constraints

- `1 <= picture.length, picture[i].length <= 500`

## Approach

Count the number of black pixels in every row and every column in one pass. A black pixel is lonely exactly when its row's black count and its column's black count are both exactly `1`, which can be checked directly using the precomputed counts.

## C# Solution

```csharp
public class Solution
{
    public int FindLonelyPixel(char[][] picture)
    {
        int rows = picture.Length, cols = picture[0].Length;
        var rowCounts = new int[rows];
        var colCounts = new int[cols];

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
        }

        int count = 0;
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                if (picture[r][c] == 'B' && rowCounts[r] == 1 && colCounts[c] == 1)
                    count++;

        return count;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(rows + cols)` for the counts.
