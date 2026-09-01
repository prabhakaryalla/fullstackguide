# 452. Minimum Number of Arrows to Burst Balloons

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting

## Problem

Given an array `points` where `points[i] = [xstart, xend]` represents the horizontal diameter of a spherical balloon, an arrow shot at position `x` bursts every balloon whose diameter includes `x`. Return the minimum number of arrows needed to burst all balloons.

### Example

```
Input: points = [[10,16],[2,8],[1,6],[7,12]]
Output: 2
```

### Constraints

- `1 <= points.length <= 10^5`
- `points[i].length == 2`
- `-2^31 <= xstart < xend <= 2^31 - 1`

## Approach

Sort balloons by their end coordinate. Greedily shoot an arrow at the end of the first (unburst) balloon, which bursts every subsequent balloon whose start is `<= that end`; skip past all of them, then shoot a new arrow at the next unburst balloon's end, repeating until all balloons are covered.

## C# Solution

```csharp
public class Solution
{
    public int FindMinArrowShots(int[][] points)
    {
        if (points.Length == 0) return 0;

        Array.Sort(points, (a, b) => a[1].CompareTo(b[1]));

        int arrows = 1;
        long end = points[0][1];

        for (int i = 1; i < points.Length; i++)
        {
            if (points[i][0] > end)
            {
                arrows++;
                end = points[i][1];
            }
        }

        return arrows;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sort.
- **Space:** `O(1)` extra.
