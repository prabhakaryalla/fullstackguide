# 478. Generate Random Point in a Circle

**Difficulty:** Medium
**Category:** Math, Randomization, Geometry

## Problem

Given the radius and the position of the center of a circle, implement the `Solution` class with `RandPoint()`, returning a uniformly random point inside the circle.

### Example

```
Input:
["Solution", "randPoint", "randPoint", "randPoint"]
[[1.0, 0.0, 0.0], [], [], []]
Output:
[null, [-0.02, -0.5], [0.16, 0.76], [0.94, 0.31]] (values may vary)
```

### Constraints

- `0 < radius <= 10^8`
- `-10^7 <= x_center, y_center <= 10^7`
- At most `3 * 10^4` calls will be made to `RandPoint`.

## Approach

Generate a uniformly random angle in `[0, 2π)`. For the radius, naively picking a uniform value in `[0, radius]` would bias points toward the center (since area scales with the square of the radius), so instead take the square root of a uniform value in `[0, 1)` scaled by `radius`, which correctly distributes points uniformly across the circle's area. Convert the resulting polar coordinates to Cartesian and offset by the circle's center.

## C# Solution

```csharp
public class Solution
{
    private readonly double radius, xCenter, yCenter;
    private readonly Random random = new();

    public Solution(double radius, double x_center, double y_center)
    {
        this.radius = radius;
        xCenter = x_center;
        yCenter = y_center;
    }

    public double[] RandPoint()
    {
        double angle = random.NextDouble() * 2 * Math.PI;
        double r = radius * Math.Sqrt(random.NextDouble());

        return new[] { xCenter + r * Math.Cos(angle), yCenter + r * Math.Sin(angle) };
    }
}
```

## Complexity

- **Time:** `O(1)` per `RandPoint` call.
- **Space:** `O(1)`.
