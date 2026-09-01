# 3101. Count Alternating Subarrays

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

You are given a binary array `nums`. Return the number of "alternating" subarrays — subarrays in which no two adjacent elements are equal.

### Example

```
Input: nums = [0,1,1,1]
Output: 5
Explanation: The alternating subarrays are [0], [1], [1], [1], and [0,1]. Total = 5.
```

## Approach

Let `dp[i]` be the number of alternating subarrays that end exactly at index `i`. Every single element is trivially alternating, so `dp[i]` starts at `1`. If `nums[i] != nums[i-1]`, every alternating subarray ending at `i-1` can be extended by one more element to end at `i`, so add `dp[i-1]`. The answer is the sum of all `dp[i]`.

## C# Solution

```csharp
public class Solution {
    public long CountAlternatingSubarrays(int[] nums) {
        long[] dp = new long[nums.Length];
        Array.Fill(dp, 1L);

        for (int i = 1; i < nums.Length; i++)
            if (nums[i] != nums[i - 1])
                dp[i] += dp[i - 1];

        long total = 0;
        foreach (long v in dp)
            total += v;
        return total;
    }
}
```

## Complexity

- Time: O(n) — one pass to fill `dp`, one pass to sum it.
- Space: O(n) — the `dp` array (can be reduced to O(1) with a running variable).
