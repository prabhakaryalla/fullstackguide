# 2076. Process Restricted Friend Requests

**Difficulty:** Hard
**Category:** Union Find, Graph, Array

## Problem

There are `n` people (numbered `0` to `n - 1`) and a list of `restrictions`, where `restrictions[i] = [xi, yi]` means persons `xi` and `yi` must **never** become friends (directly or transitively through a chain of friendships). Given a list of `requests`, where `requests[j] = [uj, vj]` asks to make `uj` and `vj` friends, process the requests **in order**: a request succeeds (and the friendship, including all its transitive consequences, is formed) unless it would cause two restricted people to end up in the same friend group; otherwise it's rejected and has no effect. Return a boolean array indicating whether each request succeeded.

## Approach

Use a Union-Find (Disjoint Set Union) structure over the `n` people. For each request `(u, v)` in order: first check whether merging `u`'s and `v`'s groups would place any restricted pair `(a, b)` in the same group — this happens if, after the hypothetical merge, `find(a) == find(b)` for some restriction. Since `restrictions.Length` and `requests.Length` are both small (at most `1000`), it's efficient to check every restriction against the *current* group roots for `u` and `v`: a restriction `(a, b)` would become violated exactly when one of `a, b` is in `u`'s current group and the other is in `v`'s current group (or vice versa). If no restriction would be violated, perform the union and mark the request as successful; otherwise leave the structure unchanged and mark it as failed.

## C# Solution

```csharp
public class Solution
{
    private int[] parent;

    public bool[] FriendRequests(int n, int[][] restrictions, int[][] requests)
    {
        parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;

        var result = new bool[requests.Length];

        for (int i = 0; i < requests.Length; i++)
        {
            int u = requests[i][0], v = requests[i][1];
            int rootU = Find(u), rootV = Find(v);

            if (rootU == rootV)
            {
                result[i] = true;
                continue;
            }

            bool violates = false;
            foreach (var restriction in restrictions)
            {
                int rootA = Find(restriction[0]);
                int rootB = Find(restriction[1]);

                bool crossesA = (rootA == rootU && rootB == rootV) || (rootA == rootV && rootB == rootU);
                if (crossesA)
                {
                    violates = true;
                    break;
                }
            }

            if (!violates)
            {
                parent[rootU] = rootV;
                result[i] = true;
            }
        }

        return result;
    }

    private int Find(int x)
    {
        if (parent[x] != x) parent[x] = Find(parent[x]);
        return parent[x];
    }
}
```

## Complexity

- **Time:** `O(requests.Length * restrictions.Length * alpha(n))`.
- **Space:** `O(n)` for the union-find parent array.
