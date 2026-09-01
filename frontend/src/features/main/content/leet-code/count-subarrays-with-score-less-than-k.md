# 2302. Count Subarrays With Score Less Than K

**Difficulty:** Hard
**Category:** Array, Sliding Window, Binary Search
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

The score of an array is defined as the product of its sum and its length. For example, the score of `[1, 2, 3, 4, 5]` is `(1 + 2 + 3 + 4 + 5) * 5 = 75`.

Given a positive integer array `nums` and an integer `k`, return the number of non-empty subarrays of `nums` whose score is strictly less than `k`.

### Example

```
Input: nums = [2,1,4,3,5], k = 10
Output: 6
Explanation: The subarrays with scores less than 10 are:
[2] with score 2 * 1 = 2
[1] with score 1 * 1 = 1
[4] with score 4 * 1 = 4
[3] with score 3 * 1 = 3
[5] with score 5 * 1 = 5
[2,1] with score 3 * 2 = 6
```

## Approach

Use a sliding window approach. For each right pointer, extend the window while maintaining a left pointer. For a fixed right endpoint, count all valid subarrays ending at that position. Track the current sum and adjust the window when the score becomes >= k.

## C# Solution

```csharp
public class Solution
{
    public long CountSubarrays(int[] nums, long k)
    {
        long result = 0;
        long sum = 0;
        int left = 0;
        
        for (int right = 0; right < nums.Length; right++)
        {
            sum += nums[right];
            
            while (left <= right && sum * (right - left + 1) >= k)
            {
                sum -= nums[left];
                left++;
            }
            
            result += right - left + 1;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
