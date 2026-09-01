# 1462. Course Schedule IV

**Difficulty:** Medium
**Category:** Graph, Topological Sort, Dynamic Programming, Breadth-First Search

## Problem

Given `n` courses and a list of prerequisite pairs `[a, b]` (meaning `a` must be taken before `b`), answer a list of `queries[i] = [u, v]`, each asking whether `u` is a (possibly transitive) prerequisite of `v`.

### Example

```
Input: numCourses = 2, prerequisites = [[1,0]], queries = [[0,1],[1,0]]
Output: [false,true]
```

## Approach

Compute full transitive reachability between all pairs of courses using a Floyd-Warshall-style closure: initialize a boolean reachability matrix directly from the given prerequisite edges, then for every intermediate course `k`, propagate reachability so that if `i` reaches `k` and `k` reaches `j`, then `i` also reaches `j`. Each query is then answered with a single matrix lookup.

## C# Solution

```csharp
public class Solution
{
    public IList<bool> CheckIfPrerequisite(int n, int[][] prerequisites, int[][] queries)
    {
        var reach = new bool[n, n];
        foreach (var p in prerequisites) reach[p[0], p[1]] = true;

        for (int k = 0; k < n; k++)
            for (int i = 0; i < n; i++)
                if (reach[i, k])
                    for (int j = 0; j < n; j++)
                        if (reach[k, j]) reach[i, j] = true;

        var result = new List<bool>();
        foreach (var q in queries) result.Add(reach[q[0], q[1]]);

        return result;
    }
}
```

## Complexity

- **Time:** `O(n^3)` for the transitive closure.
- **Space:** `O(n^2)` for the reachability matrix.
