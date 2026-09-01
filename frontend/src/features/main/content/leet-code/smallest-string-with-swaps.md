# 1202. Smallest String With Swaps

**Difficulty:** Medium
**Category:** Array, String, Depth-First Search, Breadth-First Search, Union Find, Sorting

## Problem

Given a string `s` and an array of index pairs that may each be swapped any number of times, return the lexicographically smallest string achievable through any sequence of allowed swaps.

### Example

```
Input: s = "dcab", pairs = [[0,3],[1,2]]
Output: "bacd"
```

## Approach

Indices connected (directly or transitively) through the pairs form groups whose characters can be freely rearranged among themselves. Use Union-Find to discover these connected components, then for each component collect its characters, sort them, and place them back into the component's indices in ascending index order — this yields the smallest possible arrangement per group.

## C# Solution

```csharp
public class Solution
{
    private int[] parent = null!;

    public string SmallestStringWithSwaps(string s, IList<IList<int>> pairs)
    {
        int n = s.Length;
        parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;

        foreach (var pair in pairs)
            Union(pair[0], pair[1]);

        var groups = new Dictionary<int, List<int>>();
        for (int i = 0; i < n; i++)
        {
            int root = Find(i);
            if (!groups.TryGetValue(root, out var list))
                groups[root] = list = new List<int>();
            list.Add(i);
        }

        var result = s.ToCharArray();
        foreach (var indices in groups.Values)
        {
            var sortedChars = indices.Select(i => s[i]).OrderBy(c => c).ToArray();
            var sortedIndices = indices.OrderBy(i => i).ToArray();

            for (int i = 0; i < sortedIndices.Length; i++)
                result[sortedIndices[i]] = sortedChars[i];
        }

        return new string(result);
    }

    private int Find(int x) => parent[x] == x ? x : (parent[x] = Find(parent[x]));

    private void Union(int x, int y)
    {
        int rootX = Find(x), rootY = Find(y);
        if (rootX != rootY) parent[rootX] = rootY;
    }
}
```

## Complexity

- **Time:** `O(n log n + p)`, where `p` is the number of pairs.
- **Space:** `O(n)`.
