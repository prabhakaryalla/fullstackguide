# 3394. Check if Grid Can be Cut into Sections

**Difficulty:** Medium
**Category:** Array, Sorting, Greedy

## Problem

You are given an integer `n` representing the dimensions of an `n x n` grid, with the origin at the bottom-left corner of the grid. You are also given a 2D array of coordinates `rectangles`, where `rectangles[i]` is in the form `[startX, startY, endX, endY]`, representing a rectangle on the grid with its bottom-left corner at `(startX, startY)` and top-right corner at `(endX, endY)`. The rectangles do not overlap.

Determine if it is possible to make either two horizontal or two vertical cuts on the grid such that:

- Each of the three resulting sections formed by the cuts contains at least one rectangle.
- Every rectangle belongs to exactly one section.

Return `true` if such cuts can be made; otherwise, return `false`.

### Example

`rectangles = [[1,0,5,2],[0,2,2,4],[3,2,5,3],[0,4,4,5]]`

Projecting onto the x-axis gives intervals `[1,5]`, `[0,2]`, `[3,5]`, `[0,4]`. Merging overlapping intervals only yields a single merged group, so a vertical split into 3 sections is impossible.

Projecting onto the y-axis gives intervals `[0,2]`, `[2,4]`, `[2,3]`, `[4,5]`. Sorted by start: `[0,2]`, `[2,3]`, `[2,4]`, `[4,5]`. These merge into a single group as well `(0..5)`, since `2 < 2` is false but overlaps push the end forward continuously — in this particular layout the merged groups still total fewer than 3, so the answer is `false` for this configuration.

## Approach

A valid pair of cuts along one axis exists exactly when the rectangles' projections onto that axis form **3 or more non-overlapping merged intervals**. Two cuts placed at the boundaries between merged groups guarantee every rectangle stays entirely inside one of the three sections.

1. Project every rectangle onto the x-axis as `[startX, endX]`, sort by start, and merge overlapping/touching intervals, counting the resulting groups. If the count is `>= 3`, a vertical cut works.
2. Repeat the same process for the y-axis projections `[startY, endY]`. If the count is `>= 3`, a horizontal cut works.
3. Return `true` if either axis produces at least 3 merged groups.

## C# Solution

```csharp
public class Solution 
{
    public bool CheckValidCuts(int n, int[][] rectangles) 
    {
        return CanCut(rectangles, 0, 2) || CanCut(rectangles, 1, 3);
    }

    private bool CanCut(int[][] rectangles, int lowIdx, int highIdx) 
    {
        var intervals = new List<int[]>();
        foreach (var rect in rectangles) 
        {
            intervals.Add(new int[] { rect[lowIdx], rect[highIdx] });
        }
        intervals.Sort((a, b) => a[0] - b[0]);

        int mergedCount = 1;
        int currentEnd = intervals[0][1];
        for (int i = 1; i < intervals.Count; i++) 
        {
            if (intervals[i][0] >= currentEnd) 
            {
                mergedCount++;
                currentEnd = intervals[i][1];
            } 
            else 
            {
                currentEnd = Math.Max(currentEnd, intervals[i][1]);
            }
        }
        return mergedCount >= 3;
    }
}
```

## Complexity

- **Time:** O(m log m), where m is the number of rectangles.
- **Space:** O(m)
