# 3624. Number of Integers With Popcount-Depth Equal to K II

**Difficulty:** Hard
**Category:** Array, Divide and Conquer, Binary Indexed Tree, Segment Tree

## Problem
You are given an integer array `nums`. For a positive integer `x`, define `p_0 = x` and `p_{i+1} = popcount(p_i)` (the number of set bits of `p_i`). This sequence eventually reaches 1. The popcount-depth of `x` is the smallest `d >= 0` such that `p_d = 1`.

You are given a 2D array `queries`, where each query is either:
- `[1, l, r, k]`: count indices `j` with `l <= j <= r` such that the popcount-depth of `nums[j]` equals `k`.
- `[2, idx, val]`: set `nums[idx] = val`.

Return an array with the answer for each query of the first type, in order.

### Example
Input: `nums = [2,4], queries = [[1,0,1,1],[2,1,1],[1,0,1,0]]`
Output: `[2,1]`
Explanation: `popcount-depth(2) = 1` (2 → 1), `popcount-depth(4) = 1` (4 → 1 → 1... actually 4 → 1 directly since popcount(4) = 1). Query `[1,0,1,1]` counts indices with depth 1: both, so 2. After `nums[1] = 1` (depth 0), query `[1,0,1,0]` counts indices with depth 0: just index 1, so 1.

Constraints:
- `1 <= nums.length <= 10^5`
- `1 <= nums[i], val <= 10^15`
- `0 <= k <= 5`

## Approach
Since values are at most `10^15` (about 50 bits), the popcount-depth is always small (at most a handful of steps, well within the guaranteed `k <= 5`), so it can be computed directly by repeatedly applying `popcount` until reaching 1.

Maintain six Binary Indexed Trees (Fenwick trees), one per possible depth `0..5`, each storing a 1 at position `i` if `depth(nums[i])` equals that tree's depth. A range-count query `[l, r]` for depth `k` is answered with `fenw[k].RangeSum(l, r)`. An update `[2, idx, val]` removes index `idx` from its old depth's tree and inserts it into the new depth's tree.

## C# Solution

```csharp
public class Solution {
    private class BIT {
        private readonly int[] tree;
        private readonly int n;

        public BIT(int n) {
            this.n = n;
            tree = new int[n + 1];
        }

        public void Update(int i, int delta) {
            for (i++; i <= n; i += i & (-i)) {
                tree[i] += delta;
            }
        }

        public int PrefixSum(int i) {
            int sum = 0;
            for (i++; i > 0; i -= i & (-i)) {
                sum += tree[i];
            }
            return sum;
        }

        public int RangeSum(int l, int r) {
            if (r < l) return 0;
            return PrefixSum(r) - (l > 0 ? PrefixSum(l - 1) : 0);
        }
    }

    public int[] PopcountDepth(long[] nums, long[][] queries) {
        int n = nums.Length;
        var trees = new BIT[6];
        for (int d = 0; d <= 5; d++) trees[d] = new BIT(n);

        int[] depth = new int[n];
        for (int i = 0; i < n; i++) {
            depth[i] = Depth(nums[i]);
            trees[depth[i]].Update(i, 1);
        }

        var results = new List<int>();
        foreach (var q in queries) {
            if (q[0] == 1) {
                int l = (int)q[1], r = (int)q[2], k = (int)q[3];
                results.Add(trees[k].RangeSum(l, r));
            } else {
                int idx = (int)q[1];
                long val = q[2];
                trees[depth[idx]].Update(idx, -1);
                depth[idx] = Depth(val);
                trees[depth[idx]].Update(idx, 1);
            }
        }

        return results.ToArray();
    }

    private int Depth(long x) {
        int d = 0;
        while (x != 1) {
            x = System.Numerics.BitOperations.PopCount((ulong)x);
            d++;
        }
        return d;
    }
}
```

## Complexity

- **Time:** O((n + q) log n), where q is the number of queries.
- **Space:** O(n)
