# 2045. Second Minimum Time to Reach Destination

**Difficulty:** Hard
**Category:** Breadth-First Search, Graph

## Problem

There is a bidirectionally connected graph of `n` vertices (numbered `1` to `n`), described by `edges`. Every vertex has a traffic signal that alternates between green and red every `change` minutes (starting green at time `0`); you may only enter an edge during a green light, but can wait at a vertex. Crossing any edge takes `time` minutes. Return *the **second minimum** time required to go from vertex `1` to vertex `n`* — the second minimum being strictly greater than the minimum, considering that a path may need to be retraced or take a different route.

## Approach

First, use a modified BFS to compute, for every vertex, both the shortest (`dist1`) and second-shortest (`dist2`) number of **edges** needed to reach it from vertex `1` (where `dist2[v]` must be strictly greater than `dist1[v]`, but need not come from a fully different path — revisiting the same edge back and forth also counts). During BFS, when relaxing an edge to a neighbor `v` with a new distance `nd`: if `v` hasn't been reached yet, set `dist1[v] = nd`; otherwise, if `nd != dist1[v]` and `dist2[v]` hasn't been set yet, set `dist2[v] = nd` (this will always be exactly `dist1[v] + 1`, since BFS processes distances in non-decreasing order).

Once we know `steps = dist2[n]` (the second-shortest number of edges), simulate the trip minute by minute: on each of the `steps` edges, if the current time falls within a "red" window (a full cycle is `2 * change`; red occupies the second half), wait until the next green window begins before adding `time` for the edge crossing.

## C# Solution

```csharp
public class Solution
{
    public int SecondMinimum(int n, int[][] edges, int time, int change)
    {
        var adj = new List<int>[n + 1];
        for (int i = 1; i <= n; i++) adj[i] = new List<int>();

        foreach (var e in edges)
        {
            adj[e[0]].Add(e[1]);
            adj[e[1]].Add(e[0]);
        }

        var dist1 = new int[n + 1];
        var dist2 = new int[n + 1];
        Array.Fill(dist1, -1);
        Array.Fill(dist2, -1);
        dist1[1] = 0;

        var queue = new Queue<(int node, int dist)>();
        queue.Enqueue((1, 0));

        while (queue.Count > 0)
        {
            var (u, d) = queue.Dequeue();
            foreach (var v in adj[u])
            {
                int nd = d + 1;
                if (dist1[v] == -1)
                {
                    dist1[v] = nd;
                    queue.Enqueue((v, nd));
                }
                else if (dist1[v] != nd && dist2[v] == -1)
                {
                    dist2[v] = nd;
                    queue.Enqueue((v, nd));
                }
            }
        }

        int steps = dist2[n];
        int curTime = 0;

        for (int i = 0; i < steps; i++)
        {
            int cycle = 2 * change;
            int remainder = curTime % cycle;
            if (remainder >= change)
                curTime += cycle - remainder;

            curTime += time;
        }

        return curTime;
    }
}
```

## Complexity

- **Time:** `O(n + edges.Length)` for the BFS, plus `O(dist2[n])` for the time simulation.
- **Space:** `O(n + edges.Length)` for the adjacency list and distance arrays.
