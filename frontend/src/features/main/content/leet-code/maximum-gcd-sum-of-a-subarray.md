# 2941. Maximum GCD-Sum of a Subarray

**Difficulty:** Hard
**Category:** Array, Math, Segment Tree
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array of integers and an integer `k`, find a subarray of length exactly `k` that maximizes the sum of GCD of all pairs in that subarray. Return the maximum sum.

### Example

```
Input: nums = [2,6,4], k = 2
Output: 2
Explanation: Subarray [2,6] has GCD(2,6) = 2. Subarray [6,4] has GCD(6,4) = 2.
```

## Approach

Use a sliding window of size k. For each window, calculate the GCD sum of all pairs using the Euclidean algorithm. Since k is typically small, the O(k^2) computation per window is acceptable. Slide the window across the array and track the maximum GCD sum.

## C# Solution

```csharp
public class Solution 
{
    public long MaxGcdSum(int[] nums, int k) 
    {
        long maxSum = 0;
        
        for (int i = 0; i <= nums.Length - k; i++) 
        {
            long sum = 0;
            for (int j = i; j < i + k; j++) 
            {
                for (int l = j + 1; l < i + k; l++) 
                {
                    sum += Gcd(nums[j], nums[l]);
                }
            }
            maxSum = Math.Max(maxSum, sum);
        }
        
        return maxSum;
    }
    
    private int Gcd(int a, int b) 
    {
        while (b != 0) 
        {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}
```

## Complexity

- **Time:** O(n * k^2 * log(max_value))
- **Space:** O(1)
