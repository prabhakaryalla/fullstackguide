# 3105. Longest Strictly Increasing or Strictly Decreasing Subarray

**Difficulty:** Easy
**Category:** Array

## Problem

Given an integer array `nums`, return the length of the longest subarray that is either strictly increasing or strictly decreasing.

### Example

```
Input: nums = [1,4,3,3,2]
Output: 2
Explanation: The longest strictly increasing subarray is [1,4] (length 2); the longest strictly decreasing
subarray is [4,3] or [3,2] (length 2). The answer is 2.
```

## Approach

Track two running counters as you scan left to right: `increasing` (the length of the current strictly increasing run ending here) and `decreasing` (similarly for strictly decreasing). At each step, compare the current element to the previous one: extend `increasing` and reset `decreasing` if it went up, extend `decreasing` and reset `increasing` if it went down, or reset both to `1` if they're equal. Track the maximum of both counters throughout.

## C# Solution

```csharp
public class Solution {
    public int LongestMonotonicSubarray(int[] nums) {
        int ans = 1;
        int increasing = 1;
        int decreasing = 1;

        for (int i = 1; i < nums.Length; i++) {
            if (nums[i] > nums[i - 1]) {
                increasing++;
                decreasing = 1;
            } else if (nums[i] < nums[i - 1]) {
                decreasing++;
                increasing = 1;
            } else {
                increasing = 1;
                decreasing = 1;
            }
            ans = Math.Max(ans, Math.Max(increasing, decreasing));
        }

        return ans;
    }
}
```

## Complexity

- Time: O(n) — a single pass over the array.
- Space: O(1).
