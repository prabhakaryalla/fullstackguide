# 3555. Smallest Subarray to Sort in Every Sliding Window

**Difficulty:** Medium
**Category:** Array, Sliding Window, Sorting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given an integer array `nums` and an integer `k`. For every contiguous window of size `k` in `nums` (there are `n - k + 1` such windows, where `n = nums.length`), determine the length of the shortest contiguous subarray *within that window* that would need to be sorted in place so that the entire window becomes sorted in non-decreasing order. If a window is already sorted, its answer is `0`.

Return an array `ans` of length `n - k + 1` where `ans[i]` is the answer for the window starting at index `i`.

## Approach
This is the classic "shortest unsorted continuous subarray" problem (LeetCode 581) applied independently to every sliding window of length `k`.

For a fixed window, copy its elements, sort a copy of it, and compare element by element from the left to find the first index `l` where the original differs from the sorted version, and from the right to find the last index `r` where they differs. If no such indices exist the window is already sorted (answer `0`); otherwise the answer is `r - l + 1`.

Doing this window by window with an `O(k log k)` sort per window gives an overall `O(n·k log k)` algorithm, which is simple and correct for the given constraints.

## C# Solution

```csharp
public class Solution {
    public int[] MinSubarraySort(int[] nums, int k) {
        int n = nums.Length;
        int[] ans = new int[n - k + 1];

        for (int i = 0; i <= n - k; i++) {
            int[] window = new int[k];
            Array.Copy(nums, i, window, 0, k);

            int[] sortedWindow = (int[])window.Clone();
            Array.Sort(sortedWindow);

            int l = 0;
            while (l < k && window[l] == sortedWindow[l]) l++;

            int r = k - 1;
            while (r >= 0 && window[r] == sortedWindow[r]) r--;

            ans[i] = l > r ? 0 : r - l + 1;
        }

        return ans;
    }
}
```

## Complexity

- **Time:** O(n · k log k) — for each of the `n - k + 1` windows we sort `k` elements.
- **Space:** O(k) per window for the temporary arrays (output array excluded).
