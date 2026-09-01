# 3600. Maximize Spanning Tree Stability with Upgrades

**Difficulty:** Hard
**Category:** Graph, Union Find, Binary Search, Minimum Spanning Tree

## Problem
You are given an integer `n` representing nodes labeled `0` to `n - 1`, a 2D array `edges` where `edges[i] = [u, v, weight, upgradedWeight]` describes an undirected edge between `u` and `v` with a base stability rating `weight`, which can be raised to `upgradedWeight` (`upgradedWeight >= weight`) by spending one upgrade. You are also given an integer `k`, the maximum number of edges you may upgrade in total. Choose a spanning tree over all `n` nodes (using at most `k` upgrades on its edges) that maximizes the **stability** of the tree, defined as the minimum edge rating among the edges used. Return the maximum achievable stability, or `-1` if no spanning tree can be formed even using all `k` upgrades.

## Approach
This is a bottleneck (maximize the minimum edge weight) spanning tree problem, solved with binary search on the answer combined with a Union-Find feasibility check.

Binary search over the sorted set of all distinct `weight` and `upgradedWeight` values for the largest threshold `T` such that a spanning tree can be built where every used edge has an effective rating `>= T`. For a fixed `T`, check feasibility greedily:
1. First union every edge whose base `weight >= T` — these are usable for free.
2. For the remaining disconnected components, use edges whose `weight < T` but `upgradedWeight >= T` — each such edge costs exactly one upgrade. Add them (via union-find) until the graph is fully connected or upgrades run out.
3. Feasible if the graph becomes one connected component using at most `k` upgrades.

The largest `T` for which this check succeeds is the answer.

## C# Solution

```csharp
public class Solution 
{
    public int MaxStability(int n, int[][] edges, int k) 
    {
        var candidateSet = new SortedSet<int>();
        foreach (var e in edges)
        {
            candidateSet.Add(e[2]);
            candidateSet.Add(e[3]);
        }

        var candidates = new List<int>(candidateSet);
        int lo = 0, hi = candidates.Count - 1, answer = -1;

        while (lo <= hi)
        {
            int mid = lo + (hi - lo) / 2;
            int threshold = candidates[mid];

            if (IsFeasible(n, edges, k, threshold))
            {
                answer = threshold;
                lo = mid + 1;
            }
            else
            {
                hi = mid - 1;
            }
        }

        return answer;
    }

    private bool IsFeasible(int n, int[][] edges, int k, int threshold)
    {
        int[] parent = new int[n];
        for (int i = 0; i < n; i++)
            parent[i] = i;

        int Find(int x)
        {
            while (parent[x] != x)
            {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        }

        bool Union(int a, int b)
        {
            int ra = Find(a), rb = Find(b);
            if (ra == rb) return false;
            parent[ra] = rb;
            return true;
        }

        int components = n;

        foreach (var e in edges)
        {
            if (e[2] >= threshold && Union(e[0], e[1]))
                components--;
        }

        int upgradesUsed = 0;
        foreach (var e in edges)
        {
            if (components == 1)
                break;

            if (e[2] < threshold && e[3] >= threshold && Find(e[0]) != Find(e[1]))
            {
                if (upgradesUsed >= k)
                    continue;

                Union(e[0], e[1]);
                components--;
                upgradesUsed++;
            }
        }

        return components == 1 && upgradesUsed <= k;
    }
}
```

## Complexity

- **Time:** O(E log E * α(n)) for the binary search combined with Union-Find checks
- **Space:** O(n + E)
