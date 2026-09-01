# 1610. Maximum Number of Visible Points

**Difficulty:** Hard
**Category:** Array, Math, Geometry, Sorting, Sliding Window

## Problem

Given a list of visible points on a 2D plane, your current `location`, and an `angle` (field of view width in degrees), return the maximum number of points you can see by rotating your field of view (you may include a point that coincides exactly with your location).

### Example

```
Input: points = [[2,1],[2,2],[3,3]], angle = 90, location = [1,1]
Output: 3
```

## Approach

Count points that coincide with `location` separately (always visible). For the rest, compute the angle (in degrees) of each point relative to `location` using `Math.Atan2`, sort the angles, and duplicate the list shifted by 360 degrees to handle wraparound. Slide a window over the sorted, duplicated angles to find the maximum count of angles spanning at most `angle` degrees, then add back the coincident-point count.

## C# Solution

```csharp
public class Solution
{
    public int VisiblePoints(IList<IList<int>> points, int angle, IList<int> location)
    {
        List<double> angles = new List<double>();
        int samePoint = 0;

        foreach (var point in points)
        {
            int dx = point[0] - location[0];
            int dy = point[1] - location[1];

            if (dx == 0 && dy == 0)
            {
                samePoint++;
                continue;
            }

            angles.Add(Math.Atan2(dy, dx) * 180.0 / Math.PI);
        }

        angles.Sort();
        int n = angles.Count;

        for (int i = 0; i < n; i++)
        {
            angles.Add(angles[i] + 360.0);
        }

        int best = 0;
        int left = 0;

        for (int right = 0; right < angles.Count; right++)
        {
            while (angles[right] - angles[left] > angle)
            {
                left++;
            }

            best = Math.Max(best, right - left + 1);
        }

        return Math.Min(best, n) + samePoint;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for sorting the angles.
- **Space:** `O(n)` for the duplicated angle list.
