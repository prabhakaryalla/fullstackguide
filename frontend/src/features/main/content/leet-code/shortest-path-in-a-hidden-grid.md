# 1778. Shortest Path in a Hidden Grid

**Difficulty:** Medium
**Category:** Array, Depth-First Search, Breadth-First Search, Interactive

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a `GridMaster` object (interactive API) representing a hidden grid with a robot starting at an unknown position and a target cell somewhere else. `GridMaster.canMove(direction)` reports whether a move is legal, `GridMaster.move(direction)` moves the robot (only if legal) and returns whether the destination is the target, and `GridMaster.isTarget()` reports whether the robot's current cell is the target. Return the length of the shortest path from the start to the target, or `-1` if unreachable.

### Example

```
Input: grid = [[0,0,0],[0,1,0],[1,0,0]]
Output: 2
```

## Approach

First, explore the entire reachable grid with a backtracking depth-first search: at every cell, try each direction via `canMove`, physically move with `move`, recurse, then move back (the inverse direction) to restore the robot's position. Record every visited cell's coordinates locally and remember which one satisfies `isTarget()`. Once the local map is fully built, run an ordinary breadth-first search over the recorded cells from the start to the discovered target to get the shortest path length.

## C# Solution

```csharp
public class Solution
{
    private static readonly char[] Dirs = { 'U', 'D', 'L', 'R' };
    private static readonly Dictionary<char, (int dr, int dc, char back)> Moves = new()
    {
        ['U'] = (-1, 0, 'D'),
        ['D'] = (1, 0, 'U'),
        ['L'] = (0, -1, 'R'),
        ['R'] = (0, 1, 'L'),
    };

    public int FindShortestPath(GridMaster master)
    {
        var visited = new HashSet<(int, int)>();
        (int, int) target = (int.MinValue, int.MinValue);

        void Dfs(int r, int c)
        {
            if (master.isTarget()) target = (r, c);
            visited.Add((r, c));

            foreach (char d in Dirs)
            {
                var (dr, dc, back) = Moves[d];
                var next = (r + dr, c + dc);
                if (visited.Contains(next) || !master.canMove(d)) continue;

                master.move(d);
                Dfs(next.Item1, next.Item2);
                master.move(back);
            }
        }

        Dfs(0, 0);
        if (target.Item1 == int.MinValue) return -1;

        var queue = new Queue<(int r, int c, int dist)>();
        var bfsVisited = new HashSet<(int, int)> { (0, 0) };
        queue.Enqueue((0, 0, 0));

        while (queue.Count > 0)
        {
            var (r, c, dist) = queue.Dequeue();
            if ((r, c) == target) return dist;

            foreach (char d in Dirs)
            {
                var (dr, dc, _) = Moves[d];
                var next = (r + dr, c + dc);
                if (!visited.Contains(next) || bfsVisited.Contains(next)) continue;

                bfsVisited.Add(next);
                queue.Enqueue((next.Item1, next.Item2, dist + 1));
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(V)` where `V` is the number of reachable cells (each explored a constant number of times).
- **Space:** `O(V)` for the visited map and BFS queue.
