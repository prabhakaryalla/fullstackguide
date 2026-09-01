# 1496. Path Crossing

**Difficulty:** Easy
**Category:** Array, Hash Table, String

## Problem

Given a string `path` of moves `'N'`, `'S'`, `'E'`, `'W'` starting at the origin `(0, 0)` on an infinite 2D plane, return `true` if the path crosses itself at any point (visits a previously visited coordinate, including returning to the start).

### Example

```
Input: path = "NES"
Output: false
```

## Approach

Track the current coordinate while walking the path, recording every visited coordinate (including the starting point) in a hash set. Before moving to the next position, check whether it has already been visited; if so, the path crosses itself.

## C# Solution

```csharp
public class Solution
{
    public bool IsPathCrossing(string path)
    {
        var visited = new HashSet<(int X, int Y)>();
        int x = 0, y = 0;
        visited.Add((0, 0));

        foreach (var c in path)
        {
            switch (c)
            {
                case 'N': y++; break;
                case 'S': y--; break;
                case 'E': x++; break;
                case 'W': x--; break;
            }

            if (!visited.Add((x, y))) return true;
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the visited set.
