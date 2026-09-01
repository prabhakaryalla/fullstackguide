# 2543. Check if Point Is Reachable

**Difficulty:** Hard
**Category:** Math, Number Theory

## Problem

There is an infinite 2D grid with the top-left cell at coordinates `(1, 1)` and the cell at `(targetX, targetY)`.

You start at `(1, 1)` and can move to the following cells:
- `(x, y) -> (x + y, y)`
- `(x, y) -> (x, y + x)`

Return `true` if you can reach the cell at `(targetX, targetY)`, otherwise return `false`.

### Example

```
Input: targetX = 6, targetY = 9
Output: false

Input: targetX = 4, targetY = 7
Output: true
Explanation: (1,1) -> (1,2) -> (3,2) -> (3,5) -> (3,7) -> (4,7)
```

## Approach

Work backwards from `(targetX, targetY)` to `(1, 1)`:
- If `targetX > targetY`: previous cell was `(targetX - targetY, targetY)`
- If `targetY > targetX`: previous cell was `(targetX, targetY - targetX)`

This is equivalent to the Euclidean GCD algorithm. The point is reachable if and only if `gcd(targetX, targetY)` is a power of 2.

Why? The moves preserve certain properties related to factors. Only power-of-2 GCDs can be reached starting from `(1, 1)`.

## C# Solution

```csharp
public class Solution
{
    public bool IsReachable(int targetX, int targetY)
    {
        int g = Gcd(targetX, targetY);
        
        // Check if g is a power of 2
        return (g & (g - 1)) == 0;
    }
    
    private int Gcd(int a, int b)
    {
        while (b != 0)
        {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}
```

## Complexity

- **Time:** O(log(min(targetX, targetY))) for GCD
- **Space:** O(1)
