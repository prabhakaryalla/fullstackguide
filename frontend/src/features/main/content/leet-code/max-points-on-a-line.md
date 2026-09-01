# 149. Max Points on a Line

**Difficulty:** Hard
**Category:** Array, Hash Table, Math, Geometry

## Problem

Given an array of `points` where `points[i] = [xi, yi]` represents a point on the X-Y plane, return the maximum number of points that lie on the same straight line.

### Example 1

```
Input: points = [[1,1],[2,2],[3,3]]
Output: 3
```

```mermaid
graph LR
    A["(1,1)"] --- B["(2,2)"] --- C["(3,3)"]
    style A fill:#4caf50,color:#fff
    style B fill:#4caf50,color:#fff
    style C fill:#4caf50,color:#fff
```

### Example 2

```
Input: points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
Output: 4
```

### Constraints

- `1 <= points.length <= 300`
- `points[i].length == 2`
- `-10^4 <= xi, yi <= 10^4`
- All the `points` are unique.

## Approach

For each point, compute the slope from that point to every other point, grouped in a dictionary keyed by a normalized `(dx, dy)` direction (reduced by their greatest common divisor, with a consistent sign convention, so that equivalent slopes hash identically regardless of floating-point precision). The largest group for a given anchor point, plus the anchor itself, gives the most points colinear through that anchor; take the maximum across all anchors.

## C# Solution

```csharp
public class Solution
{
    public int MaxPoints(int[][] points)
    {
        int n = points.Length;
        if (n <= 2) return n;

        int best = 1;

        for (int i = 0; i < n; i++)
        {
            var slopeCounts = new Dictionary<(long, long), int>();

            for (int j = i + 1; j < n; j++)
            {
                int dx = points[j][0] - points[i][0];
                int dy = points[j][1] - points[i][1];
                int gcd = Gcd(Math.Abs(dx), Math.Abs(dy));

                if (gcd != 0)
                {
                    dx /= gcd;
                    dy /= gcd;
                }

                if (dx < 0 || (dx == 0 && dy < 0))
                {
                    dx = -dx;
                    dy = -dy;
                }

                var key = ((long)dx, (long)dy);
                slopeCounts[key] = slopeCounts.GetValueOrDefault(key) + 1;
                best = Math.Max(best, slopeCounts[key] + 1);
            }
        }

        return best;
    }

    private int Gcd(int a, int b) => b == 0 ? a : Gcd(b, a % b);
}
```

## Complexity

- **Time:** `O(n^2)` — for each point, compute slopes to every other point.
- **Space:** `O(n)` — for the slope-count dictionary.
