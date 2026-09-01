# 1637. Widest Vertical Area Between Two Points Containing No Points

**Difficulty:** Medium
**Category:** Array, Sorting

## Problem

Given an array of 2D `points`, return the widest vertical area (measured only by the x-coordinate gap) that contains no points, where the area cannot include the leftmost or rightmost point's x-coordinate.

### Example

```
Input: points = [[8,7],[9,9],[7,4],[9,7]]
Output: 1
```

## Approach

Only the x-coordinates matter. Extract and sort them, then the widest empty vertical area is simply the maximum gap between consecutive sorted x-values.

## C# Solution

```csharp
public class Solution
{
    public int MaxWidthOfVerticalArea(int[][] points)
    {
        int[] xs = points.Select(p => p[0]).OrderBy(x => x).ToArray();
        int maxGap = 0;

        for (int i = 1; i < xs.Length; i++)
        {
            maxGap = Math.Max(maxGap, xs[i] - xs[i - 1]);
        }

        return maxGap;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)`.
