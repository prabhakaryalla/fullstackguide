# 3165. Maximum Sum of Subsequence With Non-adjacent Elements

**Difficulty:** Hard
**Category:** Array, Divide and Conquer, Dynamic Programming, Segment Tree

## Problem
You are given an integer array `nums` and a list of queries. Each query `[pos, x]` updates `nums[pos]` to `x`. After each update, compute the maximum possible sum of a subsequence of `nums` such that no two chosen elements are adjacent (a subsequence can also be empty, contributing sum 0). Return the sum of the answers to all queries, modulo `10^9 + 7`.

## Approach
Use a segment tree where each node stores four values representing the best achievable sum for the range it covers, categorized by whether the leftmost and rightmost elements of the range are included or excluded in the chosen subsequence: `(excludeLeft, excludeRight)`, `(excludeLeft, includeRight)`, `(includeLeft, excludeRight)`, `(includeLeft, includeRight)`. Merging two children combines these four values correctly, only allowing an inner boundary element to be selected by at most one side to preserve the non-adjacency constraint. After each point update, query the root node's four combinations and take the maximum (which represents the optimal non-adjacent subsequence sum, allowing an empty selection by clamping at 0 in the base case).

## C# Solution
```csharp
public class Solution {
    private const int kInf = 1_000_000_000;
    private int[][][] tree; // tree[node][l][r]
    private int n;

    public int MaximumSumSubsequence(int[] nums, int[][] queries) {
        const int kMod = 1_000_000_007;
        n = nums.Length;
        tree = new int[4 * n][][];
        Build(nums, 0, 0, n - 1);

        long ans = 0;
        foreach (int[] query in queries) {
            int pos = query[0];
            int x = query[1];
            Update(0, 0, n - 1, pos, x);
            int[][] res = tree[0];
            int best = Math.Max(Math.Max(res[0][0], res[0][1]), Math.Max(res[1][0], res[1][1]));
            ans = (ans + best) % kMod;
        }

        return (int)ans;
    }

    private void Build(int[] nums, int node, int lo, int hi) {
        if (lo == hi) {
            tree[node] = new int[][] {
                new int[] { 0, -kInf },
                new int[] { -kInf, nums[lo] }
            };
            return;
        }
        int mid = (lo + hi) / 2;
        Build(nums, 2 * node + 1, lo, mid);
        Build(nums, 2 * node + 2, mid + 1, hi);
        tree[node] = Merge(tree[2 * node + 1], tree[2 * node + 2]);
    }

    private void Update(int node, int lo, int hi, int i, int val) {
        if (lo == hi) {
            tree[node] = new int[][] {
                new int[] { 0, -kInf },
                new int[] { -kInf, val }
            };
            return;
        }
        int mid = (lo + hi) / 2;
        if (i <= mid)
            Update(2 * node + 1, lo, mid, i, val);
        else
            Update(2 * node + 2, mid + 1, hi, i, val);
        tree[node] = Merge(tree[2 * node + 1], tree[2 * node + 2]);
    }

    private int[][] Merge(int[][] a, int[][] b) {
        int[][] node = new int[][] { new int[2], new int[2] };
        for (int l = 0; l < 2; l++)
            for (int r = 0; r < 2; r++)
                node[l][r] = Math.Max(Math.Max(a[l][0] + b[0][r], a[l][0] + b[1][r]), a[l][1] + b[0][r]);
        return node;
    }
}
```

## Complexity
- Time: O(n + q log n)
- Space: O(n)
