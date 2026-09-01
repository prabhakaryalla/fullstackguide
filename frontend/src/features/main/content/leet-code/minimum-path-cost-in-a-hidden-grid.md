# 1810. Minimum Path Cost in a Hidden Grid

**Difficulty:** Medium
**Category:** Depth-First Search, Breadth-First Search, Graph, Interactive

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

This is an interactive problem. You control a robot on a hidden `m x n` grid via a `GridMaster` object with `CanMove(char direction)`, `Move(char direction)` (returns the cost of the move, or you may assume it succeeds if `CanMove` was true), and `IsTarget()`. The robot starts at `(0, 0)` and must reach an unknown target cell. Return the minimum total cost to reach the target, or `-1` if it's unreachable.

## Approach

Since the grid and its edge costs are hidden, first fully explore the reachable cells with a DFS that moves in each of the four directions when possible, records the cost of entering each newly-discovered cell, remembers whether the target was found, and always backtracks (moves back) after exploring a neighbor so the robot returns to continue exploring other directions. Because move costs can differ per direction/cell and are not symmetric in general, once the full local map of reachable cells and entry costs is known, run Dijkstra's algorithm from `(0, 0)` over that discovered grid to find the minimum-cost path to the target.

## C# Solution

```csharp
// Assumes a GridMaster interface provided by the judge:
// bool CanMove(char direction); int Move(char direction); bool IsTarget();
public class Solution
{
    private readonly int[] _dx = { -1, 1, 0, 0 };
    private readonly int[] _dy = { 0, 0, -1, 1 };
    private readonly char[] _dirs = { 'U', 'D', 'L', 'R' };
    private readonly char[] _opposite = { 'D', 'U', 'R', 'L' };

    private readonly Dictionary<(int, int), int> _entryCost = new();
    private (int, int) _target = (int.MinValue, int.MinValue);

    public int FindShortestPath(GridMaster master)
    {
        _entryCost[(0, 0)] = 0;
        Dfs(master, 0, 0);

        if (_target.Item1 == int.MinValue) return -1;

        var dist = new Dictionary<(int, int), int> { [(0, 0)] = 0 };
        var pq = new PriorityQueue<(int x, int y), int>();
        pq.Enqueue((0, 0), 0);

        while (pq.Count > 0)
        {
            var (x, y) = pq.Dequeue();
            int d = dist[(x, y)];
            if ((x, y) == _target) return d;

            for (int dir = 0; dir < 4; dir++)
            {
                var next = (x + _dx[dir], y + _dy[dir]);
                if (!_entryCost.TryGetValue(next, out int cost)) continue;

                int nd = d + cost;
                if (!dist.TryGetValue(next, out int cur) || nd < cur)
                {
                    dist[next] = nd;
                    pq.Enqueue(next, nd);
                }
            }
        }

        return -1;
    }

    private void Dfs(GridMaster master, int x, int y)
    {
        if (master.IsTarget()) _target = (x, y);

        for (int d = 0; d < 4; d++)
        {
            var next = (x + _dx[d], y + _dy[d]);
            if (_entryCost.ContainsKey(next)) continue;

            if (master.CanMove(_dirs[d]))
            {
                int cost = master.Move(_dirs[d]);
                _entryCost[next] = cost;
                Dfs(master, next.Item1, next.Item2);
                master.Move(_opposite[d]);
            }
        }
    }
}
```

## Complexity

- **Time:** `O(V log V + E)` for the Dijkstra pass after an `O(V)` DFS exploration, where `V` is the number of reachable cells.
- **Space:** `O(V)` for the discovered map and shortest-path structures.
