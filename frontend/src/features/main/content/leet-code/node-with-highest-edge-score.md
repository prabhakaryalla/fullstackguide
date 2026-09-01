# 2374. Node With Highest Edge Score

**Difficulty:** Medium
**Category:** Graph, Hash Table

## Problem

You are given a directed graph with `n` nodes labeled from `0` to `n - 1`, where each node has exactly one outgoing edge.

The graph is represented by a given 0-indexed integer array `edges` of length `n`, where `edges[i]` indicates that there is a directed edge from node `i` to node `edges[i]`.

The edge score of a node `i` is defined as the sum of the labels of all the nodes that have an edge pointing to `i`.

Return the node with the highest edge score. If multiple nodes have the same edge score, return the node with the smallest index.

### Example

```
Input: edges = [1,0,0,0,0,7,7,5]
Output: 7
Explanation: Node 7 has incoming edges from nodes 5 and 6, score = 5 + 6 = 11
```

## Approach

For each edge from node `i` to node `edges[i]`, add `i` to the score of node `edges[i]`. Track the maximum score and the node with that score.

## C# Solution

```csharp
public class Solution
{
    public int EdgeSco(int[] edges)
    {
        int n = edges.Length;
        var scores = new long[n];
        
        for (int i = 0; i < n; i++)
        {
            scores[edges[i]] += i;
        }
        
        long maxScore = 0;
        int result = 0;
        
        for (int i = 0; i < n; i++)
        {
            if (scores[i] > maxScore)
            {
                maxScore = scores[i];
                result = i;
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
