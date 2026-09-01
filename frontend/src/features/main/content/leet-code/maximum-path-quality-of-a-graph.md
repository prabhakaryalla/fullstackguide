# 2065. Maximum Path Quality of a Graph

**Difficulty:** Hard
**Category:** Depth-First Search, Graph, Backtracking

## Problem

You are given an undirected graph of `n` nodes, each with a `values[i]`, and weighted edges representing time costs. Starting and ending at node `0`, find a walk (nodes and edges may be revisited) whose total time does not exceed `maxTime`. The **quality** of a walk is the sum of the values of all **distinct** nodes visited (each node's value counted at most once, no matter how many times it's visited). Return *the maximum quality achievable*.

## Approach

Since `maxTime <= 100`, a depth-first search with pruning by remaining time budget is efficient. From node `0`, explore every edge whose cost fits within the remaining time; recurse into the neighbor, decreasing the remaining time budget. Maintain a `visited` count per node (to correctly sum distinct-node values only once) and a running quality sum. Whenever the walk returns to node `0`, update the best quality seen. Backtrack (undo the visited marking) after exploring each branch so other paths can still count that node fresh if it wasn't already counted elsewhere in the current path.

## C# Solution

```csharp
public class Solution
{
    private List<(int to, int time)>[] adj;
    private int[] values;
    private bool[] visited;
    private int maxTime;
    private int best;

    public int MaximalPathQuality(int[] values, int[][] edges, int maxTime)
    {
        int n = values.Length;
        this.values = values;
        this.maxTime = maxTime;
        adj = new List<(int, int)>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<(int, int)>();

        foreach (var e in edges)
        {
            adj[e[0]].Add((e[1], e[2]));
            adj[e[1]].Add((e[0], e[2]));
        }

        visited = new bool[n];
        visited[0] = true;
        best = 0;

        Dfs(0, maxTime, values[0]);
        return best;
    }

    private void Dfs(int node, int remainingTime, int quality)
    {
        if (node == 0)
            best = Math.Max(best, quality);

        foreach (var (to, time) in adj[node])
        {
            if (time > remainingTime) continue;

            bool alreadyVisited = visited[to];
            visited[to] = true;

            Dfs(to, remainingTime - time, quality + (alreadyVisited ? 0 : values[to]));

            visited[to] = alreadyVisited;
        }
    }
}
```

## Complexity

- **Time:** Exponential in the worst case, but bounded in practice by `maxTime <= 100` limiting recursion depth and branching.
- **Space:** `O(n + edges.Length)` for the adjacency list, plus recursion depth.
