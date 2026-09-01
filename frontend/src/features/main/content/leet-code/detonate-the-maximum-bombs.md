# 2101. Detonate the Maximum Bombs

**Difficulty:** Medium
**Category:** Array, Math, Depth-First Search, Breadth-First Search, Graph, Geometry

## Problem

You are given a list of bombs where each bomb has a position `(x, y)` and a blast radius `r`. When a bomb detonates, it destroys all bombs within its blast radius, which may cause a chain reaction where those bombs also detonate.

Return the maximum number of bombs that can be detonated if you are allowed to detonate only one bomb.

### Example

```
Input: bombs = [[2,1,3],[6,1,4]]
Output: 2
Explanation: Detonating bomb 0 triggers bomb 1, so 2 bombs are detonated.
```

## Approach

We model this as a directed graph where an edge from bomb i to bomb j exists if bomb i can trigger bomb j (distance from i to j ≤ radius of i). For each bomb as a starting point, we perform a DFS/BFS to count how many bombs can be triggered in the chain reaction. Return the maximum count across all starting points.

## C# Solution

```csharp
public class Solution
{
    public int MaximumDetonation(int[][] bombs)
    {
        int n = bombs.length;
        List<int>[] graph = new List<int>[n];
        for (int i = 0; i < n; i++)
            graph[i] = new List<int>();
        
        for (int i = 0; i < n; i++)
        {
            long x1 = bombs[i][0], y1 = bombs[i][1], r1 = bombs[i][2];
            for (int j = 0; j < n; j++)
            {
                if (i == j) continue;
                long x2 = bombs[j][0], y2 = bombs[j][1];
                long dist = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
                if (dist <= r1 * r1)
                    graph[i].Add(j);
            }
        }
        
        int maxBombs = 0;
        for (int i = 0; i < n; i++)
        {
            bool[] visited = new bool[n];
            int count = Dfs(i, graph, visited);
            maxBombs = Math.Max(maxBombs, count);
        }
        return maxBombs;
    }
    
    private int Dfs(int node, List<int>[] graph, bool[] visited)
    {
        visited[node] = true;
        int count = 1;
        foreach (int neighbor in graph[node])
        {
            if (!visited[neighbor])
                count += Dfs(neighbor, graph, visited);
        }
        return count;
    }
}
```

## Complexity

- **Time:** O(n³) - for each bomb we build graph edges and run DFS
- **Space:** O(n²) - for the adjacency list
