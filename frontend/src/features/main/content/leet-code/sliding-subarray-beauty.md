# 2653. Sliding Subarray Beauty

**Difficulty:** Medium
**Category:** Array, Sliding Window, Heap (Priority Queue)

## Problem

Given an integer array `nums` containing `n` integers, find the beauty of each subarray of size `k`.

The beauty of a subarray is the `x`th smallest integer in the subarray if it is negative, or `0` if there are fewer than `x` negative integers.

Return an integer array containing `n - k + 1` integers denoting the beauty of the subarrays in order from the first index in the array.

### Example

```
Input: nums = [1,-1,-3,-2,3], k = 3, x = 2
Output: [-1,-2,-2]
Explanation:
- Subarray [1,-1,-3]: 2nd smallest is -1
- Subarray [-1,-3,-2]: 2nd smallest is -2
- Subarray [-3,-2,3]: 2nd smallest is -2
```

## Approach

Use a sliding window with a frequency array to track counts of negative numbers in the current window (values range from -50 to 50). For each window, iterate through the frequency array of negatives to find the x-th smallest. Slide the window by removing the leftmost element and adding the new right element.

## C# Solution

```csharp
public class Solution
{
    public int[] GetSubarrayBeauty(int[] nums, int k, int x)
    {
        int n = nums.Length;
        int[] result = new int[n - k + 1];
        int[] freq = new int[101];
        
        for (int i = 0; i < k; i++)
        {
            if (nums[i] < 0)
                freq[nums[i] + 50]++;
        }
        
        result[0] = FindXthSmallest(freq, x);
        
        for (int i = k; i < n; i++)
        {
            if (nums[i - k] < 0)
                freq[nums[i - k] + 50]--;
            
            if (nums[i] < 0)
                freq[nums[i] + 50]++;
            
            result[i - k + 1] = FindXthSmallest(freq, x);
        }
        
        return result;
    }
    
    private int FindXthSmallest(int[] freq, int x)
    {
        int count = 0;
        
        for (int i = 0; i < 50; i++)
        {
            count += freq[i];
            if (count >= x)
                return i - 50;
        }
        
        return 0;
    }
}
```

## Complexity

- **Time:** O(n × 50) — sliding window with constant-time frequency lookup
- **Space:** O(1) — fixed-size frequency array
