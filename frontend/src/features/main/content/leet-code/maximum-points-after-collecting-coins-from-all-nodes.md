# 2920. Maximum Points After Collecting Coins From All Nodes

**Difficulty:** Hard
**Category:** Tree, Dynamic Programming, Bit Manipulation

## Problem

You are given a tree with `n` nodes and an array `coins` where `coins[i]` is the number of coins at node i. You start at node 0. For each node, you can either collect `coins[i] - k` points or collect `floor(coins[i] / 2)` points and this choice affects descendant calculations. Return the maximum points you can collect by traversing the entire tree.

### Example

```
Input: edges = [[0,1],[1,2],[2,3]], coins = [10,10,3,3], k = 5
Output: 11
Explanation: Collect optimally from each node.
```

## Approach

Use tree DP with memoization. For each node, track the number of times the floor division has been applied from ancestors. At each node, try both options: subtract k or divide by 2. Recursively calculate the maximum points from the subtree. Use DFS with state (node, division_count) to avoid recomputation.

## C# Solution

```csharp
public class Solution 
{
    private List<int>[] graph;
    private int[] coins;
    private int k;
    private Dictionary<(int, int), int> memo;
    
    public int MaximumPoints(int[][] edges, int[] coins, int k) 
    {
        int n = coins.Length;
        this.coins = coins;
        this.k = k;
        graph = new List<int>[n];
        memo = new Dictionary<(int, int), int>();
        
        for (int i = 0; i < n; i++) 
        {
            graph[i] = new List<int>();
        }
        
        foreach (var edge in edges) 
        {
            graph[edge[0]].Add(edge[1]);
            graph[edge[1]].Add(edge[0]);
        }
        
        return Dfs(0, -1, 0);
    }
    
    private int Dfs(int node, int parent, int divisions) 
    {
        if (divisions >= 14) return 0;
        
        var key = (node, divisions);
        if (memo.ContainsKey(key)) return memo[key];
        
        int coinValue = coins[node] >> divisions;
        int option1 = coinValue - k;
        int option2 = coinValue / 2;
        
        foreach (int child in graph[node]) 
        {
            if (child != parent) 
            {
                option1 += Dfs(child, node, divisions);
                option2 += Dfs(child, node, divisions + 1);
            }
        }
        
        int result = Math.Max(option1, option2);
        memo[key] = result;
        return result;
    }
}
```

## Complexity

- **Time:** O(n * 14) since divisions stop being useful after ~14 times
- **Space:** O(n * 14)
