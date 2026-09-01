# 1722. Minimize Hamming Distance After Swap Operations

**Difficulty:** Medium
**Category:** Array, Depth-First Search, Union Find

## Problem

Given `source`, `target`, and `allowedSwaps` (pairs of indices that may be swapped any number of times, in any order), return the minimum Hamming distance between `source` and `target` achievable after performing any sequence of allowed swaps.

### Example

```
Input: source = [1,2,3,4], target = [2,1,4,5], allowedSwaps = [[0,1],[2,3]]
Output: 1
```

## Approach

Group indices into connected components using Union-Find over `allowedSwaps` — within a component, `source` values can be freely permuted among each other. For each component, count how many `source` values (as a multiset) can be matched against the corresponding `target` values; indices whose value has no remaining match contribute to the Hamming distance.

## C# Solution

```csharp
public class Solution
{
    public int MinimumHammingDistance(int[] source, int[] target, int[][] allowedSwaps)
    {
        int n = source.Length;
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;

        int Find(int x) => parent[x] == x ? x : (parent[x] = Find(parent[x]));

        foreach (var s in allowedSwaps)
        {
            int a = Find(s[0]), b = Find(s[1]);
            if (a != b) parent[a] = b;
        }

        var groups = new Dictionary<int, List<int>>();
        for (int i = 0; i < n; i++)
        {
            int root = Find(i);
            if (!groups.TryGetValue(root, out var list)) groups[root] = list = new List<int>();
            list.Add(i);
        }

        int mismatches = 0;
        foreach (var group in groups.Values)
        {
            var sourceCount = new Dictionary<int, int>();
            foreach (int idx in group)
                sourceCount[source[idx]] = sourceCount.GetValueOrDefault(source[idx], 0) + 1;

            foreach (int idx in group)
            {
                if (sourceCount.TryGetValue(target[idx], out int c) && c > 0)
                    sourceCount[target[idx]] = c - 1;
                else
                    mismatches++;
            }
        }

        return mismatches;
    }
}
```

## Complexity

- **Time:** `O(n * alpha(n))` for union-find plus `O(n)` for the grouping pass.
- **Space:** `O(n)`.
