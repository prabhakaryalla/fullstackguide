# 523. Continuous Subarray Sum

**Difficulty:** Medium
**Category:** Array, Hash Table, Math, Prefix Sum

## Problem

Given an integer array `nums` and an integer `k`, return `true` if `nums` has a contiguous subarray of size at least 2 whose elements sum to a multiple of `k` (with `0` considered a multiple of every `k`, including when `k` is `0`).

### Example

```
Input: nums = [23,2,4,6,7], k = 6
Output: true
Explanation: [2, 4] sums to 6, a multiple of 6.
```

### Constraints

- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^9`
- `0 <= sum(nums[i]) <= 2^31 - 1`
- `1 <= k <= 2^31 - 1`

## Approach

Track running prefix sums modulo `k` (handling `k == 0` by using the raw sum instead) in a hash map from remainder to the earliest index where it occurred. If the same remainder reappears at a later index, the subarray between those two indices sums to a multiple of `k`; only report a match once that gap is at least 2 elements wide.

## C# Solution

```csharp
public class Solution
{
    public bool CheckSubarraySum(int[] nums, int k)
    {
        var remainderIndex = new Dictionary<int, int> { [0] = -1 };
        int sum = 0;

        for (int i = 0; i < nums.Length; i++)
        {
            sum += nums[i];
            int remainder = k == 0 ? sum : sum % k;

            if (remainderIndex.TryGetValue(remainder, out var firstIndex))
            {
                if (i - firstIndex >= 2) return true;
            }
            else
            {
                remainderIndex[remainder] = i;
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(min(n, k))` for the remainder map.
