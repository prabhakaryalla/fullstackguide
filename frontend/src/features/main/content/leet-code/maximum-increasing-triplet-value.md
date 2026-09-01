# 3073. Maximum Increasing Triplet Value

**Difficulty:** Medium
**Category:** Array, Ordered Set

## Problem

Given a 0-indexed integer array `nums`, consider every triplet of indices `i < j < k`. The "value" of a triplet where `nums[i] < nums[j] < nums[k]` is `nums[k] - nums[j] + nums[i]`... more precisely, the value is defined as `nums[i] - nums[j] + nums[k]`. Return the maximum such value over all strictly-increasing-value triplets, or `0` if none exists.

## Approach

Precompute `rightMax[j]` = the maximum value among `nums[j+1..n)`. Then scan `j` from left to right, maintaining an ordered set of all values seen at indices `< j`. For each `j`, look up the largest value in that set that is strictly less than `nums[j]` (its predecessor) — that's the best choice for `nums[i]`. Combine with `rightMax[j]` (as `nums[k]`) to evaluate `nums[i] - nums[j] + rightMax[j]`, keeping the running maximum.

## C# Solution

```csharp
public class Solution {
    public int MaximumTripletValue(int[] nums) {
        int n = nums.Length;
        int ans = 0;
        int[] rightMax = new int[n];
        var leftSortedSet = new SortedSet<int> { nums[0] };

        for (int i = n - 2; i >= 0; i--)
            rightMax[i] = Math.Max(nums[i + 1], rightMax[i + 1]);

        for (int j = 1; j < n - 1; j++) {
            var lessThanNumsJ = leftSortedSet.GetViewBetween(int.MinValue, nums[j] - 1);
            if (lessThanNumsJ.Count > 0 && rightMax[j] > nums[j])
                ans = Math.Max(ans, lessThanNumsJ.Max - nums[j] + rightMax[j]);

            leftSortedSet.Add(nums[j]);
        }

        return ans;
    }
}
```

## Complexity

- Time: O(n log n) — each ordered-set insertion/lookup costs O(log n).
- Space: O(n) — the ordered set and `rightMax` array.
