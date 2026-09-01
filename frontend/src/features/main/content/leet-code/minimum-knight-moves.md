# 1197. Minimum Knight Moves

**Difficulty:** Medium
**Category:** Breadth-First Search, Math

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

On an infinite chessboard, a knight starts at `(0, 0)`. Given a target cell `(x, y)`, return the minimum number of knight moves needed to reach it.

### Example

```
Input: x = 2, y = 1
Output: 1
```

## Approach

The board is symmetric across both axes, so the target can be treated as `(|x|, |y|)` without loss of generality. Run a standard BFS from the origin, exploring all eight knight move offsets at each step, while pruning the search space to a small margin around the (non-negative) target region — since any optimal path to a point in the first quadrant never needs to wander far outside of it.

## C# Solution

```csharp
public class Solution
{
    public int MinKnightMoves(int x, int y)
    {
        x = Math.Abs(x);
        y = Math.Abs(y);

        var visited = new HashSet<(int, int)>();
        var queue = new Queue<(int x, int y, int dist)>();
        queue.Enqueue((0, 0, 0));
        visited.Add((0, 0));

        int[][] moves = {
            new[] { 1, 2 }, new[] { 2, 1 }, new[] { -1, 2 }, new[] { -2, 1 },
            new[] { 1, -2 }, new[] { 2, -1 }, new[] { -1, -2 }, new[] { -2, -1 }
        };

        while (queue.Count > 0)
        {
            var (cx, cy, dist) = queue.Dequeue();
            if (cx == x && cy == y) return dist;

            foreach (var move in moves)
            {
                int nx = cx + move[0], ny = cy + move[1];

                if (nx >= -2 && ny >= -2 && nx <= x + 2 && ny <= y + 2 && visited.Add((nx, ny)))
                {
                    queue.Enqueue((nx, ny, dist + 1));
                }
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(max(x, y)^2)` bounded by the pruned search region.
- **Space:** `O(max(x, y)^2)` for the visited set.
