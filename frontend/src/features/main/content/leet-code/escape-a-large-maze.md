# 1036. Escape a Large Maze

**Difficulty:** Hard
**Category:** Array, Hash Table, Depth-First Search, Breadth-First Search

## Problem

In a `10^6 x 10^6` grid, some cells are blocked (given as a small list `blocked`, at most `200` cells). Given a `source` and a `target` cell, return `true` if it's possible to reach `target` from `source` without stepping on a blocked cell.

### Example

```
Input: blocked = [], source = [0,0], target = [999999,999999]
Output: true
```

## Approach

The grid is far too large to search directly, but with at most `200` blocked cells, the largest area they can fully enclose is bounded — at most `blocked.Length * (blocked.Length - 1) / 2` cells (the biggest triangle their positions can wall off). So run a BFS from `source` capped at exploring that many cells: if BFS reaches `target`, success; if BFS explores more cells than the cap without finding `target`, the region isn't actually enclosed, meaning it's not blocked in that direction. Run this capped BFS both from `source` toward `target` and from `target` toward `source` — both directions must confirm the path isn't trapped for the answer to be `true`.

## C# Solution

```csharp
public class Solution
{
    private const int Bound = 1_000_000;

    public bool IsEscapePossible(int[][] blocked, int[] source, int[] target)
    {
        var blockedSet = new HashSet<long>();
        foreach (var b in blocked) blockedSet.Add(Encode(b[0], b[1]));

        int limit = blocked.Length < 2 ? Bound * Bound : blocked.Length * (blocked.Length - 1) / 2;

        return Bfs(source, target, blockedSet, limit) && Bfs(target, source, blockedSet, limit);
    }

    private bool Bfs(int[] start, int[] end, HashSet<long> blocked, int limit)
    {
        var visited = new HashSet<long>();
        var queue = new Queue<(int r, int c)>();
        queue.Enqueue((start[0], start[1]));
        visited.Add(Encode(start[0], start[1]));

        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };

        while (queue.Count > 0)
        {
            var (r, c) = queue.Dequeue();
            if (r == end[0] && c == end[1]) return true;

            for (int d = 0; d < 4; d++)
            {
                int nr = r + dr[d], nc = c + dc[d];
                if (nr < 0 || nr >= Bound || nc < 0 || nc >= Bound) continue;

                long key = Encode(nr, nc);
                if (blocked.Contains(key) || visited.Contains(key)) continue;

                visited.Add(key);
                queue.Enqueue((nr, nc));

                if (visited.Count > limit) return true;
            }
        }

        return false;
    }

    private long Encode(int r, int c) => (long)r * Bound + c;
}
```

## Complexity

- **Time:** `O(blocked.Length^4)` bounded by the capped BFS area.
- **Space:** `O(blocked.Length^2)` for the visited sets.
