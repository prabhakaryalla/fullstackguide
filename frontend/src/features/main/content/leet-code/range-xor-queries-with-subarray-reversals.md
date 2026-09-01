# 3526. Range XOR Queries with Subarray Reversals

**Difficulty:** Hard
**Category:** Array, Design, Bit Manipulation, Tree
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given an integer array `nums` and a list of `queries`, where each query is one of:
- `[1, index, val]`: set `nums[index] = val`.
- `[2, left, right]`: report the XOR of all elements in `nums[left..right]`.
- `[3, left, right]`: reverse the subarray `nums[left..right]` in place (the reversal persists for future queries).

Return an array containing the answer to each type-2 query, in order.

### Example
`nums = [1,2,3,4]`, query `[3,1,2]` reverses to `[1,3,2,4]`; a following `[2,0,1]` query returns `1 ^ 3 = 2`.

## Approach
Reversing a range does not change the XOR of that **entire** range (XOR is commutative), but it does change the result of queries over **partial** overlaps with a previously reversed range, so the actual sequence of elements must be tracked precisely.

Use an implicit **treap** (a randomized balanced BST ordered by array position) where each node stores its value and the XOR of its subtree, plus a lazy `reversed` flag:
- `Split(root, k, out left, out right)` splits the treap into the first `k` elements and the rest, pushing down any pending reversal flag first.
- `Merge(left, right)` merges two treaps back together, respecting priorities to keep the tree balanced in expectation.
- A pending `reversed` flag on a node means its two children (and their subtree XOR) should be swapped when pushed down, with the flag propagated to both children.

Point update, range XOR query, and range reverse are each implemented as a `Split`/`Merge` pair around the target range boundaries, giving `O(log n)` expected time per operation.

## C# Solution

```csharp
public class Solution {
    private class Node {
        public int Val;
        public int SubXor;
        public int Size = 1;
        public bool Reversed;
        public long Priority;
        public Node Left, Right;
        public Node(int val) { Val = val; SubXor = val; Priority = Rng.NextInt64(); }
        private static readonly Random Rng = new Random();
    }

    private Node _root;

    public int[] GetResults(int[] nums, int[][] queries) {
        foreach (int num in nums) _root = Merge(_root, new Node(num));

        var ans = new List<int>();
        foreach (int[] query in queries) {
            int type = query[0];
            if (type == 1) {
                UpdateValue(query[1], query[2]);
            } else if (type == 2) {
                ans.Add(RangeXor(query[1], query[2]));
            } else {
                ReverseRange(query[1], query[2]);
            }
        }

        return ans.ToArray();
    }

    private void UpdateValue(int index, int val) {
        Split(_root, index, out Node left, out Node mid);
        Split(mid, 1, out Node target, out Node right);
        if (target != null) target.Val = val;
        Update(target);
        _root = Merge(Merge(left, target), right);
    }

    private int RangeXor(int left, int right) {
        Split(_root, left, out Node l, out Node r);
        Split(r, right - left + 1, out Node m, out r);
        int res = GetXor(m);
        _root = Merge(Merge(l, m), r);
        return res;
    }

    private void ReverseRange(int left, int right) {
        Split(_root, left, out Node l, out Node r);
        Split(r, right - left + 1, out Node m, out r);
        if (m != null) m.Reversed = !m.Reversed;
        _root = Merge(Merge(l, m), r);
    }

    private int GetSize(Node t) => t?.Size ?? 0;
    private int GetXor(Node t) => t?.SubXor ?? 0;

    private void Push(Node t) {
        if (t == null || !t.Reversed) return;
        (t.Left, t.Right) = (t.Right, t.Left);
        if (t.Left != null) t.Left.Reversed = !t.Left.Reversed;
        if (t.Right != null) t.Right.Reversed = !t.Right.Reversed;
        t.Reversed = false;
    }

    private void Update(Node t) {
        if (t == null) return;
        t.Size = 1 + GetSize(t.Left) + GetSize(t.Right);
        t.SubXor = t.Val ^ GetXor(t.Left) ^ GetXor(t.Right);
    }

    private void Split(Node t, int k, out Node left, out Node right) {
        if (t == null) { left = right = null; return; }
        Push(t);
        if (GetSize(t.Left) >= k) {
            Split(t.Left, k, out left, out Node newLeftRight);
            t.Left = newLeftRight;
            right = t;
        } else {
            Split(t.Right, k - GetSize(t.Left) - 1, out Node newRightLeft, out right);
            t.Right = newRightLeft;
            left = t;
        }
        Update(t);
    }

    private Node Merge(Node l, Node r) {
        Push(l);
        Push(r);
        if (l == null || r == null) return l ?? r;
        if (l.Priority > r.Priority) {
            l.Right = Merge(l.Right, r);
            Update(l);
            return l;
        } else {
            r.Left = Merge(l, r.Left);
            Update(r);
            return r;
        }
    }
}
```

## Complexity

- **Time:** O((n + q) log n) expected, for building the treap and processing all queries
- **Space:** O(n) for the treap nodes
