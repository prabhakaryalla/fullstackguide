# 1654. Minimum Jumps to Reach Home

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Breadth-First Search

## Problem

A grasshopper starts at position `0` on an infinite number line and wants to reach position `x`. Each jump either moves forward `a` units or backward `b` units, but it cannot jump backward twice in a row, cannot land on any position in `forbidden`, and cannot go to a negative position. Return the minimum number of jumps to reach `x`, or `-1` if impossible.

### Example

```
Input: forbidden = [14,4,18,1,15], a = 3, b = 15, x = 9
Output: 3
```

## Approach

BFS over states `(position, justJumpedBackward)`, since whether the last jump was backward affects which moves are legal next. Bound the search space (positions beyond a safe limit derived from `x`, the forbidden positions, and `a + b` can never help), and track visited `(position, direction)` pairs to avoid revisiting. The first time `x` is dequeued gives the minimum jump count.

## C# Solution

```csharp
public class Solution
{
    public int MinimumJumps(int[] forbidden, int a, int b, int x)
    {
        HashSet<int> forbiddenSet = new HashSet<int>(forbidden);
        int limit = Math.Max(x, forbidden.Length > 0 ? forbidden.Max() : 0) + a + b + 1;
        bool[,] visited = new bool[limit + 1, 2];
        Queue<(int Pos, int Steps, bool BackJumped)> queue = new Queue<(int, int, bool)>();
        queue.Enqueue((0, 0, false));
        visited[0, 0] = true;

        while (queue.Count > 0)
        {
            var (pos, steps, backJumped) = queue.Dequeue();

            if (pos == x)
            {
                return steps;
            }

            int forward = pos + a;

            if (forward <= limit && !forbiddenSet.Contains(forward) && !visited[forward, 0])
            {
                visited[forward, 0] = true;
                queue.Enqueue((forward, steps + 1, false));
            }

            int backward = pos - b;

            if (!backJumped && backward >= 0 && !forbiddenSet.Contains(backward) && !visited[backward, 1])
            {
                visited[backward, 1] = true;
                queue.Enqueue((backward, steps + 1, true));
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(limit)`, where `limit` bounds the reachable search space.
- **Space:** `O(limit)` for the visited array.
