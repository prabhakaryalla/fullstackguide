# 2497. Maximum Star Sum of a Graph

**Difficulty:** Medium
**Category:** Array, Greedy, Graph, Sorting, Heap (Priority Queue)

## Problem

There is an undirected graph consisting of `n` nodes numbered from 0 to `n - 1`. You are given a 0-indexed integer array `vals` of length `n` where `vals[i]` denotes the value of the ith node.

You are also given a 2D integer array `edges` where `edges[i] = [a_i, b_i]` denotes that there exists an undirected edge connecting nodes `a_i` and `b_i`.

A star graph is a subgraph of the given graph having a center node containing 0 or more neighbors. The star sum is the sum of the values of all the nodes in the star graph.

Return the maximum star sum of a star graph containing at most `k` edges.

### Example

```
Input: vals = [1,2,3,4,10,-10,-20], edges = [[0,1],[1,2],[1,3],[3,4],[3,5],[3,6]], k = 2
Output: 16
Explanation: Center at node 3 with neighbors 4 and 1: 3 + 4 + 10 = 16
```

## Approach

For each node as a potential center:
1. Collect the values of all its neighbors
2. Sort neighbor values in descending order
3. Take the center value plus the top k positive neighbor values
4. Track the maximum sum across all nodes

## C# Solution

```csharp
public class Solution
{
    public int MaxStarSum(int[] vals, int[][] edges, int k)
    {
        int n = vals.Length;
        var graph = new List<int>[n];
        
        for (int i = 0; i < n; i++)
        {
            graph[i] = new List<int>();
        }
        
        foreach (var edge in edges)
        {
            graph[edge[0]].Add(edge[1]);
            graph[edge[1]].Add(edge[0]);
        }
        
        int maxSum = int.MinValue;
        
        for (int i = 0; i < n; i++)
        {
            var neighborVals = new List<int>();
            foreach (int neighbor in graph[i])
            {
                neighborVals.Add(vals[neighbor]);
            }
            
            neighborVals.Sort((a, b) => b.CompareTo(a));
            
            int sum = vals[i];
            int count = 0;
            
            foreach (int val in neighborVals)
            {
                if (count >= k || val <= 0) break;
                sum += val;
                count++;
            }
            
            maxSum = Math.Max(maxSum, sum);
        }
        
        return maxSum;
    }
}
```

## Complexity

- **Time:** O(n × d log d) where d is the maximum degree
- **Space:** O(n + e) for the graph
