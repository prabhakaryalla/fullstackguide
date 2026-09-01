# 3525. Find X Value of Array II

**Difficulty:** Hard
**Category:** Array, Math, Segment Tree

## Problem
You are given an integer array `nums` and an integer `k`, along with a list of `queries`. Each query has the form `[index, value, start, x]` and is processed as follows:
1. Update `nums[index] = value`.
2. Count the number of subarrays that **start exactly at position `start`** and end anywhere from `start` to `n - 1`, whose product modulo `k` equals `x`.

Return an array of answers, one per query, computed after applying that query's update.

### Example
For `nums = [1,2,3,4]`, `k = 3`, a query `[1, 5, 0, 2]` first sets `nums[1] = 5`, then counts subarrays starting at index `0` (i.e. `[1,5]`, `[1,5,3]`, `[1,5,3,4]`, and `[1]`) whose product mod `3` equals `2`.

## Approach
Build a **segment tree** where each node over range `[lo, hi]` stores:
- `remain[r]` for `r` in `[0, k)`: the number of subarrays that start at `lo` (the node's leftmost index) and end anywhere within `[lo, hi]`, whose product modulo `k` equals `r`.
- `prod`: the product of **all** elements in `[lo, hi]`, modulo `k` (used to extend "start-anchored" subarrays across a merge boundary).

For a leaf `[i, i]`: `remain[nums[i] % k] = 1`, `prod = nums[i] % k`.

To merge a left child and right child:
- Copy the left child's `remain` counts as-is (subarrays fully inside the left half already anchored at `lo`).
- For every right-child remainder `j` with count `right.remain[j]`, extending a "start-at-lo" subarray through the entire left half and into the right half yields combined remainder `(left.prod * j) % k`; add `right.remain[j]` into `node.remain[(left.prod * j) % k]`.
- `node.prod = (left.prod * right.prod) % k`.

Each `update(index, value)` rebuilds the affected leaf and re-merges up to the root. Each query first performs the point update, then queries the range `[start, n - 1]` and reads `remain[x]` from the resulting merged node.

## C# Solution

```csharp
public class Solution {
    private class Node {
        public long[] Remain;
        public long Prod;
    }

    private int _n, _k;
    private Node[] _tree;

    public int[] ResultArray(int[] nums, int k, int[][] queries) {
        _k = k;
        _n = nums.Length;
        for (int i = 0; i < _n; i++) nums[i] %= k;
        _tree = new Node[4 * _n];
        Build(nums, 0, 0, _n - 1);

        var ans = new List<int>();
        foreach (int[] query in queries) {
            int index = query[0];
            int value = query[1] % k;
            int start = query[2];
            int x = query[3] % k;
            Update(0, 0, _n - 1, index, value);
            Node result = Query(0, 0, _n - 1, start, _n - 1);
            ans.Add((int)result.Remain[x]);
        }

        return ans.ToArray();
    }

    private void Build(int[] nums, int cur, int left, int right) {
        if (left == right) {
            _tree[cur] = new Node { Remain = new long[_k], Prod = nums[left] };
            _tree[cur].Remain[nums[left]] = 1;
            return;
        }
        int mid = (left + right) / 2;
        Build(nums, 2 * cur + 1, left, mid);
        Build(nums, 2 * cur + 2, mid + 1, right);
        _tree[cur] = Merge(_tree[2 * cur + 1], _tree[2 * cur + 2]);
    }

    private void Update(int cur, int lo, int hi, int index, int val) {
        if (lo == hi) {
            var remain = new long[_k];
            remain[val] = 1;
            _tree[cur] = new Node { Remain = remain, Prod = val };
            return;
        }
        int mid = (lo + hi) / 2;
        if (index <= mid) Update(2 * cur + 1, lo, mid, index, val);
        else Update(2 * cur + 2, mid + 1, hi, index, val);
        _tree[cur] = Merge(_tree[2 * cur + 1], _tree[2 * cur + 2]);
    }

    private Node Query(int cur, int lo, int hi, int i, int j) {
        if (i <= lo && hi <= j) return _tree[cur];
        int mid = (lo + hi) / 2;
        if (j <= mid) return Query(2 * cur + 1, lo, mid, i, j);
        if (i > mid) return Query(2 * cur + 2, mid + 1, hi, i, j);
        return Merge(Query(2 * cur + 1, lo, mid, i, j), Query(2 * cur + 2, mid + 1, hi, i, j));
    }

    private Node Merge(Node left, Node right) {
        var node = new Node { Remain = new long[_k], Prod = (left.Prod * right.Prod) % _k };
        for (int i = 0; i < _k; i++) node.Remain[i] = left.Remain[i];
        for (int i = 0; i < _k; i++) {
            if (right.Remain[i] == 0) continue;
            int idx = (int)((left.Prod * i) % _k);
            node.Remain[idx] += right.Remain[i];
        }
        return node;
    }
}
```

## Complexity

- **Time:** O(k * (n + q log n)) since building/merging each segment-tree node costs O(k) and there are O(log n) nodes touched per update/query
- **Space:** O(n * k) for the segment tree nodes
