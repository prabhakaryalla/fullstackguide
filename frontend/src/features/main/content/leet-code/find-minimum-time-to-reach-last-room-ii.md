# 3342. Find Minimum Time to Reach Last Room II

**Difficulty:** Medium
**Category:** Array, Graph, Heap (Priority Queue), Matrix, Shortest Path

## Problem

There is a dungeon with `n x m` rooms. `moveTime[i][j]` is the earliest time room `(i, j)` can be entered. Starting from `(0, 0)` at time `t = 0`, moving between adjacent rooms alternates between costing 1 second and 2 seconds (the first move costs 1, the second costs 2, the third costs 1, and so on).

Return the minimum time to reach room `(n - 1, m - 1)`.

### Example

Input: `moveTime = [[0,4],[4,4]]`

Output: `7`

Explanation: Move to `(1,0)` at cost 1 (waiting until t=4, arriving at t=5), then to `(1,1)` at cost 2 (arriving at t=7).

## Approach

This is the same shortest-path problem as Part I, but the cost of each move alternates between 1 and 2 depending on how many moves have already been made. Track an extra state bit for the parity of the number of moves made so far, so the state becomes `(row, col, parity)`.

When moving from a state with parity `p` (meaning `p` moves have been made mod 2), the cost of this next move is `1` if `p == 0`, or `2` if `p == 1`, and the new parity becomes `1 - p`. Run Dijkstra over this expanded state space, and the answer is the minimum time to reach `(n-1, m-1)` in either parity.

## C# Solution

```csharp
public class Solution 
{
    public int MinTimeToReach(int[][] moveTime) 
    {
        int n = moveTime.Length, m = moveTime[0].Length;
        long[,,] dist = new long[n, m, 2];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++)
                for (int p = 0; p < 2; p++)
                    dist[i, j, p] = long.MaxValue;

        dist[0, 0, 0] = 0;
        var pq = new PriorityQueue<(int r, int c, int p), long>();
        pq.Enqueue((0, 0, 0), 0);

        int[] dr = { 1, -1, 0, 0 };
        int[] dc = { 0, 0, 1, -1 };

        while (pq.Count > 0)
        {
            pq.TryDequeue(out var cur, out long time);
            if (time > dist[cur.r, cur.c, cur.p]) continue;
            if (cur.r == n - 1 && cur.c == m - 1) return (int)time;

            long cost = cur.p == 0 ? 1 : 2;
            int np = 1 - cur.p;

            for (int d = 0; d < 4; d++)
            {
                int nr = cur.r + dr[d], nc = cur.c + dc[d];
                if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue;

                long arrival = Math.Max(time, moveTime[nr][nc]) + cost;
                if (arrival < dist[nr, nc, np])
                {
                    dist[nr, nc, np] = arrival;
                    pq.Enqueue((nr, nc, np), arrival);
                }
            }
        }

        return (int)Math.Min(dist[n - 1, m - 1, 0], dist[n - 1, m - 1, 1]);
    }
}
```

## Complexity

- **Time:** O(n * m * log(n * m)) using Dijkstra over the doubled state space.
- **Space:** O(n * m) for distances and the priority queue.
