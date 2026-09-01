# 3688. Bitwise OR of Even Numbers in an Array

**Difficulty:** Easy
**Category:** Array, Bit Manipulation

## Problem

Given an integer array `nums`, return the bitwise OR of all even numbers in the array. If there are no even numbers, return `0`.

### Example

Input: `nums = [3,4,6,7]`
Output: `6`
Explanation: The even numbers are `4` and `6`. `4 | 6 = 6`.

## Approach

Iterate through the array, accumulating a running OR for every element divisible by two.

## C# Solution

```csharp
public class Solution 
{
    public int EvenNumberBitwiseORs(int[] nums) 
    {
        int result = 0;
        foreach (int num in nums) 
        {
            if (num % 2 == 0) 
            {
                result |= num;
            }
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
