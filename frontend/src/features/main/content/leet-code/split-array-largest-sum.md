# 410. Split Array Largest Sum

**Difficulty:** Hard
**Category:** Array, Binary Search, Dynamic Programming, Greedy

## Problem

Given an integer array `nums` and an integer `k`, split `nums` into `k` non-empty contiguous subarrays to minimize the largest sum among these subarrays, and return that minimized largest sum.

### Example

```
Input: nums = [7,2,5,10,8], k = 2
Output: 18
```

### Constraints

- `1 <= nums.length <= 1000`
- `0 <= nums[i] <= 10^6`
- `1 <= k <= min(50, nums.length)`

## Approach

Binary search on the answer (the maximum allowed subarray sum), ranging from the largest single element (the minimum possible max sum) to the total array sum (using just one subarray). For each candidate limit, greedily count how many subarrays are needed by accumulating a running sum and starting a new subarray whenever adding the next element would exceed the limit; if that count is `<= k`, the limit is feasible and can be lowered further.

## C# Solution

```csharp
public class Solution
{
    public int SplitArray(int[] nums, int k)
    {
        int left = nums.Max(), right = nums.Sum();

        while (left < right)
        {
            int mid = left + (right - left) / 2;
            if (CountSplits(nums, mid) <= k)
                right = mid;
            else
                left = mid + 1;
        }

        return left;
    }

    private int CountSplits(int[] nums, int maxSum)
    {
        int splits = 1, currentSum = 0;

        foreach (var num in nums)
        {
            if (currentSum + num > maxSum)
            {
                splits++;
                currentSum = 0;
            }

            currentSum += num;
        }

        return splits;
    }
}
```

## Complexity

- **Time:** `O(n log(sum))`.
- **Space:** `O(1)`.
