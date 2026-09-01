# 3134. Find the Median of the Uniqueness Array

**Difficulty:** Hard
**Category:** Array, Binary Search, Hash Table, Sliding Window

## Problem

Given an integer array `nums`, define its "uniqueness array" as the sorted list of `distinctCount(subarray)` — the number of distinct elements — for every one of its `n*(n+1)/2` subarrays. Return the median of this uniqueness array.

## Approach

Binary search on a candidate distinct-count value `m`: count how many subarrays have **at most** `m` distinct elements, using the classic sliding-window "at most K distinct" technique (a two-pointer window where the count of distinct elements never exceeds `m`, contributing `r - l + 1` new subarrays for every right endpoint). The median position is `ceil(total subarray count / 2)`-th smallest value in the uniqueness array; binary search for the smallest `m` whose "at most m distinct" count reaches that target rank.

## C# Solution

```csharp
public class Solution {
    public int MedianOfUniquenessArray(int[] nums) {
        int n = nums.Length;
        long subarrayCount = (long)n * (n + 1) / 2;
        long medianCount = (subarrayCount + 1) / 2;

        int lo = 1, hi = n;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (SubarrayWithAtMostKDistinct(nums, mid) >= medianCount)
                hi = mid;
            else
                lo = mid + 1;
        }

        return lo;
    }

    private long SubarrayWithAtMostKDistinct(int[] nums, int k) {
        long res = 0;
        var count = new Dictionary<int, int>();
        int l = 0;

        for (int r = 0; r < nums.Length; r++) {
            count[nums[r]] = count.GetValueOrDefault(nums[r]) + 1;
            if (count[nums[r]] == 1)
                k--;
            while (k == -1) {
                count[nums[l]]--;
                if (count[nums[l]] == 0)
                    k++;
                l++;
            }
            res += r - l + 1;
        }

        return res;
    }
}
```

## Complexity

- Time: O(n log n) — binary search over the answer, each check doing an O(n) sliding-window pass.
- Space: O(n) — the frequency map used in the sliding window.
