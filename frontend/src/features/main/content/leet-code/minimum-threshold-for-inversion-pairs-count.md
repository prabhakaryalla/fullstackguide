# 3520. Minimum Threshold for Inversion Pairs Count

**Difficulty:** Medium
**Category:** Array, Binary Search, Binary Indexed Tree, Segment Tree, Sorting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given an integer array `nums` and an integer `k`. Define an **inversion pair** as indices `(i, j)` with `i < j` and `nums[i] > nums[j]`; its "threshold" is the difference `nums[i] - nums[j]`. Find the minimum non-negative threshold `t` such that the number of inversion pairs with `nums[i] - nums[j] <= t` is at least `k`. Return `-1` if it is impossible even when `t` equals the maximum value in `nums`.

### Example
Input: `nums = [3,1,2]`, `k = 1` → Inversion pairs: `(0,1)` diff `2`, `(0,2)` diff `1`. With `t = 1`, one pair `(0,2)` qualifies, satisfying `k = 1`. Output: `1`.

## Approach
As the threshold `t` increases, the count of qualifying inversion pairs never decreases, so the answer can be found with **binary search** on `t` over the range `[0, max(nums)]`.

For a candidate threshold `t`, count inversion pairs whose difference is `<= t` by scanning `nums` left to right and maintaining a sorted structure of previously seen values:
- For the current value `num`, count previously inserted values `y` satisfying `num < y <= num + t` (these correspond to earlier indices `i` with `nums[i] = y > nums[j] = num` and `y - num <= t`).
- Insert `num` into the sorted structure and continue.
- Sum these counts; the candidate `t` is feasible if the total is `>= k`.

Binary search for the smallest feasible `t`; if even `t = max(nums)` is infeasible, return `-1`.

## C# Solution

```csharp
public class Solution {
    public int MinThreshold(int[] nums, int k) {
        int maxVal = 0;
        foreach (int n in nums) maxVal = Math.Max(maxVal, n);

        int lo = 0, hi = maxVal + 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (CountInversionPairs(nums, k, mid)) hi = mid;
            else lo = mid + 1;
        }

        return lo > maxVal ? -1 : lo;
    }

    private bool CountInversionPairs(int[] nums, int k, int threshold) {
        long inversionCount = 0;
        var sortedNums = new List<int>();

        foreach (int num in nums) {
            int lower = UpperBound(sortedNums, num);
            int upper = UpperBound(sortedNums, num + threshold);
            inversionCount += upper - lower;
            if (inversionCount >= k) return true;
            sortedNums.Insert(lower, num);
        }

        return inversionCount >= k;
    }

    // Returns the index of the first element strictly greater than value.
    private int UpperBound(List<int> sorted, int value) {
        int lo = 0, hi = sorted.Count;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (sorted[mid] <= value) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}
```

## Complexity

- **Time:** O(n^2 log(maxVal)) due to the binary search over the threshold combined with an O(n^2) insertion-based counting pass (an indexed Fenwick tree can reduce the inner pass to O(n log maxVal))
- **Space:** O(n) for the sorted values list
