# 1918. Kth Smallest Subarray Sum

**Difficulty:** Medium
**Category:** Array, Binary Search, Sliding Window
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array `nums` of positive integers and an integer `k`, return the `k`-th smallest sum among the sums of all contiguous subarrays of `nums` (subarrays are counted with multiplicity — a sum appearing from two different subarrays counts twice).

### Example

```
Input: nums = [2,1,3], k = 4
Output: 3
Explanation: Subarray sums sorted: [1,2,3,3,4,6] -> the 4th smallest is 3.
```

### Constraints

- `1 <= nums.length <= 2 * 10^4`
- `1 <= nums[i] <= 5 * 10^4`
- `1 <= k <= nums.length * (nums.length + 1) / 2`

## Approach

Binary search on the answer value `x` in the range `[min(nums), sum(nums)]`. For a candidate `x`, use a sliding window (two pointers) over the (positive) array to count, in `O(n)`, how many contiguous subarrays have a sum `<= x` (shrink the window from the left whenever the running sum exceeds `x`, and for each right endpoint add `right - left + 1` to the count). Find the smallest `x` for which that count is `>= k`; that `x` is the k-th smallest subarray sum.

## C# Solution

```csharp
public class Solution
{
    public int KthSmallestSubarraySum(int[] nums, int k)
    {
        long lo = nums.Min(), hi = nums.Sum();

        while (lo < hi)
        {
            long mid = lo + (hi - lo) / 2;
            if (CountSubarraysWithSumAtMost(nums, mid) >= k)
            {
                hi = mid;
            }
            else
            {
                lo = mid + 1;
            }
        }

        return (int)lo;
    }

    private long CountSubarraysWithSumAtMost(int[] nums, long limit)
    {
        long count = 0;
        long sum = 0;
        int left = 0;

        for (int right = 0; right < nums.Length; right++)
        {
            sum += nums[right];
            while (sum > limit)
            {
                sum -= nums[left];
                left++;
            }
            count += right - left + 1;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n log(sum(nums)))` — a sliding-window pass for each binary search step.
- **Space:** `O(1)` extra space.
