# 399. Evaluate Division

**Difficulty:** Medium
**Category:** Array, Depth-First Search, Union Find, Graph

## Problem

Given an array of variable pairs `equations` and real number values `values` representing `equations[i][0] / equations[i][1] = values[i]`, and a list of `queries`, evaluate each query as a division expression using the given equations, returning `-1.0` if the answer cannot be determined.

### Example

```
Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
Output: [6.00000,0.50000,-1.00000,1.00000,-1.00000]
```

### Constraints

- `1 <= equations.length <= 20`
- `equations[i].length == 2`
- `1 <= values.length == equations.length`
- Values are positive real numbers.
- `1 <= queries.length <= 20`

## Approach

Model each equation as a weighted, bidirectional graph edge (`a -> b` with weight `values[i]`, and `b -> a` with weight `1/values[i]`). For each query, run a depth-first search from the source variable to the target, multiplying edge weights along the path; if either variable is unknown or no path exists, the answer is `-1.0`.

## C# Solution

```csharp
public class Solution
{
    public double[] CalcEquation(IList<IList<string>> equations, double[] values, IList<IList<string>> queries)
    {
        var graph = new Dictionary<string, List<(string Neighbor, double Weight)>>();

        for (int i = 0; i < equations.Count; i++)
        {
            var a = equations[i][0];
            var b = equations[i][1];
            var value = values[i];

            AddEdge(graph, a, b, value);
            AddEdge(graph, b, a, 1 / value);
        }

        var results = new double[queries.Count];
        for (int i = 0; i < queries.Count; i++)
        {
            var src = queries[i][0];
            var dst = queries[i][1];

            if (!graph.ContainsKey(src) || !graph.ContainsKey(dst))
            {
                results[i] = -1.0;
                continue;
            }

            results[i] = Dfs(graph, src, dst, new HashSet<string>());
        }

        return results;
    }

    private void AddEdge(Dictionary<string, List<(string, double)>> graph, string from, string to, double weight)
    {
        if (!graph.TryGetValue(from, out var list))
        {
            list = new List<(string, double)>();
            graph[from] = list;
        }

        list.Add((to, weight));
    }

    private double Dfs(Dictionary<string, List<(string Neighbor, double Weight)>> graph, string current, string target, HashSet<string> visited)
    {
        if (current == target) return 1.0;

        visited.Add(current);

        foreach (var (neighbor, weight) in graph[current])
        {
            if (visited.Contains(neighbor)) continue;

            var result = Dfs(graph, neighbor, target, visited);
            if (result != -1.0) return result * weight;
        }

        return -1.0;
    }
}
```

## Complexity

- **Time:** `O(q * (V + E))`, where `q` is the number of queries.
- **Space:** `O(V + E)` for the graph.
