# 2918. Minimum Equal Sum of Two Arrays After Replacing Zeros

**Difficulty:** Medium
**Category:** Array, Greedy

## Problem

You are given two arrays `nums1` and `nums2` consisting of positive integers and zeros. You can replace each zero with any positive integer. Return the minimum possible sum that both arrays can achieve after replacements, such that both arrays have equal sums. If impossible, return -1.

### Example

```
Input: nums1 = [3,2,0,1,0], nums2 = [6,5,0]
Output: 12
Explanation: Replace zeros to make both sum to 12.
```

## Approach

Calculate the current sum of non-zero elements and count zeros in each array. The minimum possible sum for an array is its non-zero sum plus the count of zeros (since each zero becomes at least 1). If one array has no zeros, its sum is fixed. Check if both arrays can reach the same sum: the larger of the two minimum possible sums, and ensure the array with the smaller minimum sum has enough zeros to reach it.

## C# Solution

```csharp
public class Solution 
{
    public long MinSum(int[] nums1, int[] nums2) 
    {
        long sum1 = 0, sum2 = 0;
        int zeros1 = 0, zeros2 = 0;
        
        foreach (int num in nums1) 
        {
            if (num == 0) zeros1++;
            else sum1 += num;
        }
        
        foreach (int num in nums2) 
        {
            if (num == 0) zeros2++;
            else sum2 += num;
        }
        
        long minSum1 = sum1 + zeros1;
        long minSum2 = sum2 + zeros2;
        
        if (zeros1 == 0 && zeros2 == 0) 
        {
            return sum1 == sum2 ? sum1 : -1;
        }
        
        if (zeros1 == 0) 
        {
            return sum1 >= minSum2 ? sum1 : -1;
        }
        
        if (zeros2 == 0) 
        {
            return sum2 >= minSum1 ? sum2 : -1;
        }
        
        return Math.Max(minSum1, minSum2);
    }
}
```

## Complexity

- **Time:** O(n + m)
- **Space:** O(1)
