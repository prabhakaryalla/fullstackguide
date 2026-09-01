# 1739. Building Boxes

**Difficulty:** Hard
**Category:** Math, Binary Search

## Problem

You have `n` cubic unit boxes to place in a corner of a room where two walls and the floor provide support. A box can only be placed if it is supported from below (by the floor or another box) and, unless it is on the floor, laterally by another box or a wall. Return the minimum number of boxes that must touch the floor.

### Example

```
Input: n = 3
Output: 3
```

## Approach

Filling boxes optimally from the corner outward forms nested "staircase pyramid" layers: a full pyramid of height `h` uses `h*(h+1)*(h+2)/6` boxes and has a triangular floor footprint of `h*(h+1)/2`. Find the largest complete pyramid height `h` that fits within `n`, then use the leftover boxes to extend the floor footprint by the smallest `d` such that `d*(d+1)/2` covers the remainder. The answer is the floor footprint of the full pyramid plus `d`.

## C# Solution

```csharp
public class Solution
{
    public int MinimumBoxes(int n)
    {
        int h = (int)Math.Cbrt(6.0 * n);
        while ((long)h * (h + 1) * (h + 2) > 6L * n) h--;
        while ((long)(h + 1) * (h + 2) * (h + 3) <= 6L * n) h++;

        n -= h * (h + 1) * (h + 2) / 6;

        int d = (int)Math.Ceiling((-1 + Math.Sqrt(1 + 8.0 * n)) / 2);
        while (d * (d + 1) / 2 < n) d++;

        return h * (h + 1) / 2 + d;
    }
}
```

## Complexity

- **Time:** `O(1)` (a few arithmetic operations and a small correction loop).
- **Space:** `O(1)`.
