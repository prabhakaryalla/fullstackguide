# 2495. Number of Subarrays Having Even Product

**Difficulty:** Medium
**Category:** Array, Math

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an integer array `nums`, return the number of subarrays where the product of all elements is even.

### Example

```
Input: nums = [9,6,7,13]
Output: 6
Explanation: Subarrays with even product: [6], [9,6], [6,7], [6,7,13], [9,6,7], [9,6,7,13]

Input: nums = [7,3,5]
Output: 0
```

## Approach

A product is even if at least one element in the subarray is even.

Use complementary counting:
- Total subarrays = n × (n + 1) / 2
- Subarrays with all odd numbers (odd product) can be counted by finding segments of consecutive odd numbers
- Answer = Total - Odd product count

## C# Solution

```csharp
public class Solution
{
    public long EvenProduct(int[] nums)
    {
        int n = nums.Length;
        long totalSubarrays = (long)n * (n + 1) / 2;
        
        long oddProductCount = 0;
        int oddStreak = 0;
        
        foreach (int num in nums)
        {
            if (num % 2 == 1)
            {
                oddStreak++;
                oddProductCount += oddStreak;
            }
            else
            {
                oddStreak = 0;
            }
        }
        
        return totalSubarrays - oddProductCount;
    }
}
```

## Complexity

- **Time:** O(n) where n is the array length
- **Space:** O(1)
