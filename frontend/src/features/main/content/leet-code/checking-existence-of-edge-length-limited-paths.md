# 1697. Checking Existence of Edge Length Limited Paths

**Difficulty:** Hard
**Category:** Array, Union Find, Graph, Sorting

## Problem

Given an undirected weighted graph (`edgeList[i] = [u, v, weight]`) and a list of `queries[j] = [pj, qj, limitj]`, determine for each query whether there exists a path between `pj` and `qj` using only edges with weight strictly less than `limitj`.

### Example

```
Input: n = 3, edgeList = [[0,1,2],[1,2,4],[2,0,8],[1,0,16]], queries = [[0,1,2],[0,2,5]]
Output: [false,true]
```

## Approach

Sort both the edges and the queries by weight/limit ascending. Process queries in increasing order of `limit`, using a pointer that incrementally unions edges (via Union-Find) as long as their weight is strictly less than the current query's limit — since queries are processed in sorted order, previously unioned edges remain valid for later (larger-limit) queries, so no edge is ever unioned twice. Answer each query with an O(1) `Find` comparison, then restore results to the original query order using a saved index.

## C# Solution

```csharp
public class Solution
{
    private int[] parent;

    public bool[] DistanceLimitedPathsExist(int n, int[][] edgeList, int[][] queries)
    {
        parent = new int[n];

        for (int i = 0; i < n; i++)
        {
            parent[i] = i;
        }

        Array.Sort(edgeList, (a, b) => a[2] - b[2]);

        int m = queries.Length;
        int[][] indexedQueries = new int[m][];

        for (int i = 0; i < m; i++)
        {
            indexedQueries[i] = new int[] { queries[i][0], queries[i][1], queries[i][2], i };
        }

        Array.Sort(indexedQueries, (a, b) => a[2] - b[2]);

        bool[] result = new bool[m];
        int edgeIndex = 0;

        foreach (var query in indexedQueries)
        {
            while (edgeIndex < edgeList.Length && edgeList[edgeIndex][2] < query[2])
            {
                Union(edgeList[edgeIndex][0], edgeList[edgeIndex][1]);
                edgeIndex++;
            }

            result[query[3]] = Find(query[0]) == Find(query[1]);
        }

        return result;
    }

    private int Find(int x)
    {
        if (parent[x] != x)
        {
            parent[x] = Find(parent[x]);
        }

        return parent[x];
    }

    private void Union(int a, int b)
    {
        int rootA = Find(a);
        int rootB = Find(b);

        if (rootA != rootB)
        {
            parent[rootA] = rootB;
        }
    }
}
```

## Complexity

- **Time:** `O((E + Q) log(E + Q))`.
- **Space:** `O(n + Q)`.
