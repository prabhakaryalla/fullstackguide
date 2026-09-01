# 3026. Maximum Good Subarray Sum

**Difficulty:** Medium
**Category:** Array, Hash Table, Prefix Sum

## Problem

You are given an integer array `nums` and an integer `k`. A subarray is **good** if the absolute difference between its first and last elements equals exactly `k`. Return the maximum possible sum of a good subarray, or `0` if no good subarray exists.

### Example

```
Input: nums = [1,2,3,4,5,6], k = 1
Output: 11
Explanation: The good subarray [5,6] has first/last difference 1 and sum 11, the maximum among all
good subarrays.
```

## Approach

For each ending position, the subarray's *first* element must be either `num + k` or `num - k` where `num` is the current element (since the subarray could start anywhere earlier). Track, for every distinct value seen so far, the **minimum prefix sum immediately before its most recent occurrence at that value** (`numToMinPrefix[value]`) — using the running prefix sum *before* adding the current number to it, so it represents "the prefix sum right before this value would start a subarray."

At each step, before updating the prefix sum with the current number, record the minimum prefix-so-far for that number's value (if it's better than what's stored). After adding the current number to the prefix sum, check both `num + k` and `num - k`: if either was seen before, the good subarray sum is `prefix - numToMinPrefix[that value]`, and update the running maximum.

## C# Solution

```csharp
public class Solution {
    public long MaximumSubarraySum(int[] nums, int k) {
        long ans = long.MinValue;
        long prefix = 0;
        var numToMinPrefix = new Dictionary<int, long>();

        foreach (int num in nums) {
            if (!numToMinPrefix.TryGetValue(num, out long existing) || existing > prefix)
                numToMinPrefix[num] = prefix;

            prefix += num;

            if (numToMinPrefix.TryGetValue(num + k, out long minPrefixPlus))
                ans = Math.Max(ans, prefix - minPrefixPlus);
            if (numToMinPrefix.TryGetValue(num - k, out long minPrefixMinus))
                ans = Math.Max(ans, prefix - minPrefixMinus);
        }

        return ans == long.MinValue ? 0 : ans;
    }
}
```

## Complexity

- Time: O(n) — a single pass with O(1) dictionary operations.
- Space: O(n) — the value-to-min-prefix map.
