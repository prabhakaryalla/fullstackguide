# 2307. Check for Contradictions in Equations

**Difficulty:** Hard
**Category:** Graph, Union Find, Depth-First Search
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a 2D array of strings `equations` and an array of real numbers `values`, where `equations[i] = [Ai, Bi]` and `values[i]` represents the equation `Ai / Bi = values[i]`.

Determine if there exists a contradiction among the equations. Return `true` if there is a contradiction, or `false` otherwise.

A contradiction exists if you can derive different values for the same division from different paths in the equation graph.

### Example

```
Input: equations = [["a","b"],["b","c"],["a","c"]], values = [3,0.5,1.5]
Output: false
Explanation: 
a/b = 3, b/c = 0.5, a/c = 1.5
We can verify: (a/b) * (b/c) = 3 * 0.5 = 1.5 = a/c
No contradiction.

Input: equations = [["a","b"],["b","c"],["a","c"]], values = [3,2,1]
Output: true
Explanation:
a/b = 3, b/c = 2, implies a/c should be 6, but we're told a/c = 1.
This is a contradiction.
```

## Approach

Build a weighted graph where each variable is a node, and each equation creates a bidirectional edge with weights representing the ratios. Use DFS to check if there's a path between two nodes that gives a different ratio than what's specified in a direct equation.

For each equation that connects already-connected nodes, verify that the new ratio matches the ratio computed through the existing path. If not, there's a contradiction.

## C# Solution

```csharp
public class Solution
{
    public bool CheckContradictions(string[][] equations, double[] values)
    {
        var graph = new Dictionary<string, List<(string node, double ratio)>>();
        
        foreach (var eq in equations)
        {
            if (!graph.ContainsKey(eq[0])) graph[eq[0]] = new List<(string, double)>();
            if (!graph.ContainsKey(eq[1])) graph[eq[1]] = new List<(string, double)>();
        }
        
        for (int i = 0; i < equations.Length; i++)
        {
            string a = equations[i][0];
            string b = equations[i][1];
            double val = values[i];
            
            double? existingRatio = DFS(graph, a, b, new HashSet<string>());
            
            if (existingRatio.HasValue)
            {
                if (Math.Abs(existingRatio.Value - val) > 1e-5)
                {
                    return true;
                }
            }
            else
            {
                graph[a].Add((b, val));
                graph[b].Add((a, 1.0 / val));
            }
        }
        
        return false;
    }
    
    private double? DFS(Dictionary<string, List<(string node, double ratio)>> graph, 
                        string start, string end, HashSet<string> visited)
    {
        if (start == end) return 1.0;
        if (!graph.ContainsKey(start)) return null;
        
        visited.Add(start);
        
        foreach (var (neighbor, ratio) in graph[start])
        {
            if (visited.Contains(neighbor)) continue;
            
            if (neighbor == end) return ratio;
            
            var result = DFS(graph, neighbor, end, visited);
            if (result.HasValue)
            {
                return ratio * result.Value;
            }
        }
        
        return null;
    }
}
```

## Complexity

- **Time:** O(E * (V + E)) where V is the number of variables and E is the number of equations
- **Space:** O(V + E) for the graph
