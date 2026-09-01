# 447. Number of Boomerangs

**Difficulty:** Medium
**Category:** Array, Hash Table, Math

## Problem

Given `n` points on a 2D plane, a boomerang is a tuple of points `(i, j, k)` such that the distance between `i` and `j` equals the distance between `i` and `k` (the order of the tuple matters). Return the number of boomerangs.

### Example

```
Input: points = [[0,0],[1,0],[2,0]]
Output: 2
```

### Constraints

- `n == points.length`
- `1 <= n <= 500`
- `-10^4 <= xi, yi <= 10^4`

## Approach

For each point, compute the squared distance to every other point (avoiding a costly square root) and group points by that distance in a dictionary. For a group of `k` points equidistant from the fixed point, any ordered pair among them forms a valid boomerang, contributing `k * (k - 1)` to the total.

## C# Solution

```csharp
public class Solution
{
    public int NumberOfBoomerangs(int[][] points)
    {
        int count = 0;

        foreach (var p1 in points)
        {
            var distanceCounts = new Dictionary<int, int>();

            foreach (var p2 in points)
            {
                if (p1 == p2) continue;

                int dx = p1[0] - p2[0];
                int dy = p1[1] - p2[1];
                int distSquared = dx * dx + dy * dy;

                distanceCounts[distSquared] = distanceCounts.GetValueOrDefault(distSquared) + 1;
            }

            foreach (var value in distanceCounts.Values)
                count += value * (value - 1);
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n)` for the per-point distance map.
