# 3569. Maximize Count of Distinct Primes After Split

**Difficulty:** Hard
**Category:** Array, Hash Table, Math, Segment Tree, Number Theory, Ordered Set

## Problem
You are given an integer array `nums` of length `n` and a 2D integer array `queries` where `queries[i] = [idx, val]`.

For each query: update `nums[idx] = val`, then choose an integer `k` with `1 <= k < n` to split the array into the non-empty prefix `nums[0..k-1]` and suffix `nums[k..n-1]` such that the sum of the counts of distinct **prime values** in each part is maximum. Updates persist across queries.

Return an array containing the result for each query, in order.

### Example

```
Input: nums = [2,1,3,1,2], queries = [[1,2],[3,3]]
Output: [3,4]
Explanation:
After query 1, nums = [2,2,3,1,2]. Split into [2] and [2,3,1,2]: 1 + 2 = 3.
After query 2, nums = [2,2,3,3,2]. Split into [2,2,3] and [3,2]: 2 + 2 = 4.
```

**Constraints:**
- `2 <= n == nums.length <= 5 * 10^4`
- `1 <= queries.length <= 5 * 10^4`
- `1 <= nums[i] <= 10^5`

## Approach
For a fixed split point `k`, a prime value `p` contributes to the answer once if it occurs only in the prefix or only in the suffix, but contributes **twice** if it occurs in **both** parts. A prime value that appears only once in the whole array always contributes exactly 1, regardless of `k`. A prime value with first occurrence `f` and last occurrence `l` (with at least 2 occurrences) contributes an *extra* +1 (on top of the baseline 1) precisely when the split point `k` satisfies `f < k <= l`.

So `answer(k) = baseline + overlap(k)`, where `baseline` is the total count of distinct prime values present anywhere in the array, and `overlap(k)` is the number of multi-occurrence primes whose range `(f, l]` contains `k`. Maintain, for every prime value, a sorted set of its occurrence indices; when a value at some index changes, remove the old range contribution `(f_old, l_old]` (a range-add of -1) if it had at least 2 occurrences, update the sorted set, and re-add the new range contribution if it now has at least 2 occurrences. Use a segment tree with lazy propagation supporting range-add and range-max to track `overlap(k)` for `k` in `[1, n-1]`, and answer each query with `baseline + max(overlap)`.

## C# Solution

```csharp
public class Solution 
{
    private const int MOD = 1_000_000_007;
    private const int MaxVal = 100000;
    private bool[] isPrime;
    private Dictionary<int, SortedSet<int>> positions = new Dictionary<int, SortedSet<int>>();
    private int distinctPrimeCount = 0;
    private long[] tree;
    private long[] lazy;
    private int treeSize;

    public int[] MaximumCount(int[] nums, int[][] queries) 
    {
        Sieve();

        int n = nums.Length;
        treeSize = n;
        tree = new long[4 * treeSize];
        lazy = new long[4 * treeSize];

        for (int i = 0; i < n; i++) InsertValue(nums[i], i, n);

        int[] answer = new int[queries.Length];
        for (int q = 0; q < queries.Length; q++)
        {
            int idx = queries[q][0];
            int val = queries[q][1];

            RemoveValue(nums[idx], idx, n);
            nums[idx] = val;
            InsertValue(nums[idx], idx, n);

            long maxOverlap = 0;
            if (n >= 2) maxOverlap = QueryMax(1, 0, treeSize - 1, 1, n - 1);
            answer[q] = (int)((distinctPrimeCount + maxOverlap) % MOD);
        }

        return answer;
    }

    private void Sieve()
    {
        isPrime = new bool[MaxVal + 1];
        for (int i = 2; i <= MaxVal; i++) isPrime[i] = true;
        for (int i = 2; (long)i * i <= MaxVal; i++)
        {
            if (isPrime[i])
            {
                for (int j = i * i; j <= MaxVal; j += i) isPrime[j] = false;
            }
        }
    }

    private void InsertValue(int val, int idx, int n)
    {
        if (val > MaxVal || !isPrime[val]) return;
        if (!positions.TryGetValue(val, out var set))
        {
            set = new SortedSet<int>();
            positions[val] = set;
        }

        bool wasEmpty = set.Count == 0;
        bool hadRange = set.Count >= 2;
        if (hadRange) RangeAdd(set.Min + 1, set.Max, -1, n);

        set.Add(idx);
        if (wasEmpty) distinctPrimeCount++;
        if (set.Count >= 2) RangeAdd(set.Min + 1, set.Max, 1, n);
    }

    private void RemoveValue(int val, int idx, int n)
    {
        if (val > MaxVal || !isPrime[val]) return;
        if (!positions.TryGetValue(val, out var set) || !set.Contains(idx)) return;

        bool hadRange = set.Count >= 2;
        if (hadRange) RangeAdd(set.Min + 1, set.Max, -1, n);

        set.Remove(idx);
        if (set.Count == 0) distinctPrimeCount--;
        else if (set.Count >= 2) RangeAdd(set.Min + 1, set.Max, 1, n);
    }

    private void RangeAdd(int l, int r, long delta, int n)
    {
        l = Math.Max(l, 1);
        r = Math.Min(r, n - 1);
        if (l > r) return;
        RangeAddInternal(1, 0, treeSize - 1, l, r, delta);
    }

    private void Push(int node)
    {
        if (lazy[node] != 0)
        {
            for (int child = 2 * node; child <= 2 * node + 1; child++)
            {
                tree[child] += lazy[node];
                lazy[child] += lazy[node];
            }
            lazy[node] = 0;
        }
    }

    private void RangeAddInternal(int node, int start, int end, int l, int r, long delta)
    {
        if (r < start || end < l) return;
        if (l <= start && end <= r)
        {
            tree[node] += delta;
            lazy[node] += delta;
            return;
        }
        Push(node);
        int mid = (start + end) / 2;
        RangeAddInternal(2 * node, start, mid, l, r, delta);
        RangeAddInternal(2 * node + 1, mid + 1, end, l, r, delta);
        tree[node] = Math.Max(tree[2 * node], tree[2 * node + 1]);
    }

    private long QueryMax(int node, int start, int end, int l, int r)
    {
        if (r < start || end < l) return long.MinValue;
        if (l <= start && end <= r) return tree[node];
        Push(node);
        int mid = (start + end) / 2;
        long leftMax = QueryMax(2 * node, start, mid, l, r);
        long rightMax = QueryMax(2 * node + 1, mid + 1, end, l, r);
        return Math.Max(leftMax, rightMax);
    }
}
```

## Complexity

- **Time:** O((n + q) log n), for the sieve, segment tree updates, and queries.
- **Space:** O(n + MaxVal), for the segment tree and sieve tables.
