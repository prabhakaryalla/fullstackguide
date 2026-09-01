# 2039. The Time When the Network Becomes Idle

**Difficulty:** Medium
**Category:** Array, Breadth-First Search, Graph

## Problem

There is a network of `n` servers (numbered `0` to `n - 1`), connected via bidirectional edges described in `edges` (guaranteed connected). Server `0` is the master; every other server `i` repeatedly sends a message toward server `0` every `patience[i]` milliseconds until it receives its **first** reply, after which it stops sending. Every edge takes exactly `1` millisecond to traverse in either direction, and server `0` replies to a message the instant it arrives. Return *the earliest time at which all servers have stopped sending (i.e. the whole network is idle)*.

## Approach

First, run a breadth-first search (BFS) from server `0` to compute `dist[i]`, the shortest number of edges from server `i` to server `0` (all edges have equal weight, so plain BFS suffices). The round-trip time for server `i` is `rt = 2 * dist[i]`.

Server `i` sends messages at times `0, patience[i], 2 * patience[i], ...` and stops as soon as a reply for any of them arrives. Since the reply to the very first message (sent at time `0`) arrives at time `rt`, the **last** message server `i` sends is at the largest multiple of `patience[i]` that is strictly less than `rt`: `lastSend = ((rt - 1) / patience[i]) * patience[i]` (integer division). That message's reply arrives at `lastSend + rt`, and the server becomes idle the very next millisecond, i.e. at `lastSend + rt + 1`. The overall answer is the maximum of this value across all servers `i != 0`.

## C# Solution

```csharp
public class Solution
{
    public int NetworkBecomesIdle(int[][] edges, int[] patience)
    {
        int n = patience.Length;
        var adj = new List<int>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<int>();

        foreach (var e in edges)
        {
            adj[e[0]].Add(e[1]);
            adj[e[1]].Add(e[0]);
        }

        var dist = new int[n];
        Array.Fill(dist, -1);
        dist[0] = 0;

        var queue = new Queue<int>();
        queue.Enqueue(0);

        while (queue.Count > 0)
        {
            var u = queue.Dequeue();
            foreach (var v in adj[u])
            {
                if (dist[v] == -1)
                {
                    dist[v] = dist[u] + 1;
                    queue.Enqueue(v);
                }
            }
        }

        int answer = 0;
        for (int i = 1; i < n; i++)
        {
            int rt = 2 * dist[i];
            int lastSend = ((rt - 1) / patience[i]) * patience[i];
            int idleAt = lastSend + rt + 1;
            answer = Math.Max(answer, idleAt);
        }

        return answer;
    }
}
```

## Complexity

- **Time:** `O(n + edges.Length)` for the BFS plus `O(n)` for the final scan.
- **Space:** `O(n + edges.Length)` for the adjacency list and distance array.
