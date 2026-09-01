# 2976. Minimum Cost to Convert String I

**Difficulty:** Medium
**Category:** Graph, Array, String, Shortest Path

## Problem

You are given two 0-indexed strings `source` and `target`, both of length `n`. You are also given two arrays `original` and `changed`, and an array `cost`, where `cost[i]` represents the cost of converting character `original[i]` to `changed[i]`.

Return the minimum cost to convert `source` to `target`. If impossible, return -1.

### Example

```
Input: source = "abcd", target = "acbe", original = ["a","b","c","c","e","d"], changed = ["b","c","b","e","b","e"], cost = [2,5,5,1,2,20]
Output: 28
Explanation: Convert a->b (cost 2), b->c (cost 5), c->b (cost 5), c->e (cost 1), d->e (cost 20). Total = 28.

Input: source = "aaaa", target = "bbbb", original = ["a","c"], changed = ["c","b"], cost = [1,2]
Output: 12
```

## Approach

Build a graph with 26 nodes (one per letter). Use Floyd-Warshall to precompute the minimum cost to convert any letter to any other letter. Then for each position in `source`, look up the minimum cost to convert to `target[i]`.

## C# Solution

```csharp
public class Solution
{
    public long MinimumCost(string source, string target, char[] original, char[] changed, int[] cost)
    {
        const int INF = int.MaxValue / 2;
        var dist = new int[26, 26];

        // Initialize distances
        for (int i = 0; i < 26; i++)
        {
            for (int j = 0; j < 26; j++)
            {
                dist[i, j] = (i == j) ? 0 : INF;
            }
        }

        // Add edges
        for (int i = 0; i < original.Length; i++)
        {
            int u = original[i] - 'a';
            int v = changed[i] - 'a';
            dist[u, v] = Math.Min(dist[u, v], cost[i]);
        }

        // Floyd-Warshall
        for (int k = 0; k < 26; k++)
        {
            for (int i = 0; i < 26; i++)
            {
                for (int j = 0; j < 26; j++)
                {
                    dist[i, j] = Math.Min(dist[i, j], dist[i, k] + dist[k, j]);
                }
            }
        }

        // Calculate total cost
        long totalCost = 0;
        for (int i = 0; i < source.Length; i++)
        {
            int from = source[i] - 'a';
            int to = target[i] - 'a';

            if (dist[from, to] >= INF) return -1;
            totalCost += dist[from, to];
        }

        return totalCost;
    }
}
```

## Complexity

- **Time:** O(26³ + n + m) where m = edges, n = string length
- **Space:** O(26²)
