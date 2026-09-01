# 2359. Find Closest Node to Given Two Nodes

**Difficulty:** Medium
**Category:** Graph, Depth-First Search

## Problem

You are given a directed graph of `n` nodes numbered from `0` to `n - 1`, where each node has at most one outgoing edge.

The graph is represented with a given 0-indexed array `edges` of size `n`, indicating that there is a directed edge from node `i` to node `edges[i]`. If there is no outgoing edge from `i`, then `edges[i] == -1`.

You are also given two integers `node1` and `node2`.

Return the index of the node that can be reached from both `node1` and `node2`, such that the maximum between the distance from `node1` to that node, and from `node2` to that node is minimized. If there are multiple answers, return the node with the smallest index, and if no possible answer exists, return `-1`.

### Example

```
Input: edges = [2,2,3,-1], node1 = 0, node2 = 1
Output: 2
```

## Approach

BFS/DFS from both starting nodes to compute distances to all reachable nodes. Then find the node minimizing max(dist1[node], dist2[node]).

## C# Solution

```csharp
public class Solution
{
    public int ClosestMeetingNode(int[] edges, int node1, int node2)
    {
        int n = edges.Length;
        var dist1 = ComputeDistances(edges, node1);
        var dist2 = ComputeDistances(edges, node2);
        
        int result = -1;
        int minMaxDist = int.MaxValue;
        
        for (int i = 0; i < n; i++)
        {
            if (dist1[i] != int.MaxValue && dist2[i] != int.MaxValue)
            {
                int maxDist = Math.Max(dist1[i], dist2[i]);
                if (maxDist < minMaxDist)
                {
                    minMaxDist = maxDist;
                    result = i;
                }
            }
        }
        
        return result;
    }
    
    private int[] ComputeDistances(int[] edges, int start)
    {
        int n = edges.Length;
        var dist = new int[n];
        Array.Fill(dist, int.MaxValue);
        dist[start] = 0;
        
        int curr = start;
        int d = 0;
        
        while (curr != -1 && dist[curr] == d)
        {
            dist[curr] = d;
            curr = edges[curr];
            d++;
        }
        
        return dist;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
