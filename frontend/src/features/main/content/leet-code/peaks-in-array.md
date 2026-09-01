# 3187. Peaks in Array

**Difficulty:** Hard
**Category:** Array, Binary Indexed Tree, Segment Tree

## Problem
An element in an array is a "peak" if it is strictly greater than both its immediate neighbors (endpoints can never be peaks). You are given an array and a list of queries of two types: type 1 asks for the number of peaks within a given subrange `[l, r]` (excluding the endpoints `l` and `r` themselves from peak consideration, since peaks require both neighbors); type 2 updates a single array element to a new value. Answer all type-1 queries in order.

## Approach
Precompute a binary "peak" indicator array where `peak[i] = 1` if `nums[i]` is a peak, else `0` (endpoints are always 0). Build a Fenwick tree (or segment tree) over this peak indicator array to support range-sum queries and point updates efficiently. For a type-1 query on range `[l, r]`, the valid peak positions to count are strictly between `l` and `r` (i.e., indices `l+1` to `r-1`), so query the prefix-sum difference over that range (returning 0 if the range is too small to contain any valid peak position). For a type-2 update, change the value at the given index, then recompute the peak status of that index and its two immediate neighbors, updating the Fenwick tree with any deltas.

## C# Solution
```csharp
public class Solution {
    private class FenwickTree {
        private readonly int[] sums;

        public FenwickTree(int n) {
            sums = new int[n + 1];
        }

        public void Add(int i, int delta) {
            for (; i < sums.Length; i += i & (-i))
                sums[i] += delta;
        }

        public int Get(int i) {
            int sum = 0;
            for (; i > 0; i -= i & (-i))
                sum += sums[i];
            return sum;
        }
    }

    public IList<int> CountOfPeaks(int[] nums, int[][] queries) {
        List<int> ans = new List<int>();
        int[] peak = GetPeak(nums);
        FenwickTree tree = new FenwickTree(peak.Length);

        for (int i = 0; i < peak.Length; i++)
            tree.Add(i + 1, peak[i]);

        void Update(int i) {
            int newPeak = IsPeak(nums, i) ? 1 : 0;
            if (newPeak != peak[i]) {
                tree.Add(i + 1, newPeak - peak[i]);
                peak[i] = newPeak;
            }
        }

        foreach (int[] query in queries) {
            if (query[0] == 1) {
                int l = query[1];
                int r = query[2];
                ans.Add(r - l < 2 ? 0 : tree.Get(r) - tree.Get(l + 1));
            } else {
                int index = query[1];
                int val = query[2];
                nums[index] = val;
                Update(index);
                if (index > 0)
                    Update(index - 1);
                if (index + 1 < nums.Length)
                    Update(index + 1);
            }
        }

        return ans;
    }

    private int[] GetPeak(int[] nums) {
        int[] peak = new int[nums.Length];
        for (int i = 1; i + 1 < nums.Length; i++)
            peak[i] = (nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) ? 1 : 0;
        return peak;
    }

    private bool IsPeak(int[] nums, int i) {
        return i > 0 && i + 1 < nums.Length && nums[i] > nums[i - 1] && nums[i] > nums[i + 1];
    }
}
```

## Complexity
- Time: O((n + q) log n)
- Space: O(n + q)
