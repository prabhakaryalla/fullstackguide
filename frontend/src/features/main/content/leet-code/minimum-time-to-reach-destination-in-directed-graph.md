# 3604. Minimum Time to Reach Destination in Directed Graph

**Difficulty:** Medium
**Category:** Graph, Shortest Path, Heap (Priority Queue)

## Problem
You are given an integer `n` and a list of directed edges `edges[i] = [u, v, start, end]`, meaning you may travel from node `u` to node `v`, but only if you depart `u` at some time `t` with `start <= t <= end`; the trip always takes exactly `1` unit of time, so you arrive at `v` at time `t + 1`. You start at node `0` at time `0` and may wait idly at any node for as long as you like before taking an outgoing edge. Return the minimum time at which you can reach node `n - 1`, or `-1` if it is impossible.

## Approach
This is a shortest-path problem where "distance" is arrival time, solved with a Dijkstra-style approach since waiting is free and only makes later departures possible (arrival times are non-decreasing as we relax nodes, so the greedy Dijkstra ordering is still valid).

Maintain a min-heap of `(time, node)` pairs and a `best[]` array of earliest known arrival time per node, initialized to `best[0] = 0`. Pop the state with the smallest time; for each outgoing edge `(u, v, start, end)` from the current node, if the current time `t <= end`, the earliest valid departure is `max(t, start)`, giving arrival `max(t, start) + 1`. If this arrival improves `best[v]`, update it and push `(arrival, v)` onto the heap. Continue until the heap is empty; the answer is `best[n - 1]` (or `-1` if it was never reached).

## C# Solution

```csharp
public class Solution 
{
    public int MinTimeToReach(int n, int[][] edges) 
    {
        var graph = new List<(int to, int start, int end)>[n];
        for (int i = 0; i < n; i++)
            graph[i] = new List<(int, int, int)>();

        foreach (var e in edges)
            graph[e[0]].Add((e[1], e[2], e[3]));

        int[] best = new int[n];
        Array.Fill(best, int.MaxValue);
        best[0] = 0;

        var pq = new PriorityQueue<(int time, int node), int>();
        pq.Enqueue((0, 0), 0);

        while (pq.Count > 0)
        {
            var (time, node) = pq.Dequeue();

            if (time > best[node])
                continue;
            if (node == n - 1)
                return time;

            foreach (var (to, start, end) in graph[node])
            {
                if (time > end)
                    continue;

                int departure = Math.Max(time, start);
                int arrival = departure + 1;

                if (arrival < best[to])
                {
                    best[to] = arrival;
                    pq.Enqueue((arrival, to), arrival);
                }
            }
        }

        return best[n - 1] == int.MaxValue ? -1 : best[n - 1];
    }
}
```

## Complexity

- **Time:** O(E log E)
- **Space:** O(n + E)
