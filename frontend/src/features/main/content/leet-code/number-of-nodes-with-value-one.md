# 2445. Number of Nodes With Value One

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Breadth-First Search

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a tree (a connected, acyclic, undirected graph) with `n` nodes numbered from `1` to `n` and `n - 1` edges. You are given a 2D integer array `edges` where `edges[i] = [u_i, v_i]` indicates that there is an edge between nodes `u_i` and `v_i`.

You are also given an integer array `values` where `values[i]` is the initial value of the `i`-th node (1-indexed).

You want to perform some operations on the tree so that all nodes have value `1`. In one operation, you can choose any node and do one of the following:

- If the current value is `1`, do nothing.
- Otherwise, choose any adjacent node with value `1` and flip the value of the current node.

Return the minimum number of operations needed.

### Example

```
Input: n = 3, edges = [[1,2],[2,3]], values = [0,1,0]
Output: 2
Explanation: Initially, node 1 has value 0, node 2 has value 1, node 3 has value 0.
We can perform the operation on node 1 using node 2. Now node 1 has value 1.
Then perform operation on node 3 using node 2. Now node 3 has value 1.
```

## Approach

Use DFS to traverse the tree. Track the number of 0-valued nodes and use the connected structure to determine the minimum flips needed.

## C# Solution

```csharp
public class Solution
{
    public int MinimumFlips(int n, int[][] edges, int[] values)
    {
        var graph = new List<int>[n + 1];
        for (int i = 0; i <= n; i++)
        {
            graph[i] = new List<int>();
        }
        
        foreach (var edge in edges)
        {
            graph[edge[0]].Add(edge[1]);
            graph[edge[1]].Add(edge[0]);
        }
        
        int flips = 0;
        var visited = new bool[n + 1];
        
        void DFS(int node, int parent)
        {
            visited[node] = true;
            bool hasOne = values[node - 1] == 1;
            
            foreach (int neighbor in graph[node])
            {
                if (!visited[neighbor])
                {
                    DFS(neighbor, node);
                }
            }
            
            if (!hasOne)
            {
                flips++;
            }
        }
        
        DFS(1, -1);
        
        return flips;
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of nodes
- **Space:** O(n) for the graph and recursion
