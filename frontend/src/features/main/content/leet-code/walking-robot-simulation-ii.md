# 2069. Walking Robot Simulation II

**Difficulty:** Medium
**Category:** Design, Simulation, Math

## Problem

Design a robot that walks clockwise along the perimeter of a `width x height` rectangular grid, starting at `(0, 0)` facing East. Implement the `Robot` class:

- `Step(int num)` — moves the robot `num` steps clockwise along the boundary.
- `GetPos()` — returns the robot's current `[x, y]` position.
- `GetDir()` — returns the robot's current facing direction (`"East"`, `"North"`, `"West"`, or `"South"`).

If the robot ever completes a full loop back to `(0, 0)` (after having moved at least once), it stops there permanently, facing `"South"`, and all further `Step` calls have no effect on its position or direction.

## Approach

Track the total cumulative number of steps taken (as a running sum, not resetting between calls). To resolve the current position and direction on demand, take that cumulative value modulo the perimeter length `2 * (width + height)`. If the result is `0`, the robot is at the origin: report `"East"` only if it has never moved at all (cumulative == 0), otherwise report `"South"` (it just completed one or more full loops). Otherwise, walk through the four sides of the rectangle (East side, North side, West side, South side) in order, subtracting each side's length from the effective step count until landing on the side that contains the current position, and compute the coordinates accordingly.

## C# Solution

```csharp
public class Robot
{
    private readonly int width;
    private readonly int height;
    private long cumulative;

    public Robot(int width, int height)
    {
        this.width = width;
        this.height = height;
        cumulative = 0;
    }

    public void Step(int num)
    {
        cumulative += num;
    }

    public int[] GetPos()
    {
        var (x, y, _) = Resolve();
        return new[] { x, y };
    }

    public string GetDir()
    {
        var (_, _, dir) = Resolve();
        return dir;
    }

    private (int x, int y, string dir) Resolve()
    {
        long perimeter = 2L * (width + height);
        long effective = cumulative % perimeter;

        if (effective == 0)
            return cumulative == 0 ? (0, 0, "East") : (0, 0, "South");

        if (effective <= width)
            return ((int)effective, 0, "East");

        effective -= width;
        if (effective <= height)
            return (width, (int)effective, "North");

        effective -= height;
        if (effective <= width)
            return (width - (int)effective, height, "West");

        effective -= width;
        return (0, height - (int)effective, "South");
    }
}
```

## Complexity

- **Time:** `O(1)` per operation.
- **Space:** `O(1)`.
