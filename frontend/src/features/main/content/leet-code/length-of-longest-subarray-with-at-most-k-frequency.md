# 2958. Length of Longest Subarray With at Most K Frequency

**Difficulty:** Medium
**Category:** Array, Hash Table, Sliding Window

## Problem

You are given an integer array `nums` and an integer `k`. Return the length of the longest subarray where no element appears more than `k` times.

### Example

```
Input: nums = [1, 2, 3, 1, 2, 3, 1, 2], k = 2
Output: 6
Explanation: The longest subarray is [1, 2, 3, 1, 2, 3] where each element appears exactly 2 times.

Input: nums = [1, 2, 1, 2, 1, 2, 1, 2], k = 1
Output: 2
```

## Approach

Use a sliding window with a frequency map. Expand the right pointer and increment frequencies. When any element's frequency exceeds `k`, shrink from the left until all frequencies are at most `k`. Track the maximum window size.

## C# Solution

```csharp
public class Solution
{
    public int MaxSubarrayLength(int[] nums, int k)
    {
        var freq = new Dictionary<int, int>();
        int left = 0;
        int maxLen = 0;

        for (int right = 0; right < nums.Length; right++)
        {
            freq[nums[right]] = freq.GetValueOrDefault(nums[right], 0) + 1;

            while (freq[nums[right]] > k)
            {
                freq[nums[left]]--;
                left++;
            }

            maxLen = Math.Max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n) for frequency map
