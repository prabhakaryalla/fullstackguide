# 3493. Properties Graph

**Difficulty:** Medium
**Category:** Array, Hash Table, Graph, Union Find

## Problem

You are given a 2D integer array `properties` of length `n`, where `properties[i]` is an array of property ids belonging to the `i`-th object, and an integer `k`.

Build an undirected graph with `n` nodes where an edge connects node `i` and node `j` (`i != j`) if the intersection of `properties[i]` and `properties[j]` has at least `k` common elements. Return the number of connected components in the resulting graph.

### Example

```
Input: properties = [[1,2],[1,1],[3,4],[4,5,6]], k = 1
Output: 2
Explanation:
- properties[0] and properties[1] share the value 1 (>= 1 common element), so they are connected.
- properties[2] and properties[3] share the value 4 (>= 1 common element), so they are connected.
- There is no overlap between {1,2} and {3,4}, so the two pairs form separate components.
Answer: 2 connected components.
```

## Approach

Convert each `properties[i]` array to a `HashSet<int>` for fast membership checks. For every pair `(i, j)`, count the intersection size by iterating the smaller set and checking membership in the larger one; if the count reaches `k`, union the two nodes using a union-find (disjoint set union) structure. Finally, count the number of distinct roots among all nodes.

## C# Solution

```csharp
public class Solution 
{
    private int[] parent;

    public int NumberOfComponents(int[][] properties, int k) 
    {
        int n = properties.Length;
        parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;

        var sets = new HashSet<int>[n];
        for (int i = 0; i < n; i++)
        {
            sets[i] = new HashSet<int>(properties[i]);
        }

        for (int i = 0; i < n; i++)
        {
            for (int j = i + 1; j < n; j++)
            {
                var smaller = sets[i].Count <= sets[j].Count ? sets[i] : sets[j];
                var larger = sets[i].Count <= sets[j].Count ? sets[j] : sets[i];
                int common = 0;
                foreach (int v in smaller)
                {
                    if (larger.Contains(v))
                    {
                        common++;
                        if (common >= k) break;
                    }
                }
                if (common >= k)
                {
                    Union(i, j);
                }
            }
        }

        var roots = new HashSet<int>();
        for (int i = 0; i < n; i++) roots.Add(Find(i));
        return roots.Count;
    }

    private int Find(int x)
    {
        while (parent[x] != x)
        {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    private void Union(int a, int b)
    {
        int ra = Find(a), rb = Find(b);
        if (ra != rb) parent[ra] = rb;
    }
}
```

## Complexity

- **Time:** O(n^2 * m), where n is the number of objects and m is the average size of each properties array.
- **Space:** O(n * m) for the sets plus O(n) for the union-find structure.
