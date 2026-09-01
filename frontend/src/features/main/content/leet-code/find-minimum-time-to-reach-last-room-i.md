# 3341. Find Minimum Time to Reach Last Room I

**Difficulty:** Medium
**Category:** Array, Graph, Heap (Priority Queue), Matrix, Shortest Path

## Problem

There is a dungeon with `n x m` rooms in a grid. `moveTime[i][j]` is the earliest time at which room `(i, j)` opens and can be entered. You start at `(0, 0)` at time `t = 0`, and moving to an adjacent room (sharing a wall) takes exactly 1 second.

Return the minimum time to reach room `(n - 1, m - 1)`.

### Example

Input: `moveTime = [[0,4],[4,4]]`

Output: `6`

Explanation: Reach `(1,0)` at time 4 (waiting until it opens), then `(1,1)` at time 5, wait — actually reaching (1,1) requires it be open at time >= 4, arriving at 5; but the minimum overall path total is 6 via one of the two symmetric paths.

## Approach

This is a shortest-path problem on a grid where the "distance" to enter a neighboring room is `max(currentTime, moveTime[neighbor]) + 1` (you must wait for the room to open if you arrive early). Run Dijkstra's algorithm starting from `(0,0)` with initial time 0, always expanding the room with the smallest known arrival time next, and return the computed time for `(n-1, m-1)`.

## C# Solution

```csharp
public class Solution 
{
    public int MinTimeToReach(int[][] moveTime) 
    {
        int n = moveTime.Length, m = moveTime[0].Length;
        long[,] dist = new long[n, m];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++)
                dist[i, j] = long.MaxValue;

        dist[0, 0] = 0;
        var pq = new PriorityQueue<(int r, int c), long>();
        pq.Enqueue((0, 0), 0);

        int[] dr = { 1, -1, 0, 0 };
        int[] dc = { 0, 0, 1, -1 };

        while (pq.Count > 0)
        {
            pq.TryDequeue(out var cur, out long time);
            if (time > dist[cur.r, cur.c]) continue;
            if (cur.r == n - 1 && cur.c == m - 1) return (int)time;

            for (int d = 0; d < 4; d++)
            {
                int nr = cur.r + dr[d], nc = cur.c + dc[d];
                if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue;

                long arrival = Math.Max(time, moveTime[nr][nc]) + 1;
                if (arrival < dist[nr, nc])
                {
                    dist[nr, nc] = arrival;
                    pq.Enqueue((nr, nc), arrival);
                }
            }
        }

        return (int)dist[n - 1, m - 1];
    }
}
```

## Complexity

- **Time:** O(n * m * log(n * m)) using Dijkstra with a binary heap.
- **Space:** O(n * m) for the distance array and priority queue.
