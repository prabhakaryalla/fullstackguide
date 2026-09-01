# 3310. Remove Methods From Project

**Difficulty:** Medium
**Category:** Array, Hash Table, Depth-First Search, Breadth-First Search, Graph

## Problem

You are maintaining a project that has `n` methods numbered from `0` to `n - 1`.

You are given two integers `n` and `k`, and a 2D integer array `invocations`, where `invocations[i] = [a, b]` indicates that method `a` invokes method `b`.

There is a known bug in method `k`. Method `k`, along with any method invoked by it directly or indirectly, is considered suspicious, and we want to remove all suspicious methods.

A group of methods can only be removed if no method outside the group invokes any method within it.

Return an array containing all the remaining methods after removing all the suspicious methods (in any order). If it is not possible to remove all the suspicious methods, none should be removed, and all methods `0` to `n - 1` should be returned.

### Example

Input: `n = 5, k = 0, invocations = [[1,2],[0,2],[0,1],[3,4]]`

Output: `[3,4]`

Explanation: Methods 0, 1, and 2 are suspicious (0 invokes 1 and 2). Since no method outside {0,1,2} invokes any of them, they can all be removed, leaving `[3,4]`.

## Approach

1. Build a directed adjacency list from `invocations`.
2. Find every method reachable from `k` (via BFS/DFS following edges forward) — this is the suspicious set `S`.
3. Check every edge `(a, b)`: if `b` is in `S` but `a` is not, then an outside method invokes a suspicious one, so nothing can be removed — return all methods `0..n-1`.
4. Otherwise, return every method not in `S`.

## C# Solution

```csharp
public class Solution 
{
    public int[] RemainingMethods(int n, int k, int[][] invocations) 
    {
        var adj = new System.Collections.Generic.List<int>[n];
        for (int i = 0; i < n; i++) adj[i] = new System.Collections.Generic.List<int>();
        foreach (var e in invocations) adj[e[0]].Add(e[1]);

        bool[] suspicious = new bool[n];
        suspicious[k] = true;
        var queue = new System.Collections.Generic.Queue<int>();
        queue.Enqueue(k);
        while (queue.Count > 0)
        {
            int u = queue.Dequeue();
            foreach (int v in adj[u])
            {
                if (!suspicious[v])
                {
                    suspicious[v] = true;
                    queue.Enqueue(v);
                }
            }
        }

        foreach (var e in invocations)
        {
            int a = e[0], b = e[1];
            if (suspicious[b] && !suspicious[a])
            {
                int[] all = new int[n];
                for (int i = 0; i < n; i++) all[i] = i;
                return all;
            }
        }

        var result = new System.Collections.Generic.List<int>();
        for (int i = 0; i < n; i++)
        {
            if (!suspicious[i]) result.Add(i);
        }
        return result.ToArray();
    }
}
```

## Complexity

- **Time:** O(n + e) where e is the number of invocations.
- **Space:** O(n + e).
