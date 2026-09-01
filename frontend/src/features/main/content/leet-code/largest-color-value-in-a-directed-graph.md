# 1857. Largest Color Value in a Directed Graph

**Difficulty:** Hard
**Category:** Graph, Topological Sort, Dynamic Programming, Memoization

## Problem

Given a directed graph on `n` nodes where each node has a lowercase-letter color (`colors`), and a list of directed `edges`, a color value of a path is the largest number of times any single color appears along that path. Return the largest color value over all valid paths, or `-1` if the graph contains a cycle.

### Example

```
Input: colors = "abaca", edges = [[0,1],[0,2],[2,3],[3,4]]
Output: 3
```

## Approach

Run Kahn's algorithm (BFS-based topological sort) using in-degrees. Maintain, for every node, a `count[node][c]` array of the maximum number of times color `c` appears along any path ending at that node. When a node is dequeued (processed in topological order), first fold in its own color into its count, updating the running best answer, then propagate its counts forward to every neighbor by taking the element-wise maximum, decrementing neighbor in-degrees and enqueuing any that reach zero. If not all `n` nodes get processed, the graph has a cycle, so return `-1`.

## C# Solution

```csharp
public class Solution
{
    public int LargestPathValue(string colors, int[][] edges)
    {
        int n = colors.Length;
        var adj = new List<int>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<int>();
        var indegree = new int[n];

        foreach (var e in edges)
        {
            adj[e[0]].Add(e[1]);
            indegree[e[1]]++;
        }

        var count = new int[n, 26];
        var queue = new Queue<int>();
        for (int i = 0; i < n; i++)
        {
            if (indegree[i] == 0) queue.Enqueue(i);
        }

        int processed = 0;
        int best = 0;

        while (queue.Count > 0)
        {
            int node = queue.Dequeue();
            processed++;

            count[node, colors[node] - 'a']++;
            best = Math.Max(best, count[node, colors[node] - 'a']);

            foreach (int next in adj[node])
            {
                for (int c = 0; c < 26; c++)
                {
                    count[next, c] = Math.Max(count[next, c], count[node, c]);
                }

                if (--indegree[next] == 0) queue.Enqueue(next);
            }
        }

        return processed == n ? best : -1;
    }
}
```

## Complexity

- **Time:** `O((n + e) * 26)` for propagating color counts across every edge.
- **Space:** `O(n * 26)` for the count table.
