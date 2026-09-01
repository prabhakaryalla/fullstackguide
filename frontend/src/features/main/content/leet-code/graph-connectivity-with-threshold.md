# 1627. Graph Connectivity With Threshold

**Difficulty:** Hard
**Category:** Math, Union Find, Number Theory

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

There are `n` cities numbered `1` to `n`. Two cities `x` and `y` are directly connected if they share a common divisor strictly greater than `threshold`. Given `queries` of city pairs, return whether each pair is connected (directly or transitively).

### Example

```
Input: n = 6, threshold = 2, queries = [[1,4],[2,5],[3,6]]
Output: [false,false,true]
```

## Approach

For every divisor `z` greater than `threshold`, union all multiples of `z` up to `n` (`z`, `2z`, `3z`, ...), since any two such multiples share `z` as a common divisor greater than the threshold. Using Union-Find keeps this efficient (harmonic-series total work, `O(n log n)`), after which each query is answered with a constant-time `Find` comparison.

## C# Solution

```csharp
public class Solution
{
    private int[] parent;

    public IList<bool> AreConnected(int n, int threshold, int[][] queries)
    {
        parent = new int[n + 1];
        for (int i = 0; i <= n; i++)
        {
            parent[i] = i;
        }

        for (int z = threshold + 1; z <= n; z++)
        {
            for (int multiple = 2 * z; multiple <= n; multiple += z)
            {
                Union(z, multiple);
            }
        }

        List<bool> result = new List<bool>();

        foreach (var query in queries)
        {
            result.Add(Find(query[0]) == Find(query[1]));
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

- **Time:** `O(n log n)` for the union phase plus `O(q)` for the queries.
- **Space:** `O(n)` for the union-find structure.
