# 713. Subarray Product Less Than K

**Difficulty:** Medium
**Category:** Array, Sliding Window

## Problem

Given an array of positive integers `nums` and an integer `k`, return the number of contiguous subarrays where the product of all elements is strictly less than `k`.

### Example

```
Input: nums = [10,5,2,6], k = 100
Output: 8
```

### Constraints

- `1 <= nums.length <= 3 * 10^4`
- `1 <= nums[i] <= 1000`
- `0 <= k <= 10^6`

## Approach

Maintain a sliding window with a running product. Expand the window by multiplying in each new element; whenever the product reaches or exceeds `k`, shrink from the left (dividing out elements) until it's valid again. Every time the window is valid, all subarrays ending at the current right pointer and starting anywhere within the window are valid, contributing `right - left + 1` new subarrays.

## C# Solution

```csharp
public class Solution
{
    public int NumSubarrayProductLessThanK(int[] nums, int k)
    {
        if (k <= 1) return 0;

        int product = 1, left = 0, count = 0;

        for (int right = 0; right < nums.Length; right++)
        {
            product *= nums[right];

            while (product >= k)
            {
                product /= nums[left];
                left++;
            }

            count += right - left + 1;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
