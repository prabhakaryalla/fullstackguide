# 2760. Longest Even Odd Subarray With Threshold

**Difficulty:** Easy
**Category:** Array, Sliding Window

## Problem

You are given a 0-indexed integer array `nums` and an integer `threshold`.

Find the length of the longest subarray of `nums` starting at index `l` and ending at index `r` `(0 <= l <= r < nums.length)` that satisfies the following conditions:
- `nums[l] % 2 == 0`
- For all indices `i` in the range `[l, r - 1]`, `nums[i] % 2 != nums[i + 1] % 2`
- For all indices `i` in the range `[l, r]`, `nums[i] <= threshold`

Return an integer denoting the length of the longest such subarray.

### Example

```
Input: nums = [3,2,5,4], threshold = 5
Output: 3
Explanation: Subarray [2,5,4] starts with even, alternates, and all <= 5.
```

## Approach

Iterate through the array. When we find an even number that's <= threshold, start counting a potential subarray. Continue as long as elements alternate parity and stay <= threshold.

## C# Solution

```csharp
public class Solution
{
    public int LongestAlternatingSubarray(int[] nums, int threshold)
    {
        int maxLen = 0;
        int n = nums.Length;
        
        for (int i = 0; i < n; i++)
        {
            if (nums[i] % 2 == 0 && nums[i] <= threshold)
            {
                int len = 1;
                
                for (int j = i + 1; j < n; j++)
                {
                    if (nums[j] <= threshold && nums[j] % 2 != nums[j - 1] % 2)
                    {
                        len++;
                    }
                    else
                    {
                        break;
                    }
                }
                
                maxLen = Math.Max(maxLen, len);
            }
        }
        
        return maxLen;
    }
}
```

## Complexity

- **Time:** O(n²)
- **Space:** O(1)
