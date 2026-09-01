# 2461. Maximum Sum of Distinct Subarrays With Length K

**Difficulty:** Medium
**Category:** Array, Hash Table, Sliding Window

## Problem

You are given an integer array `nums` and an integer `k`. Return the maximum sum of any subarray of length `k` that has all distinct elements. If no such subarray exists, return 0.

### Example

```
Input: nums = [1,5,4,2,9,9,9], k = 3
Output: 15
Explanation: The subarray [5,4,2] has distinct elements and sum = 11. But [4,2,9] has sum = 15.
Actually, the subarrays with k=3 distinct elements are [1,5,4] (sum=10), [5,4,2] (sum=11), [4,2,9] (sum=15).
```

## Approach

Use a sliding window of size `k` with a hash set to track distinct elements. Maintain the current sum and update the maximum when the window has exactly `k` distinct elements (i.e., all elements are distinct).

## C# Solution

```csharp
public class Solution
{
    public long MaximumSubarraySum(int[] nums, int k)
    {
        int n = nums.Length;
        if (k > n) return 0;
        
        var set = new HashSet<int>();
        long currentSum = 0;
        long maxSum = 0;
        
        for (int i = 0; i < n; i++)
        {
            // Add current element
            while (set.Contains(nums[i]))
            {
                // Remove from left until nums[i] can be added
                set.Remove(nums[i - set.Count]);
                currentSum -= nums[i - set.Count - 1];
            }
            
            set.Add(nums[i]);
            currentSum += nums[i];
            
            // Remove leftmost if window exceeds k
            if (set.Count > k)
            {
                currentSum -= nums[i - k];
                set.Remove(nums[i - k]);
            }
            
            // Check if we have a valid window
            if (set.Count == k)
            {
                maxSum = Math.Max(maxSum, currentSum);
            }
        }
        
        return maxSum;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of nums
- **Space:** O(k) for the hash set
