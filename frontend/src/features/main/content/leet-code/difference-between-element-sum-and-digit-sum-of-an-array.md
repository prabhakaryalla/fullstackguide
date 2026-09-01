# 2535. Difference Between Element Sum and Digit Sum of an Array

**Difficulty:** Easy
**Category:** Array, Math

## Problem

Given a positive integer array `nums`, compute the difference between the sum of all elements and the sum of all digits in the array.

### Example

```
Input: nums = [1,15,6,3]
Output: 9
Explanation: Element sum = 1 + 15 + 6 + 3 = 25. Digit sum = 1 + 1 + 5 + 6 + 3 = 16. Difference = 25 - 16 = 9.
```

## Approach

Calculate the sum of all elements. Then extract digits from each element and sum them. Return the difference.

## C# Solution

```csharp
public class Solution
{
    public int DifferenceOfSum(int[] nums)
    {
        int elementSum = 0;
        int digitSum = 0;
        
        foreach (int num in nums)
        {
            elementSum += num;
            
            int temp = num;
            while (temp > 0)
            {
                digitSum += temp % 10;
                temp /= 10;
            }
        }
        
        return Math.Abs(elementSum - digitSum);
    }
}
```

## Complexity

- **Time:** O(n × log(max_num)) where n is the length of nums
- **Space:** O(1)
