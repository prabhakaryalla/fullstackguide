# 3689. Maximum Total Subarray Value I

**Difficulty:** Medium
**Category:** Array, Greedy

## Problem

You are given an integer array `nums` of length `n` and an integer `k`.

You need to choose exactly `k` non-empty subarrays `nums[l..r]`. Subarrays may overlap, and the exact same subarray (same `l` and `r`) can be chosen more than once.

The value of a subarray `nums[l..r]` is defined as `max(nums[l..r]) - min(nums[l..r])`. The total value is the sum of the values of all chosen subarrays.

Return the maximum possible total value you can achieve.

### Example

```
Input: nums = [4,2,5,1], k = 3
Output: 12
Explanation: Choosing the whole array [4,2,5,1] three times gives 3 x (5 - 1) = 12.
```

### Constraints

- `1 <= n == nums.length <= 5 * 10^4`
- `0 <= nums[i] <= 10^9`
- `1 <= k <= 10^5`

## Approach

For any subarray, its maximum can never exceed the global maximum of `nums`, and its minimum can never be less than the global minimum. Therefore the entire array always achieves the largest possible `max - min` value among all subarrays, and since subarrays can be reused freely, the optimal strategy is simply to pick the whole array `k` times.

## C# Solution

```csharp
public class Solution
{
    public long MaxTotalValue(int[] nums, int k)
    {
        int maxVal = int.MinValue;
        int minVal = int.MaxValue;

        foreach (int num in nums)
        {
            if (num > maxVal) maxVal = num;
            if (num < minVal) minVal = num;
        }

        return (long)(maxVal - minVal) * k;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
