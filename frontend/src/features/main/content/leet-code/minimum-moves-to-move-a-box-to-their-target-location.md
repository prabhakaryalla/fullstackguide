# 1263. Minimum Moves to Move a Box to Their Target Location

**Difficulty:** Hard
**Category:** Array, Breadth-First Search, Matrix

## Problem

Given a grid with a player (`S`), a box (`B`), a target (`T`), walls (`#`), and empty floor (`.`), the player can move one step at a time and pushes the box by walking into it from the opposite side. Return the minimum number of box pushes required to move the box onto the target, or `-1` if impossible.

### Example

```
Input: grid = [["#","#","#","#","#","#"],
               ["#","T","#","#","#","#"],
               ["#",".",".","B",".","#"],
               ["#",".","#","#",".","#"],
               ["#",".",".",".","S","#"],
               ["#","#","#","#","#","#"]]
Output: 3
```

## Approach

Run a BFS whose state is `(boxPosition, playerPosition)`, layered by number of pushes so far. From each state, try pushing the box in all four directions: a push in a given direction is legal only if both the box's destination cell and the cell directly opposite the box (where the player must stand to perform the push) are free, *and* the player can actually walk there from their current position without moving the box — which itself requires a small inner BFS treating the box as a temporary wall. Each successful push advances to a new state with one more push counted; stop once the box reaches the target.

## C# Solution

```csharp
public class Solution
{
    public int MinPushBox(char[][] grid)
    {
        int rows = grid.Length, cols = grid[0].Length;
        (int r, int c) box = default, person = default, target = default;

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (grid[r][c] == 'B') box = (r, c);
                else if (grid[r][c] == 'S') person = (r, c);
                else if (grid[r][c] == 'T') target = (r, c);
            }
        }

        bool IsWall(int r, int c) => r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] == '#';

        var visited = new HashSet<(int, int, int, int)> { (box.r, box.c, person.r, person.c) };
        var queue = new Queue<(int BoxR, int BoxC, int PersonR, int PersonC, int Pushes)>();
        queue.Enqueue((box.r, box.c, person.r, person.c, 0));

        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };

        while (queue.Count > 0)
        {
            var (boxR, boxC, personR, personC, pushes) = queue.Dequeue();

            if (boxR == target.r && boxC == target.c) return pushes;

            for (int d = 0; d < 4; d++)
            {
                int newBoxR = boxR + dr[d], newBoxC = boxC + dc[d];
                int pushFromR = boxR - dr[d], pushFromC = boxC - dc[d];

                if (IsWall(newBoxR, newBoxC) || IsWall(pushFromR, pushFromC)) continue;
                if (!CanReach(grid, personR, personC, pushFromR, pushFromC, boxR, boxC)) continue;

                var state = (newBoxR, newBoxC, boxR, boxC);
                if (visited.Add(state))
                    queue.Enqueue((newBoxR, newBoxC, boxR, boxC, pushes + 1));
            }
        }

        return -1;
    }

    private bool CanReach(char[][] grid, int startR, int startC, int targetR, int targetC, int boxR, int boxC)
    {
        int rows = grid.Length, cols = grid[0].Length;
        bool IsBlocked(int r, int c) =>
            r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] == '#' || (r == boxR && c == boxC);

        if (IsBlocked(targetR, targetC)) return false;
        if (startR == targetR && startC == targetC) return true;

        var visited = new bool[rows, cols];
        visited[startR, startC] = true;
        var queue = new Queue<(int, int)>();
        queue.Enqueue((startR, startC));

        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };

        while (queue.Count > 0)
        {
            var (r, c) = queue.Dequeue();
            for (int d = 0; d < 4; d++)
            {
                int nr = r + dr[d], nc = c + dc[d];
                if (IsBlocked(nr, nc) || visited[nr, nc]) continue;
                if (nr == targetR && nc == targetC) return true;
                visited[nr, nc] = true;
                queue.Enqueue((nr, nc));
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O((rows * cols)^2)` in the worst case, due to the inner reachability BFS run per outer state.
- **Space:** `O(rows * cols)`.
