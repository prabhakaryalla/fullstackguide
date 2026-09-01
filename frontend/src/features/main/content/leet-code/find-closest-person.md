# 3516. Find Closest Person

**Difficulty:** Easy
**Category:** Math

## Problem

Two people start at positions `x` and `y` on a number line and walk toward a target position `z` at the same speed. Return `1` if the person starting at `x` reaches `z` first, `2` if the person starting at `y` reaches `z` first, or `0` if they arrive at the same time.

### Example

```
Input: x = 2, y = 7, z = 4
Output: 1
Explanation: Distance from x to z is |4-2| = 2. Distance from y to z is |4-7| = 3. Person at x arrives first.
```

## Approach

Since both people move at the same speed, the one closer (by absolute distance) to `z` arrives first. Compare `|z - x|` and `|z - y|` directly.

## C# Solution

```csharp
public class Solution 
{
    public int FindClosest(int x, int y, int z) 
    {
        int distX = Math.Abs(z - x);
        int distY = Math.Abs(z - y);
        if (distX < distY) return 1;
        if (distY < distX) return 2;
        return 0;
    }
}
```

## Complexity

- **Time:** O(1).
- **Space:** O(1).
