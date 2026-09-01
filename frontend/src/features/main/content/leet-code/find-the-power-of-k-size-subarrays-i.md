# 3254. Find the Power of K-Size Subarrays I

**Difficulty:** Medium
**Category:** Array, Sliding Window

## Problem
Given an integer array and an integer `k`, for every contiguous subarray of length exactly `k`, determine its "power": if all elements in that subarray form a consecutive increasing sequence (each element is exactly 1 more than the previous), the power is the maximum value in the subarray (which is the last element); otherwise the power is -1. Return an array of these power values for every valid window position.

## Approach
Scan through the array while tracking the start index of the current maximal run of consecutive increasing values (`start`), resetting this start whenever the current element breaks the consecutive pattern relative to the previous one. For every position `i` that completes a window of size `k` (i.e., `i >= k - 1`), check whether the current run (`i - start + 1`) is at least `k` long; if so, the answer for that window is `nums[i]` (the last and largest element in a valid consecutive run), otherwise -1.

## C# Solution
```csharp
public class Solution {
    public int[] ResultsArray(int[] nums, int k) {
        List<int> ans = new List<int>();
        int start = 0;

        for (int i = 0; i < nums.Length; i++) {
            if (i > 0 && nums[i] != nums[i - 1] + 1)
                start = i;
            if (i >= k - 1)
                ans.Add(i - start + 1 >= k ? nums[i] : -1);
        }

        return ans.ToArray();
    }
}
```

## Complexity
- Time: O(n)
- Space: O(1) extra (excluding output)
