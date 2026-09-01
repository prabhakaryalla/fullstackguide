# 3248. Snake in Matrix

**Difficulty:** Easy
**Category:** Array, Simulation, String

## Problem
A snake starts at cell (0,0) in an `n x n` grid (represented as a single index `row * n + col`) and follows a sequence of movement commands ("UP", "DOWN", "LEFT", "RIGHT"), each moving it one cell in that direction (guaranteed to always stay within bounds). Return the snake's final position as a single index.

## Approach
Maintain a running `(row, col)` position, initialized to `(0, 0)`. For each command, look up its corresponding row/column delta from a small direction map, and apply that delta to the current position. After processing all commands, convert the final `(row, col)` position back into a single index using `row * n + col`.

## C# Solution
```csharp
public class Solution {
    public int FinalPositionOfSnake(int n, IList<string> commands) {
        Dictionary<string, (int, int)> directions = new Dictionary<string, (int, int)> {
            { "UP", (-1, 0) },
            { "RIGHT", (0, 1) },
            { "DOWN", (1, 0) },
            { "LEFT", (0, -1) }
        };
        int i = 0, j = 0;

        foreach (string command in commands) {
            (int dx, int dy) = directions[command];
            i += dx;
            j += dy;
        }

        return i * n + j;
    }
}
```

## Complexity
- Time: O(|commands|)
- Space: O(1)
