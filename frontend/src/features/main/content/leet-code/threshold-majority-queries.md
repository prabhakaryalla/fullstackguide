# 3636. Threshold Majority Queries

**Difficulty:** Hard
**Category:** Array, Hash Table, Binary Search, Divide and Conquer, Counting, Prefix Sum

## Problem
You are given an integer array `nums` of length `n` and an array `queries`, where `queries[i] = [l_i, r_i, threshold_i]`.

Return an array `ans` where `ans[i]` is the element in `nums[l_i..r_i]` that appears at least `threshold_i` times, choosing the element with the highest frequency in that subarray (breaking ties by the smallest value); if no element meets the threshold, `ans[i] = -1`.

### Example
Input: `nums = [1,1,2,2,1,1], queries = [[0,5,4],[0,3,3],[2,3,2]]`
Output: `[1,-1,2]`
Explanation: `nums[0..5] = [1,1,2,2,1,1]` has 1 appearing 4 times (`>= 4`), so the answer is 1. `nums[0..3] = [1,1,2,2]` has both 1 and 2 appearing 2 times, neither reaches threshold 3, so -1. `nums[2..3] = [2,2]` has 2 appearing 2 times (`>= 2`), so the answer is 2.

Constraints:
- `1 <= n <= 10^4`
- `1 <= queries.length <= 5 * 10^4`
- `1 <= threshold_i <= r_i - l_i + 1`

## Approach
Since we always want the element with the globally highest frequency in the window, note that if the maximum frequency in the window is at least the threshold, that maximum-frequency element (smallest value in case of ties) is automatically a valid answer and the best possible one; if the maximum frequency is below the threshold, no element can qualify. So each query reduces to: find the maximum frequency in `nums[l..r]` and the smallest value achieving it, then compare that frequency against the threshold.

Answer all queries offline with Mo's algorithm: sort queries into `sqrt(n)`-sized blocks and process them by sliding the window `[l, r]` incrementally, maintaining a frequency count per (coordinate-compressed) value and, for each frequency `f`, a sorted set of values currently having that frequency. Track the current maximum frequency as the window changes, and answer each query by looking up the smallest value in the bucket for the current maximum frequency.

## C# Solution

```csharp
public class Solution {
    public int[] SubarrayMajority(int[] nums, int[][] queries) {
        int n = nums.Length;
        int[] sorted = (int[])nums.Clone();
        Array.Sort(sorted);
        var compress = new Dictionary<int, int>();
        int m = 0;
        foreach (int v in sorted) {
            if (!compress.ContainsKey(v)) compress[v] = m++;
        }
        int[] comp = new int[n];
        for (int i = 0; i < n; i++) comp[i] = compress[nums[i]];

        int q = queries.Length;
        int[] order = Enumerable.Range(0, q).ToArray();
        int block = Math.Max(1, (int)Math.Sqrt(n));
        Array.Sort(order, (a, b) => {
            int ba = queries[a][0] / block, bb = queries[b][0] / block;
            if (ba != bb) return ba.CompareTo(bb);
            return (ba % 2 == 0) ? queries[a][1].CompareTo(queries[b][1])
                                  : queries[b][1].CompareTo(queries[a][1]);
        });

        int[] cnt = new int[m];
        var buckets = new SortedSet<int>[n + 1];
        for (int f = 0; f <= n; f++) buckets[f] = new SortedSet<int>();
        int currentMax = 0;

        void Add(int idx) {
            int v = comp[idx];
            int old = cnt[v];
            if (old > 0) buckets[old].Remove(v);
            cnt[v] = old + 1;
            buckets[cnt[v]].Add(v);
            if (cnt[v] > currentMax) currentMax = cnt[v];
        }

        void Remove(int idx) {
            int v = comp[idx];
            int old = cnt[v];
            buckets[old].Remove(v);
            cnt[v] = old - 1;
            if (cnt[v] > 0) buckets[cnt[v]].Add(v);
            if (old == currentMax && buckets[currentMax].Count == 0) {
                while (currentMax > 0 && buckets[currentMax].Count == 0) currentMax--;
            }
        }

        int[] result = new int[q];
        int curL = 0, curR = -1;

        foreach (int qi in order) {
            int l = queries[qi][0], r = queries[qi][1], threshold = queries[qi][2];

            while (curR < r) Add(++curR);
            while (curL > l) Add(--curL);
            while (curR > r) Remove(curR--);
            while (curL < l) Remove(curL++);

            if (currentMax >= threshold) {
                int compVal = buckets[currentMax].Min;
                result[qi] = sorted[compVal];
            } else {
                result[qi] = -1;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** O((n + q) * sqrt(n) * log n)
- **Space:** O(n + q)
