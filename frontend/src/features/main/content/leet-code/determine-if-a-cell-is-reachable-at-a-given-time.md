# 2849. Determine if a Cell Is Reachable at a Given Time

**Difficulty:** Medium
**Category:** Math

## Problem

You are given four integers sx, sy, fx, fy, and a non-negative integer t.

In an infinite 2D grid, you start at the cell (sx, sy). Each second, you can move to any of the 8 adjacent cells (including diagonals).

Return true if you can reach the cell (fx, fy) in exactly t seconds, otherwise return false.

### Example

```
Input: sx = 2, sy = 4, fx = 7, fy = 7, t = 6
Output: true
Explanation: We can reach (7,7) from (2,4) in exactly 6 seconds using diagonal moves
```

## Approach

The minimum number of moves to go from (sx, sy) to (fx, fy) is the Chebyshev distance, which is:
`max(|fx - sx|, |fy - sy|)`

This is because we can move diagonally, so we move diagonally as much as possible, then move horizontally or vertically for the remaining distance.

Once we can reach the target in minMoves steps, we can reach it in any number of steps >= minMoves by "wasting" moves (going away and coming back, or moving in circles).

There's one special case: if we're already at the target (minMoves = 0) and t = 1, we cannot stay in place for exactly 1 second (we must move), so return false.

## C# Solution

```csharp
public class Solution
{
    public bool IsReachableAtTime(int sx, int sy, int fx, int fy, int t)
    {
        int dx = Math.Abs(fx - sx);
        int dy = Math.Abs(fy - sy);
        
        int minMoves = Math.Max(dx, dy);
        
        // Special case: already at target
        if (minMoves == 0)
        {
            // If we need exactly 1 second, we cannot stay in place
            return t != 1;
        }
        
        // We can reach in minMoves or more seconds
        return t >= minMoves;
    }
}
```

## Complexity

- **Time:** O(1) for computing the distance
- **Space:** O(1) for auxiliary variables
