# 1519. Number of Nodes in the Sub-Tree With the Same Label

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Hash Table, Counting

## Problem

Given a tree with `n` nodes (rooted at node `0`) described by `edges`, and a string `labels` where `labels[i]` is the label of node `i`, return an array `answer` where `answer[i]` is the number of nodes in the subtree of node `i` that have the same label as node `i`.

### Example

```
Input: n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], labels = "abaedcd"
Output: [2,1,1,1,1,1,1]
```

## Approach

Build an adjacency list from the edges, then run a depth-first search from the root. At each node, recursively gather the 26-letter frequency count from each child's subtree, sum them together, add 1 for the current node's own label, and record the count for the current node's label as the answer for that node.

## C# Solution

```csharp
public class Solution
{
    public int[] CountSubTrees(int n, int[][] edges, string labels)
    {
        var graph = new List<int>[n];
        for (int i = 0; i < n; i++)
        {
            graph[i] = new List<int>();
        }

        foreach (int[] edge in edges)
        {
            graph[edge[0]].Add(edge[1]);
            graph[edge[1]].Add(edge[0]);
        }

        int[] answer = new int[n];
        var visited = new bool[n];

        int[] Dfs(int node)
        {
            visited[node] = true;
            int[] counts = new int[26];
            counts[labels[node] - 'a']++;

            foreach (int neighbor in graph[node])
            {
                if (!visited[neighbor])
                {
                    int[] childCounts = Dfs(neighbor);
                    for (int c = 0; c < 26; c++)
                    {
                        counts[c] += childCounts[c];
                    }
                }
            }

            answer[node] = counts[labels[node] - 'a'];
            return counts;
        }

        Dfs(0);
        return answer;
    }
}
```

## Complexity

- **Time:** `O(n * 26)` — each node merges 26-length frequency arrays from its children.
- **Space:** `O(n * 26)` for the recursion stack of frequency arrays, plus `O(n)` for the adjacency list.
