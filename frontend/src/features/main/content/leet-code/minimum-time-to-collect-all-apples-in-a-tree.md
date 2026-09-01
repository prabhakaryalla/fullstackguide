# 1443. Minimum Time to Collect All Apples in a Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Breadth-First Search, Graph

## Problem

An undirected tree with `n` nodes (rooted at node `0`) is given via `edges`, along with `hasApple`, indicating which nodes have an apple. Starting and ending at node `0`, return the minimum time (in edge traversals, each edge taking 1 second each way) needed to collect every apple.

### Example

```
Input: n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], hasApple = [false,false,true,false,true,true,false]
Output: 8
```

## Approach

Build an adjacency list and perform a depth-first search from the root. For each child subtree, recursively compute the time needed within it; if that subtree required any time, or the child itself has an apple, the edge to that child must be traversed both ways (`+2`), and that cost is added to the total. Subtrees with no apples anywhere contribute nothing and are pruned.

## C# Solution

```csharp
public class Solution
{
    public int MinTime(int n, int[][] edges, IList<bool> hasApple)
    {
        var adj = new List<int>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<int>();
        foreach (var e in edges)
        {
            adj[e[0]].Add(e[1]);
            adj[e[1]].Add(e[0]);
        }

        var visited = new bool[n];
        return Dfs(0, adj, hasApple, visited);
    }

    private int Dfs(int node, List<int>[] adj, IList<bool> hasApple, bool[] visited)
    {
        visited[node] = true;
        int total = 0;

        foreach (var child in adj[node])
        {
            if (visited[child]) continue;

            int childTime = Dfs(child, adj, hasApple, visited);
            if (childTime > 0 || hasApple[child])
                total += childTime + 2;
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the adjacency list and recursion stack.
