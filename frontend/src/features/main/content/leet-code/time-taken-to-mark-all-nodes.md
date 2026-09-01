# 3241. Time Taken to Mark All Nodes

**Difficulty:** Hard
**Category:** Depth-First Search, Dynamic Programming, Graph, Tree

## Problem
Given an undirected tree, "marking" spreads through the tree over time: at time 0, exactly one node is marked. A node with an even index takes 2 units of time to become marked once one of its neighbors is marked; a node with an odd index takes 1 unit of time. For every possible starting node, determine the total time required until every node in the tree becomes marked.

## Approach
Use the classic "rerooting" technique. First, root the tree arbitrarily (say at node 0) and perform a DFS to compute, for each node, the time to mark its entire subtree, tracking the top two largest child-subtree-completion times (needed later for handling rerooting exclusions). Then perform a second DFS ("reroot") that, for each node, combines the best "downward" time (from its own subtree, computed in the first pass) with the best "upward" time (representing the longest path reaching this node from outside its subtree, passed down from the parent during rerooting), determining the overall time to mark all nodes if that node were the start. When rerooting into a child, the "upward" contribution passed to that child uses the maximum of the parent's own upward value and the parent's best subtree time excluding that specific child's contribution (using the precomputed top-2 tracking to avoid double-using a child's own subtree time as its incoming upward value).

## C# Solution
```csharp
public class Solution {
    private class Node {
        public int NodeId;
        public int Time;
        public Node(int nodeId = 0, int time = 0) { NodeId = nodeId; Time = time; }
    }

    private Node[] top1;
    private Node[] top2;
    private List<int>[] tree;

    public int[] TimeTaken(int[][] edges) {
        int n = edges.Length + 1;
        int[] ans = new int[n];
        tree = new List<int>[n];
        for (int i = 0; i < n; i++)
            tree[i] = new List<int>();
        top1 = new Node[n];
        top2 = new Node[n];
        for (int i = 0; i < n; i++) {
            top1[i] = new Node();
            top2[i] = new Node();
        }

        foreach (int[] edge in edges) {
            int u = edge[0], v = edge[1];
            tree[u].Add(v);
            tree[v].Add(u);
        }

        Dfs(0, -1);
        Reroot(0, -1, 0, ans);
        return ans;
    }

    private int GetTime(int u) => u % 2 == 0 ? 2 : 1;

    private int Dfs(int u, int prev) {
        Node t1 = new Node();
        Node t2 = new Node();
        foreach (int v in tree[u]) {
            if (v == prev) continue;
            int time = Dfs(v, u) + GetTime(v);
            if (time >= t1.Time) {
                t2 = t1;
                t1 = new Node(v, time);
            } else if (time > t2.Time) {
                t2 = new Node(v, time);
            }
        }
        top1[u] = t1;
        top2[u] = t2;
        return t1.Time;
    }

    private void Reroot(int u, int prev, int maxTime, int[] ans) {
        ans[u] = Math.Max(maxTime, top1[u].Time);
        foreach (int v in tree[u]) {
            if (v == prev) continue;
            int newMaxTime = GetTime(u) + Math.Max(maxTime, top1[u].NodeId == v ? top2[u].Time : top1[u].Time);
            Reroot(v, u, newMaxTime, ans);
        }
    }
}
```

## Complexity
- Time: O(n)
- Space: O(n)
