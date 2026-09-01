# 489. Robot Room Cleaner

**Difficulty:** Hard
**Category:** Backtracking, Interactive
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a robot cleaner in an unknown room (represented by a grid with obstacles, though the robot has no knowledge of the map), control the robot using its four supported API calls — `Move()`, `TurnLeft()`, `TurnRight()`, and `Clean()` — to clean the entire room.

### Example

```
Input: room = [[1,1,1],[1,1,1],[1,0,1],[1,1,1]], row = 1, col = 3
Output: All accessible cells are cleaned.
```

## Approach

Perform a depth-first search over the robot's actual physical position, tracked internally using relative coordinates and a facing direction (since the robot itself has no map). At each cell, clean it, mark it visited, and try all four directions; before moving into an unvisited neighboring cell, rotate the robot to face that direction, and only recurse if the move succeeds (no obstacle). After fully exploring a branch, always backtrack by turning the robot 180 degrees, moving back to the previous cell, and turning back 180 degrees again to restore the original facing direction.

## C# Solution

```csharp
public class Solution
{
    private readonly int[][] directions = { new[] { -1, 0 }, new[] { 0, 1 }, new[] { 1, 0 }, new[] { 0, -1 } };
    private readonly HashSet<(int, int)> visited = new();

    public void CleanRoom(Robot robot)
    {
        Dfs(robot, 0, 0, 0);
    }

    private void Dfs(Robot robot, int row, int col, int direction)
    {
        visited.Add((row, col));
        robot.Clean();

        for (int i = 0; i < 4; i++)
        {
            int newDirection = (direction + i) % 4;
            int newRow = row + directions[newDirection][0];
            int newCol = col + directions[newDirection][1];

            if (!visited.Contains((newRow, newCol)) && robot.Move())
            {
                Dfs(robot, newRow, newCol, newDirection);
                GoBack(robot);
            }
        }
    }

    private void GoBack(Robot robot)
    {
        robot.TurnRight();
        robot.TurnRight();
        robot.Move();
        robot.TurnRight();
        robot.TurnRight();
    }
}
```

## Complexity

- **Time:** `O(cells)`, where `cells` is the number of accessible cells in the room.
- **Space:** `O(cells)` for the visited set and recursion stack.
