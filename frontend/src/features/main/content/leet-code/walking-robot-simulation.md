# 874. Walking Robot Simulation

**Difficulty:** Medium
**Category:** Array, Hash Table, Simulation

## Problem

A robot starts at `(0, 0)` facing north and executes a sequence of `commands`: `-2` turns left 90 degrees, `-1` turns right 90 degrees, and a positive number moves that many units forward (stopping just before any obstacle from `obstacles`). Return the maximum squared Euclidean distance from the origin reached at any point.

### Example

```
Input: commands = [4,-1,3], obstacles = []
Output: 25
```

## Approach

Store obstacles in a hash set for O(1) lookup. Track the current position and facing direction (as an index into a fixed array of 4 direction vectors, rotating the index on turn commands). For move commands, step forward one unit at a time, stopping early if the next cell is an obstacle, and update the maximum squared distance after each successful step.

## C# Solution

```csharp
public class Solution
{
    public int RobotSim(int[] commands, int[][] obstacles)
    {
        var obstacleSet = new HashSet<(int, int)>();
        foreach (var obs in obstacles)
            obstacleSet.Add((obs[0], obs[1]));

        int[] dx = { 0, 1, 0, -1 };
        int[] dy = { 1, 0, -1, 0 };
        int dir = 0;
        int x = 0, y = 0;
        int maxDistSquared = 0;

        foreach (var command in commands)
        {
            if (command == -2)
            {
                dir = (dir + 3) % 4;
            }
            else if (command == -1)
            {
                dir = (dir + 1) % 4;
            }
            else
            {
                for (int step = 0; step < command; step++)
                {
                    int nx = x + dx[dir];
                    int ny = y + dy[dir];

                    if (obstacleSet.Contains((nx, ny))) break;

                    x = nx;
                    y = ny;
                    maxDistSquared = Math.Max(maxDistSquared, x * x + y * y);
                }
            }
        }

        return maxDistSquared;
    }
}
```

## Complexity

- **Time:** `O(total steps + obstacles)`.
- **Space:** `O(obstacles)` for the obstacle set.
