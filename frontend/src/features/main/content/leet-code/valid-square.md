# 593. Valid Square

**Difficulty:** Medium
**Category:** Math, Geometry

## Problem

Given the coordinates of four points in 2D space `p1`, `p2`, `p3`, and `p4`, return `true` if they form a valid square (the four points may be given in any order).

### Example

```
Input: p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,1]
Output: true
```

### Constraints

- `p1.length == p2.length == p3.length == p4.length == 2`
- `-10^4 <= xi, yi <= 10^4`

## Approach

Compute the squared distance between every pair of the four points (6 pairs total), avoiding floating-point square roots. A valid square has exactly two distinct squared-distance values among these 6: the 4 equal side lengths, and the 2 equal diagonal lengths, where the diagonal is exactly twice the side length squared (from the Pythagorean theorem). Sort the 6 distances and verify this exact pattern, also rejecting degenerate cases where points coincide.

## C# Solution

```csharp
public class Solution
{
    public bool ValidSquare(int[] p1, int[] p2, int[] p3, int[] p4)
    {
        var points = new[] { p1, p2, p3, p4 };
        var distances = new List<long>();

        for (int i = 0; i < 4; i++)
        {
            for (int j = i + 1; j < 4; j++)
            {
                distances.Add(SquaredDistance(points[i], points[j]));
            }
        }

        distances.Sort();

        if (distances[0] == 0) return false;

        for (int i = 0; i < 4; i++)
            if (distances[i] != distances[0]) return false;

        for (int i = 4; i < 6; i++)
            if (distances[i] != 2 * distances[0]) return false;

        return true;
    }

    private long SquaredDistance(int[] a, int[] b)
    {
        long dx = a[0] - b[0];
        long dy = a[1] - b[1];
        return dx * dx + dy * dy;
    }
}
```

## Complexity

- **Time:** `O(1)` — a fixed number of pairwise distance computations.
- **Space:** `O(1)`.
