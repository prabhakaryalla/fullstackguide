# 3505. Minimum Operations to Make Elements Within K Subarrays Equal

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Heap (Priority Queue), Sliding Window

## Problem
You are given an integer array `nums` and integers `x` and `k`.

Select `k` **disjoint** subarrays of `nums`, each of length exactly `x`. For each selected subarray, you may perform any number of operations where each operation increases or decreases one of its elements by 1; the cost of a subarray is the minimum number of such operations needed to make all of its elements equal (elements outside the chosen subarrays are left untouched and cost nothing). Return the minimum possible total cost over all ways to choose `k` disjoint length-`x` subarrays.

### Example
Input: `nums = [1, 3, 2]`, `x = 2`, `k = 1`
Output: `1`
Explanation: The subarray `[3, 2]` (indices 1-2) can be equalized to either `2` or `3` with a single operation (`|3-2| + |2-2| = 1`), which is cheaper than equalizing `[1, 3]` (which costs 2). Choosing one subarray, the minimum cost is 1.

## Approach
For a fixed window of length `x`, the minimum number of unit operations to make all its elements equal is achieved by targeting the **median**, and equals the sum of absolute differences from the median. Maintain a sliding window of size `x` using two balanced multisets (a "lower half" and an "upper half", kept balanced in size) so the median can be tracked and the cost recomputed in roughly logarithmic time as the window slides, producing an array `minOps[i]` = cost of the window starting at index `i`.

Then solve with DP over `(index, remaining k)`: `Solve(i, k)` either skips index `i` (`Solve(i + 1, k)`) or, if a window fits (`i + x <= n`), takes the window `[i, i + x - 1]` at cost `minOps[i]` and continues with `Solve(i + x, k - 1)`. The answer is `Solve(0, k)`.

## C# Solution

```csharp
public class Solution {
    private const long Inf = long.MaxValue / 2;

    public long MinOperations(int[] nums, int x, int k) {
        long[] minOps = GetMinOps(nums, x);
        int n = nums.Length;
        long[,] memo = new long[n + 1, k + 1];
        bool[,] computed = new bool[n + 1, k + 1];
        return Solve(0, k, x, minOps, n, memo, computed);
    }

    private long Solve(int i, int k, int x, long[] minOps, int n, long[,] memo, bool[,] computed) {
        if (k == 0) return 0;
        if (i == n) return Inf;
        if (computed[i, k]) return memo[i, k];
        computed[i, k] = true;

        long skip = Solve(i + 1, k, x, minOps, n, memo, computed);
        long pick = Inf;
        if (i + x <= n) {
            long rest = Solve(i + x, k - 1, x, minOps, n, memo, computed);
            if (rest < Inf) pick = minOps[i] + rest;
        }

        return memo[i, k] = Math.Min(skip, pick);
    }

    // minOps[i] = minimum operations to make nums[i..i+x-1] all equal to their median.
    private long[] GetMinOps(int[] nums, int x) {
        int n = nums.Length;
        long[] minOps = new long[n - x + 1];
        List<int> lower = new List<int>();
        List<int> upper = new List<int>();
        long lowerSum = 0, upperSum = 0;

        for (int i = 0; i < n; i++) {
            if (lower.Count == 0 || nums[i] <= lower[lower.Count - 1]) {
                InsertSorted(lower, nums[i]);
                lowerSum += nums[i];
            } else {
                InsertSorted(upper, nums[i]);
                upperSum += nums[i];
            }

            if (i >= x) {
                int outNum = nums[i - x];
                if (RemoveValue(lower, outNum)) {
                    lowerSum -= outNum;
                } else {
                    RemoveValue(upper, outNum);
                    upperSum -= outNum;
                }
            }

            if (lower.Count < upper.Count) {
                int val = upper[0];
                upper.RemoveAt(0);
                InsertSorted(lower, val);
                upperSum -= val;
                lowerSum += val;
            } else if (lower.Count - upper.Count > 1) {
                int val = lower[lower.Count - 1];
                lower.RemoveAt(lower.Count - 1);
                InsertSorted(upper, val);
                lowerSum -= val;
                upperSum += val;
            }

            if (i >= x - 1) {
                int median = lower[lower.Count - 1];
                long ops = ((long)median * lower.Count - lowerSum) + (upperSum - (long)median * upper.Count);
                minOps[i - x + 1] = ops;
            }
        }

        return minOps;
    }

    private void InsertSorted(List<int> list, int value) {
        int idx = list.BinarySearch(value);
        if (idx < 0) idx = ~idx;
        list.Insert(idx, value);
    }

    private bool RemoveValue(List<int> list, int value) {
        int idx = list.BinarySearch(value);
        if (idx < 0) return false;
        list.RemoveAt(idx);
        return true;
    }
}
```

## Complexity

- **Time:** O(n * x) for the sliding-window median maintenance, plus O(n * k) for the DP
- **Space:** O(n * k)
