# 1782. Count Pairs Of Nodes

**Difficulty:** Hard
**Category:** Array, Two Pointers, Graph, Sorting

## Problem

Given `n` nodes, an (possibly repeated) edge list, and `queries`, define for a pair `(a, b)` (`a < b`) its "incidence" as the number of edges incident to either `a` or `b` (edges directly between `a` and `b` counted once, not twice). For each query, return the number of pairs whose incidence is strictly greater than the query value.

### Example

```
Input: n = 4, edges = [[1,2],[2,4],[1,3],[2,3],[2,1]], queries = [2,3]
Output: [6,5]
```

## Approach

Compute each node's raw degree and record, for every pair of nodes that share a direct edge, how many parallel edges connect them. For a query, first count pairs using a two-pointer sweep over the sorted degree array (`degree[u] + degree[v] > query`), which is correct for every pair *except* those sharing a direct edge, where the true incidence is `degree[u] + degree[v] - sharedEdges`. Adjust the naive count for exactly those specific pairs.

## C# Solution

```csharp
public class Solution
{
    public int[] CountPairs(int n, int[][] edges, int[] queries)
    {
        int[] degree = new int[n + 1];
        var sharedEdges = new Dictionary<long, int>();

        foreach (var e in edges)
        {
            int u = Math.Min(e[0], e[1]), v = Math.Max(e[0], e[1]);
            degree[u]++;
            degree[v]++;

            long key = (long)u * (n + 1) + v;
            sharedEdges[key] = sharedEdges.GetValueOrDefault(key, 0) + 1;
        }

        int[] sortedDeg = new int[n];
        Array.Copy(degree, 1, sortedDeg, 0, n);
        Array.Sort(sortedDeg);

        int[] result = new int[queries.Length];
        for (int qi = 0; qi < queries.Length; qi++)
        {
            int q = queries[qi];
            long count = 0;

            int lo = 0, hi = n - 1;
            while (lo < hi)
            {
                if (sortedDeg[lo] + sortedDeg[hi] > q)
                {
                    count += hi - lo;
                    hi--;
                }
                else
                {
                    lo++;
                }
            }

            foreach (var kv in sharedEdges)
            {
                int u = (int)(kv.Key / (n + 1));
                int v = (int)(kv.Key % (n + 1));
                int naive = degree[u] + degree[v];
                int actual = naive - kv.Value;
                bool wasCounted = naive > q;
                bool shouldCount = actual > q;

                if (wasCounted && !shouldCount) count--;
                else if (!wasCounted && shouldCount) count++;
            }

            result[qi] = (int)count;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O((n + m) log n)` for sorting plus `O(m)` adjustment work per query, where `m` is the number of distinct connected pairs.
- **Space:** `O(n + m)`.
