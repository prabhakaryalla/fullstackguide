# 356. Line Reflection

**Difficulty:** Medium
**Category:** Array, Hash Table, Math
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given `n` points on a 2D plane, return `true` if there exists a line parallel to the y-axis such that reflecting all the points across that line yields the same set of points.

### Example

```
Input: points = [[1,1],[-1,1]]
Output: true
```

### Constraints

- `1 <= n <= 10^4`
- `-10^8 <= xi, yi <= 10^8`

## Approach

If a valid reflection line exists, it must pass through the midpoint of the minimum and maximum x-coordinates (`sum = minX + maxX`), since the leftmost and rightmost points must reflect onto each other. Put every point into a hash set, then verify that for every point `(x, y)`, its mirror image `(sum - x, y)` also exists in the set.

## C# Solution

```csharp
public class Solution
{
    public bool IsReflected(int[][] points)
    {
        if (points.Length == 0) return true;

        int minX = int.MaxValue, maxX = int.MinValue;
        var pointSet = new HashSet<(int X, int Y)>();

        foreach (var point in points)
        {
            minX = Math.Min(minX, point[0]);
            maxX = Math.Max(maxX, point[0]);
            pointSet.Add((point[0], point[1]));
        }

        int sum = minX + maxX;

        foreach (var point in points)
        {
            int mirroredX = sum - point[0];
            if (!pointSet.Contains((mirroredX, point[1])))
                return false;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the point set.
