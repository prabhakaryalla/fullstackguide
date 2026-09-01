# 3231. Minimum Number of Increasing Subsequence to Be Removed

**Difficulty:** Hard
**Category:** Array, Binary Search, Dynamic Programming

## Problem
Given an integer array, repeatedly remove one strictly increasing subsequence from it (not necessarily contiguous), until the array is empty. Return the minimum number of strictly increasing subsequences needed to fully cover and remove the entire array.

## Approach
There's a classic duality (related to Dilworth's theorem) between covering a sequence with the minimum number of strictly increasing subsequences and the length of the longest non-increasing subsequence of the original array: these two quantities are always equal. So, compute the length of the longest non-increasing subsequence of the given array. This can be done efficiently by reversing the array and then computing the length of the longest non-decreasing subsequence of the reversed array (an equivalent transformation), using the standard patience-sorting technique with binary search (maintaining a "tails" array and using an upper-bound search to place each element).

## C# Solution
```csharp
public class Solution {
    public int MinOperations(int[] nums) {
        int[] reversed = new int[nums.Length];
        for (int i = 0; i < nums.Length; i++)
            reversed[i] = nums[nums.Length - 1 - i];
        return LengthOfLIS(reversed);
    }

    private int LengthOfLIS(int[] nums) {
        List<int> tails = new List<int>();

        foreach (int num in nums) {
            if (tails.Count == 0 || num >= tails[tails.Count - 1]) {
                tails.Add(num);
            } else {
                int idx = UpperBound(tails, num);
                tails[idx] = num;
            }
        }

        return tails.Count;
    }

    private int UpperBound(List<int> arr, int target) {
        int lo = 0, hi = arr.Count;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (arr[mid] <= target)
                lo = mid + 1;
            else
                hi = mid;
        }
        return lo;
    }
}
```

## Complexity
- Time: O(n log n)
- Space: O(n)
