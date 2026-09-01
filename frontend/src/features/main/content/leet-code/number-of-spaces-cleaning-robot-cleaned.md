# 2061. Number of Spaces Cleaning Robot Cleaned

**Difficulty:** Medium
**Category:** Array, Matrix, Simulation
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

A room is represented by an `m x n` integer grid `room` where `0` means an empty space and `1` means an obstacle. A robot starts at `(0, 0)` facing right and cleans every space it visits. On each step, it tries to move one cell forward in its current direction; if that would leave the grid or hit an obstacle, it instead rotates 90 degrees clockwise in place (without moving) for that step. The robot stops as soon as it revisits a state it has already been in (same cell and same facing direction), because from then on its behavior repeats forever. Return the number of distinct spaces the robot cleaned.

### Example

`room = [[0,0,0],[1,1,0],[0,0,0]]` → the robot sweeps around the obstacle, cleaning cells until it returns to a previously-seen `(position, direction)` state; the total distinct cleaned cells is 7.

## Approach

Simulate directly. Track direction as an index into `{right, down, left, up}`. Maintain a `seen` bitmask per cell recording which directions the robot has faced while standing there; if the robot is about to repeat a `(cell, direction)` pair, the loop has closed and the simulation stops. Each time the robot moves into a previously unvisited cell, increment the cleaned-cell counter.

## C# Solution

```csharp
public class Solution 
{
    public int NumberOfCleanRooms(int[][] room) 
    {
        int[][] dirs = { new[] { 0, 1 }, new[] { 1, 0 }, new[] { 0, -1 }, new[] { -1, 0 } };
        int m = room.Length, n = room[0].Length;
        int ans = 1;
        int i = 0, j = 0, state = 0;
        var seen = new int[m, n];
        seen[i, j] |= 1 << state;
        room[i][j] = 2; // cleaned

        while (true)
        {
            int x = i + dirs[state][0];
            int y = j + dirs[state][1];

            if (x < 0 || x == m || y < 0 || y == n || room[x][y] == 1)
            {
                state = (state + 1) % 4;
            }
            else
            {
                if (room[x][y] == 0)
                {
                    ans++;
                    room[x][y] = 2;
                }
                i = x;
                j = y;
            }

            if ((seen[i, j] >> state & 1) == 1)
                return ans;
            seen[i, j] |= 1 << state;
        }
    }
}
```

## Complexity

- **Time:** O(m * n)
- **Space:** O(m * n)
