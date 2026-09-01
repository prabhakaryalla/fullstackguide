# 3547. Maximum Sum of Edge Values in a Graph

**Difficulty:** Hard
**Category:** Graph, Greedy, Math

## Problem
You are given an integer `n` and an undirected graph on `n` nodes (labeled `0` to `n-1`) described by exactly `n` edges, where every node has degree at most `2` (so the graph is a disjoint union of simple cycles and simple paths). Assign the integers `1` to `n` to the nodes — one distinct integer per node — to **maximize** the sum, over all edges `(u, v)`, of `value(u) * value(v)`. Return the maximum possible sum.

### Example
For a single 3-node cycle `0-1-2-0`, assigning `{1,2,3}` in some order to maximize `v0*v1 + v1*v2 + v2*v0` gives `1*2+2*3+3*1 = 11`, which is optimal for this shape.

## Approach
Identify each connected component and classify it as a **cycle** (every node has degree exactly `2`) or a **path** (has endpoint(s) of degree `<= 1`, or is an isolated node). To maximize the total sum of adjacent products, the *largest* available values should be assigned to the *largest* components first (since larger structures have more adjacent pairs to benefit from large values), with cycles prioritized over paths of the same size because a cycle's "wrap-around" edge lets its two largest values multiply together as well.

For a component spanning a contiguous value range `[left, right]` (with `right` being the largest available value at that point), compute its optimal arrangement score with a greedy two-ended technique: repeatedly place the next-largest remaining value adjacent to whichever "end" value currently needs a bigger neighbor, using a small sliding window (deque) of the two most recently placed values to track adjacency products; for a cycle, also add the product of the component's two most extreme placed values to close the loop.

Process cycle components first (by descending size), consuming the largest available value range for each, then process path components (also sorted by descending size) with the remaining ranges, accumulating the total score.

## C# Solution

```csharp
public class Solution {
    public long MaxScore(int n, int[][] edges) {
        long ans = 0;
        var graph = new List<int>[n];
        for (int i = 0; i < n; i++) graph[i] = new List<int>();
        foreach (int[] edge in edges) {
            graph[edge[0]].Add(edge[1]);
            graph[edge[1]].Add(edge[0]);
        }

        var seen = new bool[n];
        var cycleSizes = new List<int>();
        var pathSizes = new List<int>();

        for (int i = 0; i < n; i++) {
            if (seen[i]) continue;
            List<int> component = GetComponent(graph, i, seen);
            bool allDegree2 = true;
            foreach (int u in component) {
                if (graph[u].Count != 2) { allDegree2 = false; break; }
            }
            if (allDegree2) cycleSizes.Add(component.Count);
            else if (component.Count > 1) pathSizes.Add(component.Count);
        }

        int remaining = n;
        foreach (int cycleSize in cycleSizes) {
            ans += CalculateScore(remaining - cycleSize + 1, remaining, true);
            remaining -= cycleSize;
        }

        pathSizes.Sort((a, b) => b.CompareTo(a));
        foreach (int pathSize in pathSizes) {
            ans += CalculateScore(remaining - pathSize + 1, remaining, false);
            remaining -= pathSize;
        }

        return ans;
    }

    private List<int> GetComponent(List<int>[] graph, int start, bool[] seen) {
        var component = new List<int> { start };
        seen[start] = true;
        for (int idx = 0; idx < component.Count; idx++) {
            int u = component[idx];
            foreach (int v in graph[u]) {
                if (seen[v]) continue;
                component.Add(v);
                seen[v] = true;
            }
        }
        return component;
    }

    private long CalculateScore(int left, int right, bool isCycle) {
        var window = new LinkedList<long>();
        window.AddLast(right);
        window.AddLast(right);
        long score = 0;

        for (int value = right - 1; value >= left; value--) {
            long windowValue = window.First.Value;
            window.RemoveFirst();
            score += windowValue * value;
            window.AddLast(value);
        }

        long w0 = window.First.Value;
        long w1 = window.Last.Value;
        return score + (isCycle ? w0 * w1 : 0);
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting path components, plus O(n) for the component discovery and score computation
- **Space:** O(n) for the adjacency list and component tracking
