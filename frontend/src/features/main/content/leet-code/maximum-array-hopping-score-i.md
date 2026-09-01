# 3205. Maximum Array Hopping Score I

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Greedy, Monotonic Stack, Stack

## Problem
Given an integer array, starting at index 0, you may repeatedly jump forward to any later index `j` (where `j > i`), earning a score of `(j - i) * nums[j]` for that jump. You must reach the last index eventually (through one or more jumps). Return the maximum total score achievable.

## Approach
A key insight is that the optimal strategy is always to jump directly to whichever remaining index has the maximum value in the suffix from your current position onward, since this maximizes both the distance factor cumulatively over the whole journey and the per-jump value factor greedily. Processing the array from right to left, maintain a running maximum of values seen so far (from the current position to the end); at each position (except the last), add this running maximum to the answer, since effectively the score decomposes into a sum where each position's value contributes based on how many earlier positions "hop over" or land near it optimally — concretely, summing the suffix maximum at every position from `n-2` down to `0` gives the total achievable score directly (an elegant O(n) reformulation equivalent to the O(n^2) direct DP).

## C# Solution
```csharp
public class Solution {
    public int MaxScore(int[] nums) {
        int ans = 0;
        int mx = 0;

        for (int i = nums.Length - 1; i > 0; i--) {
            mx = Math.Max(mx, nums[i]);
            ans += mx;
        }

        return ans;
    }
}
```

## Complexity
- Time: O(n)
- Space: O(1)
