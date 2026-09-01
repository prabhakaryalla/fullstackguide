# 2242. Maximum Score of a Node Sequence

**Difficulty:** Hard
**Category:** Array, Graph, Enumeration, Sorting

## Problem

There is an undirected graph with `n` nodes numbered from 0 to n-1. You are given a 0-indexed integer array `scores` of length n and a 2D integer array `edges`. A node sequence of length 4 is valid if all edges exist and all nodes are distinct. The score is the sum of scores of the four nodes. Return the maximum score, or -1 if no valid sequence exists.

### Example

```
Input: scores = [5,2,9,8,4], edges = [[0,1],[1,2],[2,3],[0,2],[1,3],[2,4]]
Output: 24
Explanation: Sequence [0,1,2,3] has score 5+2+9+8=24
```

## Approach

For each edge (b, c), consider it as the middle edge. Find the best node `a` connected to `b` (not c), and the best node `d` connected to `c` (not b), ensuring all four nodes are distinct. To efficiently find candidates, precompute the top 3 neighbors by score for each node.

## C# Solution

```csharp
public class Solution
{
    public int MaximumScore(int[] scores, int[][] edges)
    {
        int n = scores.Length;
        var adj = new List<int>[n];
        for (int i = 0; i < n; i++)
        {
            adj[i] = new List<int>();
        }
        
        foreach (var edge in edges)
        {
            adj[edge[0]].Add(edge[1]);
            adj[edge[1]].Add(edge[0]);
        }
        
        for (int i = 0; i < n; i++)
        {
            adj[i] = adj[i].OrderByDescending(x => scores[x]).Take(3).ToList();
        }
        
        int maxScore = -1;
        
        foreach (var edge in edges)
        {
            int b = edge[0], c = edge[1];
            
            foreach (int a in adj[b])
            {
                if (a == c) continue;
                foreach (int d in adj[c])
                {
                    if (d == b || d == a) continue;
                    maxScore = Math.Max(maxScore, scores[a] + scores[b] + scores[c] + scores[d]);
                }
            }
        }
        
        return maxScore;
    }
}
```

## Complexity

- **Time:** O(E + V log V)
- **Space:** O(V + E)
