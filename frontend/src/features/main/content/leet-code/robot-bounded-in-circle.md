# 1041. Robot Bounded In Circle

**Difficulty:** Medium
**Category:** Math, String, Simulation

## Problem

A robot starts at `(0, 0)` facing north and repeatedly executes the string `instructions`, which contains `'G'` (move forward), `'L'` (turn 90° left), and `'R'` (turn 90° right). Return `true` if the robot stays within a bounded circular region forever.

### Example

```
Input: instructions = "GGLLGG"
Output: true
```

## Approach

Simulate exactly one pass through `instructions`, tracking position and facing direction (as an index into North/East/South/West). After one cycle, the robot is bounded forever if either it returned to the origin, or it ended up facing a different direction than north — because then repeating the cycle traces out a closed polygon (at most 4 repetitions bring it back to the start). If it ends at a non-origin point while still facing north, each repetition just walks further in a straight line forever, which is unbounded.

## C# Solution

```csharp
public class Solution
{
    public bool IsRobotBounded(string instructions)
    {
        int x = 0, y = 0;
        int dirIndex = 0; // 0:N, 1:E, 2:S, 3:W
        int[] dx = { 0, 1, 0, -1 };
        int[] dy = { 1, 0, -1, 0 };

        foreach (var c in instructions)
        {
            switch (c)
            {
                case 'G':
                    x += dx[dirIndex];
                    y += dy[dirIndex];
                    break;
                case 'L':
                    dirIndex = (dirIndex + 3) % 4;
                    break;
                case 'R':
                    dirIndex = (dirIndex + 1) % 4;
                    break;
            }
        }

        return (x == 0 && y == 0) || dirIndex != 0;
    }
}
```

## Complexity

- **Time:** `O(n)` — one pass through the instructions.
- **Space:** `O(1)`.
