# 2467. Most Profitable Path in a Tree

**Difficulty:** Medium
**Category:** Array, Tree, Depth-First Search, Breadth-First Search, Graph

## Problem

There is an undirected tree with `n` nodes labeled from 0 to n-1. Alice starts at node 0 and Bob starts at node `bob`. Each node has an amount value. Alice moves towards any leaf, Bob moves towards node 0. If they visit a node at the same time, they each get half the amount. Otherwise, whoever visits first gets the full amount.

Return the maximum net income Alice can achieve assuming both play optimally.

### Example

```
Input: edges = [[0,1],[1,2],[1,3],[3,4]], bob = 3, amount = [-2,4,2,-4,6]
Output: 6
Explanation: Alice path 0->1->3->4 can achieve net income 6.
```

## Approach

1. Find Bob's path from his starting position to node 0 using BFS/DFS
2. Mark the time Bob arrives at each node on his path
3. For Alice, use DFS from node 0 to try all paths to leaves
4. At each node, calculate Alice's income based on whether Bob is there, has been there, or hasn't arrived yet
5. Return the maximum income among all paths to leaves

## C# Solution

```csharp
public class Solution
{
    public int MostProfitablePath(int[][] edges, int bob, int[] amount)
    {
        int n = amount.Length;
        var graph = new List<int>[n];
        for (int i = 0; i < n; i++) graph[i] = new List<int>();
        
        foreach (var edge in edges)
        {
            graph[edge[0]].Add(edge[1]);
            graph[edge[1]].Add(edge[0]);
        }
        
        // Find Bob's path to 0
        var bobPath = new List<int>();
        var bobTime = new int[n];
        Array.Fill(bobTime, -1);
        
        FindPath(bob, 0, -1, graph, bobPath);
        for (int i = 0; i < bobPath.Count; i++)
        {
            bobTime[bobPath[i]] = i;
        }
        
        // DFS for Alice
        return DFS(0, -1, 0, graph, amount, bobTime);
    }
    
    private bool FindPath(int node, int target, int parent, List<int>[] graph, List<int> path)
    {
        path.Add(node);
        if (node == target) return true;
        
        foreach (int next in graph[node])
        {
            if (next == parent) continue;
            if (FindPath(next, target, node, graph, path)) return true;
        }
        
        path.RemoveAt(path.Count - 1);
        return false;
    }
    
    private int DFS(int node, int parent, int time, List<int>[] graph, int[] amount, int[] bobTime)
    {
        int income = 0;
        
        if (bobTime[node] == -1 || time < bobTime[node])
        {
            income = amount[node];
        }
        else if (time == bobTime[node])
        {
            income = amount[node] / 2;
        }
        
        bool isLeaf = true;
        int maxChildIncome = int.MinValue;
        
        foreach (int next in graph[node])
        {
            if (next == parent) continue;
            isLeaf = false;
            maxChildIncome = Math.Max(maxChildIncome, DFS(next, node, time + 1, graph, amount, bobTime));
        }
        
        return isLeaf ? income : income + maxChildIncome;
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of nodes
- **Space:** O(n) for the graph and recursion
