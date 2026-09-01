# 780. Reaching Points

**Difficulty:** Hard
**Category:** Math

## Problem

Given a starting point `(sx, sy)` and a target point `(tx, ty)`, where each move transforms `(x, y)` into either `(x + y, y)` or `(x, x + y)`, return `true` if it's possible to reach `(tx, ty)` from `(sx, sy)` through a sequence of such moves.

### Example

```
Input: sx = 1, sy = 1, tx = 3, ty = 5
Output: true
```

## Approach

Work backwards from `(tx, ty)` toward `(sx, sy)`: reversing a move means subtracting the smaller coordinate from the larger one (since one of `tx > ty` or `ty > tx` must hold before reaching the source point, assuming they're not yet equal to the source). Rather than subtracting one step at a time, use the modulo operation to jump directly to the result of repeated subtraction. Stop reducing once neither coordinate exceeds its corresponding source coordinate, then check the remaining boundary cases directly: either both coordinates already match, or one matches exactly and the other differs by a multiple of it (representing several repeated backward moves along one axis).

## C# Solution

```csharp
public class Solution
{
    public bool ReachingPoints(int sx, int sy, int tx, int ty)
    {
        while (tx > sx && ty > sy)
        {
            if (tx > ty)
                tx %= ty;
            else
                ty %= tx;
        }

        if (tx == sx && ty == sy) return true;

        if (tx == sx && ty > sy && (ty - sy) % tx == 0) return true;

        if (ty == sy && tx > sx && (tx - sx) % ty == 0) return true;

        return false;
    }
}
```

## Complexity

- **Time:** `O(log(max(tx, ty)))`, due to the modulo-based reduction.
- **Space:** `O(1)`.
