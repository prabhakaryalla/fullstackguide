# 1295. Find Numbers with Even Number of Digits

**Difficulty:** Easy
**Category:** Array, Math

## Problem

Given an array of integers `nums`, return how many of them contain an even number of digits.

### Example

```
Input: nums = [12,345,2,6,7896]
Output: 2
```

## Approach

For each number, count its digits (using `Math.Log10` of its absolute value, adding `1`, with a special case for `0` which has exactly one digit), and check whether that digit count is even. Tally up all numbers that qualify.

## C# Solution

```csharp
public class Solution
{
    public int FindNumbers(int[] nums)
    {
        int count = 0;

        foreach (int num in nums)
        {
            int digits = num == 0 ? 1 : (int)Math.Log10(Math.Abs(num)) + 1;
            if (digits % 2 == 0) count++;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the length of `nums`.
- **Space:** `O(1)`.
