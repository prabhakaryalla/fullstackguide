# 2360. Longest Cycle in a Graph

**Difficulty:** Hard
**Category:** Graph, Depth-First Search

## Problem

You are given a directed graph of `n` nodes numbered from `0` to `n - 1`, where each node has at most one outgoing edge.

The graph is represented with a given 0-indexed array `edges` of size `n`, indicating that there is a directed edge from node `i` to node `edges[i]`. If there is no outgoing edge from node `i`, then `edges[i] == -1`.

Return the length of the longest cycle in the graph. If no cycle exists, return `-1`.

A cycle is a path that starts and ends at the same node.

### Example

```
Input: edges = [3,3,4,2,3]
Output: 3
Explanation: The longest cycle is 2 → 4 → 3 → 2
```

## Approach

For each unvisited node, perform DFS while tracking the distance from the starting node. If we revisit a node that's part of the current path, we've found a cycle; calculate its length. Track the maximum cycle length found.

## C# Solution

```csharp
public class Solution
{
    public int LongestCycle(int[] edges)
    {
        int n = edges.Length;
        var visited = new bool[n];
        int maxCycle = -1;
        
        for (int i = 0; i < n; i++)
        {
            if (!visited[i])
            {
                var dist = new Dictionary<int, int>();
                int curr = i;
                int d = 0;
                
                while (curr != -1 && !visited[curr])
                {
                    if (dist.ContainsKey(curr))
                    {
                        maxCycle = Math.Max(maxCycle, d - dist[curr]);
                        break;
                    }
                    
                    dist[curr] = d;
                    curr = edges[curr];
                    d++;
                }
                
                foreach (int node in dist.Keys)
                {
                    visited[node] = true;
                }
            }
        }
        
        return maxCycle;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
