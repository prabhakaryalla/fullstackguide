# 2321. Maximum Score Of Spliced Array

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

You are given two 0-indexed integer arrays `nums1` and `nums2`, both of length `n`.

You can choose two integers `left` and `right` where `0 <= left <= right < n` and swap the subarray `nums1[left...right]` with the subarray `nums2[left...right]`.

Return the maximum sum of an array you can obtain after performing the operation at most once.

### Example

```
Input: nums1 = [60,60,60], nums2 = [10,90,10]
Output: 220
Explanation: Swap nums1[1] with nums2[1]: nums1 = [60,90,60], sum = 210. Or swap nums1[1..1] with nums2[1..1].
```

## Approach

The problem is equivalent to: find the maximum subarray sum of `(nums2[i] - nums1[i])` and add it to the sum of `nums1`, or find the maximum subarray sum of `(nums1[i] - nums2[i])` and add it to the sum of `nums2`. Use Kadane's algorithm to find the maximum subarray sum of the difference arrays.

## C# Solution

```csharp
public class Solution
{
    public int MaximumsSplicedArray(int[] nums1, int[] nums2)
    {
        int n = nums1.Length;
        int sum1 = 0, sum2 = 0;
        
        for (int i = 0; i < n; i++)
        {
            sum1 += nums1[i];
            sum2 += nums2[i];
        }
        
        int maxGain1 = MaxSubarraySum(nums1, nums2);
        int maxGain2 = MaxSubarraySum(nums2, nums1);
        
        return Math.Max(sum1 + maxGain1, sum2 + maxGain2);
    }
    
    private int MaxSubarraySum(int[] a, int[] b)
    {
        int maxSum = 0;
        int currentSum = 0;
        
        for (int i = 0; i < a.Length; i++)
        {
            currentSum = Math.Max(0, currentSum + b[i] - a[i]);
            maxSum = Math.Max(maxSum, currentSum);
        }
        
        return maxSum;
    }
}
```

## Complexity

- **Time:** O(n) using Kadane's algorithm
- **Space:** O(1)
