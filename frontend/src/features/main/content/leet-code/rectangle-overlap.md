# 836. Rectangle Overlap

**Difficulty:** Easy
**Category:** Math, Geometry

## Problem

Given two axis-aligned rectangles `rec1` and `rec2`, each represented as `[x1, y1, x2, y2]` (bottom-left and top-right corners), return `true` if they overlap with positive area.

### Example

```
Input: rec1 = [0,0,2,2], rec2 = [1,1,3,3]
Output: true
```

## Approach

Two rectangles overlap with positive area exactly when their projections onto both the x-axis and y-axis overlap. Check that each rectangle's left edge is strictly less than the other's right edge (for both axes).

## C# Solution

```csharp
public class Solution
{
    public bool IsRectangleOverlap(int[] rec1, int[] rec2)
    {
        bool xOverlap = rec1[0] < rec2[2] && rec2[0] < rec1[2];
        bool yOverlap = rec1[1] < rec2[3] && rec2[1] < rec1[3];

        return xOverlap && yOverlap;
    }
}
```

## Complexity

- **Time:** `O(1)`.
- **Space:** `O(1)`.
