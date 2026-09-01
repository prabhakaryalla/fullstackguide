# 1779. Find Nearest Point That Has the Same X or Y Coordinate

**Difficulty:** Easy
**Category:** Array

## Problem

Given integers `x`, `y`, and an array of `points`, find the index of the "valid" point (sharing the same `x` or the same `y` coordinate as `(x, y)`) with the smallest Manhattan distance; if there are ties, return the smallest index. Return `-1` if no valid point exists.

### Example

```
Input: x = 3, y = 4, points = [[1,2],[3,1],[2,4],[2,3],[4,4]]
Output: 2
```

## Approach

Scan every point, skip those that share neither coordinate, and track the smallest Manhattan distance seen along with its index (only updating on a strictly smaller distance, which naturally keeps the first index on ties).

## C# Solution

```csharp
public class Solution
{
    public int NearestValidPoint(int x, int y, int[][] points)
    {
        int best = -1, bestDist = int.MaxValue;

        for (int i = 0; i < points.Length; i++)
        {
            int px = points[i][0], py = points[i][1];
            if (px != x && py != y) continue;

            int dist = Math.Abs(px - x) + Math.Abs(py - y);
            if (dist < bestDist)
            {
                bestDist = dist;
                best = i;
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
