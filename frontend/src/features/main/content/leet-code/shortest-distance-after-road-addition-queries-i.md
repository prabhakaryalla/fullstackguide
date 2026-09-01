# 3243. Shortest Distance After Road Addition Queries I

**Difficulty:** Medium
**Category:** Array, Breadth-First Search, Dynamic Programming, Graph

## Problem
You have `n` cities numbered 0 to n-1, connected in a straight line by one-directional roads from each city to the next (0 to 1, 1 to 2, etc.). You are given a list of queries, each adding a new one-directional shortcut road between two cities. After each query is added (roads accumulate), report the shortest path length from city 0 to city n-1.

## Approach
Maintain an adjacency list starting with the initial straight-line roads, and a distance array initialized so that `dist[i] = i` (the initial shortest distance from city 0). For each query adding a new edge `(u, v)`, add it to the adjacency list; if this new edge would improve the shortest distance to `v` (i.e., `dist[u] + 1 < dist[v]`), update `dist[v]` and run a BFS from `v` to propagate this improvement to any nodes reachable from `v` whose distances can also be improved. After processing each query, record the current shortest distance to the last city.

## C# Solution
```csharp
public class Solution {
    public int[] ShortestDistanceAfterQueries(int n, int[][] queries) {
        List<int> ans = new List<int>();
        int[] dist = new int[n];
        for (int i = 0; i < n; i++) dist[i] = i;
        List<int>[] graph = new List<int>[n];
        for (int i = 0; i < n; i++) graph[i] = new List<int>();
        for (int i = 0; i < n - 1; i++) graph[i].Add(i + 1);

        foreach (int[] query in queries) {
            int u = query[0], v = query[1];
            graph[u].Add(v);
            if (dist[u] + 1 < dist[v]) {
                dist[v] = dist[u] + 1;
                Bfs(graph, v, dist);
            }
            ans.Add(dist[n - 1]);
        }

        return ans.ToArray();
    }

    private void Bfs(List<int>[] graph, int start, int[] dist) {
        Queue<int> q = new Queue<int>();
        q.Enqueue(start);
        while (q.Count > 0) {
            int u = q.Dequeue();
            foreach (int v in graph[u]) {
                if (dist[u] + 1 < dist[v]) {
                    dist[v] = dist[u] + 1;
                    q.Enqueue(v);
                }
            }
        }
    }
}
```

## Complexity
- Time: O(q * (n + q))
- Space: O(n + q)
