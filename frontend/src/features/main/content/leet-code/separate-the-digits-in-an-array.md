# 2553. Separate the Digits in an Array

**Difficulty:** Easy
**Category:** Array, Simulation

## Problem

Given an array of positive integers `nums`, return an array `answer` that consists of the digits of each integer in `nums` after separating them in the same order they appear in `nums`.

To separate the digits of an integer is to get all of its digits in the same order.

### Example

```
Input: nums = [13,25,83,77]
Output: [1,3,2,5,8,3,7,7]
Explanation: Separate 13→[1,3], 25→[2,5], 83→[8,3], 77→[7,7]

Input: nums = [7,1,3,9]
Output: [7,1,3,9]
Explanation: Single-digit numbers remain as is.
```

## Approach

For each number in the array, extract its digits from left to right. One way is to convert each number to a string, iterate through characters, and convert each character back to a digit.

Alternatively, extract digits mathematically by finding the highest power of 10 and repeatedly dividing.

## C# Solution

```csharp
public class Solution
{
    public int[] SeparateDigits(int[] nums)
    {
        var result = new List<int>();
        
        foreach (int num in nums)
        {
            string s = num.ToString();
            foreach (char c in s)
            {
                result.Add(c - '0');
            }
        }
        
        return result.ToArray();
    }
}
```

## Complexity

- **Time:** O(n × d) where n is the array length and d is the average number of digits
- **Space:** O(n × d) for the result array
