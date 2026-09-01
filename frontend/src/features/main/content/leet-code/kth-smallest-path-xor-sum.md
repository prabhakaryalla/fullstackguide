# 3590. Kth Smallest Path Xor Sum

**Difficulty:** Hard
**Category:** Tree, Bit Manipulation, Sorting

## Problem
You are given a rooted tree with `n` nodes described by a `parent` array (`parent[i]` is the parent of node `i`, and `-1` for the root) and a `values` array. For a query `[node, k]`, consider every ancestor `a` of `node` (including `node` itself, at distance 0) and compute the XOR of all node values on the path between `node` and `a` inclusive. Sort these path-XOR values ascending and return the `k`-th smallest (1-indexed), or `-1` if `k` exceeds the number of available ancestors.

## Approach
Precompute `xorFromRoot[x]`, the XOR of all values from the root to `x` inclusive, with one traversal. For an ancestor `a` of `node`, the XOR of the path from `a` to `node` inclusive is:

`xorFromRoot[node] XOR xorFromRoot[a] XOR values[a]`

(since `xorFromRoot[a] XOR values[a]` equals the prefix XOR up to `a`'s parent, cancelling everything above `a` from `xorFromRoot[node]`).

For each query, walk from `node` up to the root, computing this value for every ancestor, sort the collected values, and pick the `k`-th smallest.

## C# Solution

```csharp
public class Solution 
{
    public int[] KthSmallestPathXor(int[] parent, int[] values, int[][] queries)
    {
        int n = parent.Length;
        var children = new List<int>[n];
        for (int i = 0; i < n; i++) children[i] = new List<int>();
        int root = -1;
        for (int i = 0; i < n; i++)
        {
            if (parent[i] == -1) root = i;
            else children[parent[i]].Add(i);
        }

        var xorFromRoot = new int[n];
        var stack = new Stack<int>();
        stack.Push(root);
        xorFromRoot[root] = values[root];
        while (stack.Count > 0)
        {
            int u = stack.Pop();
            foreach (var c in children[u])
            {
                xorFromRoot[c] = xorFromRoot[u] ^ values[c];
                stack.Push(c);
            }
        }

        int m = queries.Length;
        var result = new int[m];
        for (int qi = 0; qi < m; qi++)
        {
            int node = queries[qi][0];
            long k = queries[qi][1];

            var xorValues = new List<int>();
            int cur = node;
            while (true)
            {
                int pathXor = xorFromRoot[node] ^ xorFromRoot[cur] ^ values[cur];
                xorValues.Add(pathXor);
                if (parent[cur] == -1) break;
                cur = parent[cur];
            }

            if (k > xorValues.Count)
            {
                result[qi] = -1;
            }
            else
            {
                xorValues.Sort();
                result[qi] = xorValues[(int)k - 1];
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(n) preprocessing, plus O(depth · log(depth)) per query for the sort.
- **Space:** O(n)
