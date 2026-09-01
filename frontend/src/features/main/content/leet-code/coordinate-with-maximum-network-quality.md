# 1620. Coordinate With Maximum Network Quality

**Difficulty:** Medium
**Category:** Array, Math, Enumeration

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given cellular towers as `[x, y, q]` (position and quality factor) and a `radius`, find the integer coordinate that maximizes total network quality, where a tower within `radius` distance contributes `floor(q / (1 + distance))`. Ties break to the smallest `x`, then the smallest `y`.

### Example

```
Input: towers = [[1,2,5],[2,1,7],[3,1,9]], radius = 2
Output: [2,1]
```

## Approach

Candidate coordinates only need to be checked within the bounding box `[0, maxX] x [0, maxY]` formed by the tower positions (an optimal point outside this box cannot beat the best point inside it). For each candidate coordinate, sum the contribution of every tower within `radius`, tracking the best score with the tie-break rule enforced naturally by iterating `x` then `y` in increasing order and only replacing the best on a strict improvement.

## C# Solution

```csharp
public class Solution
{
    public int[] BestCoordinate(int[][] towers, int radius)
    {
        int maxX = 0;
        int maxY = 0;

        foreach (var tower in towers)
        {
            maxX = Math.Max(maxX, tower[0]);
            maxY = Math.Max(maxY, tower[1]);
        }

        int bestQuality = -1;
        int bestX = 0;
        int bestY = 0;

        for (int x = 0; x <= maxX; x++)
        {
            for (int y = 0; y <= maxY; y++)
            {
                int quality = 0;

                foreach (var tower in towers)
                {
                    int dx = tower[0] - x;
                    int dy = tower[1] - y;
                    double distance = Math.Sqrt(dx * dx + dy * dy);

                    if (distance <= radius)
                    {
                        quality += (int)Math.Floor(tower[2] / (1.0 + distance));
                    }
                }

                if (quality > bestQuality)
                {
                    bestQuality = quality;
                    bestX = x;
                    bestY = y;
                }
            }
        }

        return new int[] { bestX, bestY };
    }
}
```

## Complexity

- **Time:** `O(maxX * maxY * t)`, where `t` is the number of towers.
- **Space:** `O(1)`.
