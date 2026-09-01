# 2149. Rearrange Array Elements by Sign

**Difficulty:** Medium
**Category:** Array, Two Pointers

## Problem

You are given a 0-indexed integer array `nums` of even length consisting of an equal number of positive and negative integers.

You should rearrange the elements of `nums` such that:
1. Every consecutive pair of integers have opposite signs
2. For all integers with the same sign, preserve their relative order
3. The first integer must be positive

Return the modified array after rearranging the elements.

### Example

```
Input: nums = [3,1,-2,-5,2,-4]
Output: [3,-2,1,-5,2,-4]
Explanation: Positive numbers are [3,1,2], negatives are [-2,-5,-4].
Rearrange: 3,-2,1,-5,2,-4
```

## Approach

Use two pointers to track positions for positive and negative numbers. Iterate through the array, placing positive numbers at even indices and negative numbers at odd indices while maintaining their relative order.

## C# Solution

```csharp
public class Solution
{
    public int[] RearrangeArray(int[] nums)
    {
        int n = nums.Length;
        int[] result = new int[n];
        
        int posIndex = 0;  // Even indices for positive
        int negIndex = 1;  // Odd indices for negative
        
        foreach (int num in nums)
        {
            if (num > 0)
            {
                result[posIndex] = num;
                posIndex += 2;
            }
            else
            {
                result[negIndex] = num;
                negIndex += 2;
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the array
- **Space:** O(n) for the result array
