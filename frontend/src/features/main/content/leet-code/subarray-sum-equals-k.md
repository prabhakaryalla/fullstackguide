# 560. Subarray Sum Equals K

**Difficulty:** Medium
**Category:** Array, Hash Table, Prefix Sum

## Problem

Given an array of integers `nums` and an integer `k`, return the total number of contiguous subarrays whose sum equals `k`.

### Example

```
Input: nums = [1,1,1], k = 2
Output: 2
```

### Constraints

- `1 <= nums.length <= 2 * 10^4`
- `-1000 <= nums[i] <= 1000`
- `-10^7 <= k <= 10^7`

## Approach

Track a running prefix sum and a hash map counting how many times each prefix sum value has occurred so far. A subarray ending at the current index sums to `k` exactly when an earlier prefix sum equals `currentSum - k`; add that count to the running total, then record the current prefix sum for future subarrays to reference.

## C# Solution

```csharp
public class Solution
{
    public int SubarraySum(int[] nums, int k)
    {
        var prefixCounts = new Dictionary<int, int> { [0] = 1 };
        int sum = 0, count = 0;

        foreach (var num in nums)
        {
            sum += num;
            count += prefixCounts.GetValueOrDefault(sum - k);
            prefixCounts[sum] = prefixCounts.GetValueOrDefault(sum) + 1;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the prefix-sum map.
