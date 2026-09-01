# 325. Maximum Size Subarray Sum Equals k

**Difficulty:** Medium
**Category:** Array, Hash Table, Prefix Sum
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an integer array `nums` and an integer `k`, return the maximum length of a contiguous subarray that sums to `k`. If no such subarray exists, return `0`.

### Example

```
Input: nums = [1,-1,5,-2,3], k = 3
Output: 4
Explanation: The subarray [1, -1, 5, -2] sums to 3 and has length 4.
```

### Constraints

- `1 <= nums.length <= 2 * 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `-10^9 <= k <= 10^9`

## Approach

Track a running prefix sum and record the *first* index at which each prefix sum value occurs. A subarray ending at index `i` sums to `k` exactly when an earlier prefix sum equals `currentSum - k`; the length of that subarray is `i` minus the first index that sum was seen (using the earliest occurrence maximizes the subarray length).

## C# Solution

```csharp
public class Solution
{
    public int MaxSubArrayLen(int[] nums, int k)
    {
        var firstIndexOfSum = new Dictionary<int, int> { [0] = -1 };
        int sum = 0, maxLength = 0;

        for (int i = 0; i < nums.Length; i++)
        {
            sum += nums[i];

            if (firstIndexOfSum.TryGetValue(sum - k, out var firstIndex))
                maxLength = Math.Max(maxLength, i - firstIndex);

            if (!firstIndexOfSum.ContainsKey(sum))
                firstIndexOfSum[sum] = i;
        }

        return maxLength;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the prefix-sum index map.
