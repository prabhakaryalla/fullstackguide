# 797. All Paths From Source to Target

**Difficulty:** Medium
**Category:** Backtracking, Depth-First Search, Graph

## Problem

Given a directed acyclic graph of `n` nodes labeled `0` to `n-1`, represented as an adjacency list `graph`, return all possible paths from node `0` to node `n-1`.

### Example

```
Input: graph = [[1,2],[3],[3],[]]
Output: [[0,1,3],[0,2,3]]
```

## Approach

Perform a DFS with backtracking starting from node `0`, maintaining the current path. Whenever the last node in the path is the target (`n-1`), record a copy of the path. Otherwise, recurse into every neighbor, appending it to the path before the recursive call and removing it afterward to backtrack.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> AllPathsSourceTarget(int[][] graph)
    {
        var result = new List<IList<int>>();
        var path = new List<int> { 0 };

        Dfs(graph, 0, path, result);

        return result;
    }

    private void Dfs(int[][] graph, int node, List<int> path, List<IList<int>> result)
    {
        if (node == graph.Length - 1)
        {
            result.Add(new List<int>(path));
            return;
        }

        foreach (var next in graph[node])
        {
            path.Add(next);
            Dfs(graph, next, path, result);
            path.RemoveAt(path.Count - 1);
        }
    }
}
```

## Complexity

- **Time:** `O(2^n * n)` in the worst case.
- **Space:** `O(n)` for the recursion stack, excluding output.
