# 657. Robot Return to Origin

**Difficulty:** Easy
**Category:** Array, String, Simulation

## Problem

Given a string `moves` representing a sequence of robot moves (`'U'`, `'D'`, `'L'`, `'R'`), return `true` if the robot returns to the origin `(0, 0)` after completing all moves.

### Example

```
Input: moves = "UD"
Output: true
```

### Constraints

- `1 <= moves.length <= 2 * 10^4`

## Approach

Track the robot's `x` and `y` coordinates, adjusting them by `±1` according to each move character. The robot returns to the origin exactly when both coordinates are `0` after processing every move.

## C# Solution

```csharp
public class Solution
{
    public bool JudgeCircle(string moves)
    {
        int x = 0, y = 0;

        foreach (var move in moves)
        {
            switch (move)
            {
                case 'U': y++; break;
                case 'D': y--; break;
                case 'L': x--; break;
                case 'R': x++; break;
            }
        }

        return x == 0 && y == 0;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
