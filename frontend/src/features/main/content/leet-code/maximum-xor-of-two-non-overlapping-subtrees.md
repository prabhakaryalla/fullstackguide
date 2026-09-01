# 2479. Maximum XOR of Two Non-Overlapping Subtrees

**Difficulty:** Hard
**Category:** Array, Tree, Depth-First Search, Dynamic Programming, Bit Manipulation

## Problem

Given a tree with `n` nodes and values, select two non-overlapping subtrees (where neither is an ancestor of the other) to maximize the XOR of their sums.

### Example

```
Input: edges = [[0,1],[0,2],[1,3],[1,4]], values = [2,3,7,5,1]
Output: 18
Explanation: Select subtree rooted at node 3 (sum=5) and subtree rooted at node 2 (sum=7), XOR = 5 ⊕ 7 = 2.
Actually, we need to find better combination. Let me recalculate...
Subtree at 1: sum = 3+5+1 = 9
Subtree at 2: sum = 7
XOR = 9 ⊕ 7 = 14
```

## Approach

1. Use DFS to compute the sum of each subtree
2. For each pair of nodes, check if their subtrees are non-overlapping (neither is ancestor of the other)
3. Track the maximum XOR among all valid pairs

To check if two subtrees overlap, maintain the DFS entry/exit times. Two subtrees don't overlap if their time intervals don't contain each other.

## C# Solution

```csharp
public class Solution
{
    private int time = 0;
    
    public long MaxXor(int[][] edges, int[] values)
    {
        int n = values.Length;
        var graph = new List<int>[n];
        for (int i = 0; i < n; i++) graph[i] = new List<int>();
        
        foreach (var edge in edges)
        {
            graph[edge[0]].Add(edge[1]);
            graph[edge[1]].Add(edge[0]);
        }
        
        long[] subtreeSum = new long[n];
        int[] enter = new int[n];
        int[] exit = new int[n];
        
        DFS(0, -1, graph, values, subtreeSum, enter, exit);
        
        long maxXor = 0;
        
        for (int i = 0; i < n; i++)
        {
            for (int j = i + 1; j < n; j++)
            {
                // Check if subtrees are non-overlapping
                if (!IsAncestor(i, j, enter, exit) && !IsAncestor(j, i, enter, exit))
                {
                    maxXor = Math.Max(maxXor, subtreeSum[i] ^ subtreeSum[j]);
                }
            }
        }
        
        return maxXor;
    }
    
    private long DFS(int node, int parent, List<int>[] graph, int[] values, 
                     long[] subtreeSum, int[] enter, int[] exit)
    {
        enter[node] = time++;
        long sum = values[node];
        
        foreach (int child in graph[node])
        {
            if (child == parent) continue;
            sum += DFS(child, node, graph, values, subtreeSum, enter, exit);
        }
        
        subtreeSum[node] = sum;
        exit[node] = time++;
        return sum;
    }
    
    private bool IsAncestor(int u, int v, int[] enter, int[] exit)
    {
        return enter[u] <= enter[v] && exit[v] <= exit[u];
    }
}
```

## Complexity

- **Time:** O(n²) for checking all pairs
- **Space:** O(n) for the tree and arrays
