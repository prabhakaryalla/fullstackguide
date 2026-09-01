# 835. Image Overlap

**Difficulty:** Medium
**Category:** Array, Hash Table, Matrix

## Problem

Given two binary square matrices `img1` and `img2` of the same size, you may translate `img1` in any direction (sliding it, with parts moved outside the grid discarded). Return the largest possible number of overlapping `1`s between the two images after any single translation.

### Example

```
Input: img1 = [[1,1,0],[0,1,0],[0,1,0]], img2 = [[0,0,0],[0,1,1],[0,0,1]]
Output: 3
```

## Approach

Collect the coordinates of every `1` in both images. For every pair of a `1` from `img1` and a `1` from `img2`, compute the row and column offset (shift) that would align them, and increment a counter for that specific shift in a hash map. After considering every pair, the shift with the highest count represents the translation that produces the most overlapping `1`s.

## C# Solution

```csharp
public class Solution
{
    public int LargestOverlap(int[][] img1, int[][] img2)
    {
        int n = img1.Length;
        var points1 = new List<(int, int)>();
        var points2 = new List<(int, int)>();

        for (int r = 0; r < n; r++)
        {
            for (int c = 0; c < n; c++)
            {
                if (img1[r][c] == 1) points1.Add((r, c));
                if (img2[r][c] == 1) points2.Add((r, c));
            }
        }

        var shiftCounts = new Dictionary<(int, int), int>();

        foreach (var (r1, c1) in points1)
        {
            foreach (var (r2, c2) in points2)
            {
                var shift = (r1 - r2, c1 - c2);
                shiftCounts[shift] = shiftCounts.GetValueOrDefault(shift) + 1;
            }
        }

        return shiftCounts.Count == 0 ? 0 : shiftCounts.Values.Max();
    }
}
```

## Complexity

- **Time:** `O(p1 * p2)`, where `p1` and `p2` are the number of `1`s in each image.
- **Space:** `O(p1 * p2)` for the shift counts.
