# 2246. Longest Path With Different Adjacent Characters

**Difficulty:** Hard
**Category:** Tree, Depth-First Search, Graph, Dynamic Programming

## Problem

You are given a tree (a connected acyclic graph) rooted at node 0 consisting of `n` nodes numbered from 0 to `n - 1`. You are given an integer array `parent` where `parent[i]` is the parent of node `i`. Node 0 is the root, so `parent[0] = -1`.

You are also given a string `s` of length `n`, where `s[i]` is the character assigned to node `i`.

Return the length of the longest path in the tree such that no pair of adjacent nodes on the path have the same character.

### Example

```
Input: parent = [-1,0,0,1,1,2], s = "abacbe"
Output: 3
Explanation: The longest path is 0 → 1 → 3 with characters "aba" (length 3).
```

## Approach

Use DFS to compute for each node the longest path ending at that node where all adjacent characters differ. For each node, combine the two longest child paths (with different characters) to compute the diameter passing through that node. Track the global maximum.

## C# Solution

```csharp
public class Solution
{
    private int maxLen = 1;
    
    public int LongestPath(int[] parent, string s)
    {
        int n = parent.Length;
        List<int>[] children = new List<int>[n];
        
        for (int i = 0; i < n; i++)
        {
            children[i] = new List<int>();
        }
        
        for (int i = 1; i < n; i++)
        {
            children[parent[i]].Add(i);
        }
        
        Dfs(0, children, s);
        return maxLen;
    }
    
    private int Dfs(int node, List<int>[] children, string s)
    {
        int max1 = 0, max2 = 0;
        
        foreach (int child in children[node])
        {
            int childLen = Dfs(child, children, s);
            
            if (s[child] != s[node])
            {
                if (childLen > max1)
                {
                    max2 = max1;
                    max1 = childLen;
                }
                else if (childLen > max2)
                {
                    max2 = childLen;
                }
            }
        }
        
        maxLen = Math.Max(maxLen, max1 + max2 + 1);
        return max1 + 1;
    }
}
```

## Complexity

- **Time:** O(n) for DFS traversal.
- **Space:** O(n) for recursion and adjacency lists.
