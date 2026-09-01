# 1743. Restore the Array From Adjacent Pairs

**Difficulty:** Medium
**Category:** Array, Hash Table, Graph

## Problem

There is an integer array `nums` of unique values that has been shuffled, and you are given `adjacentPairs` where each pair lists two elements that were adjacent in the original array. Reconstruct and return the original array (either direction is acceptable).

### Example

```
Input: adjacentPairs = [[2,1],[3,4],[3,2]]
Output: [1,2,3,4]
```

## Approach

Build an adjacency list from the pairs; every value has degree 1 (an endpoint of the array) or degree 2 (an interior value). Start from any endpoint and walk the chain, at each step moving to the neighbor that isn't the one just visited.

## C# Solution

```csharp
public class Solution
{
    public int[] RestoreArray(int[][] adjacentPairs)
    {
        var adj = new Dictionary<int, List<int>>();
        foreach (var p in adjacentPairs)
        {
            if (!adj.TryGetValue(p[0], out var l0)) adj[p[0]] = l0 = new List<int>();
            if (!adj.TryGetValue(p[1], out var l1)) adj[p[1]] = l1 = new List<int>();
            l0.Add(p[1]);
            l1.Add(p[0]);
        }

        int n = adj.Count;
        int start = 0;
        foreach (var kv in adj)
        {
            if (kv.Value.Count == 1)
            {
                start = kv.Key;
                break;
            }
        }

        int[] result = new int[n];
        result[0] = start;
        int prev = int.MinValue;
        int curr = start;

        for (int i = 1; i < n; i++)
        {
            var neighbors = adj[curr];
            int next = neighbors[0] == prev ? neighbors[neighbors.Count - 1] : neighbors[0];
            result[i] = next;
            prev = curr;
            curr = next;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the adjacency list.
