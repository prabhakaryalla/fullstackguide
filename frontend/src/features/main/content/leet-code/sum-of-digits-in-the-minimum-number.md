# 1085. Sum of Digits in the Minimum Number

**Difficulty:** Easy
**Category:** Array, Math

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an integer array `nums`, find the smallest number in it, sum its digits, and return `0` if that sum is even, or `1` if it's odd.

### Example

```
Input: nums = [34,23,1,24,75,33,54,8]
Output: 1
Explanation: The smallest number is 1, and its digit sum (1) is odd.
```

## Approach

Find the minimum value in the array, then peel off its digits one at a time (via `% 10` and `/ 10`) to accumulate their sum. Return `1` if that sum is odd, `0` if even.

## C# Solution

```csharp
public class Solution
{
    public int SumOfDigits(int[] nums)
    {
        int minValue = nums.Min();
        int sum = 0;

        while (minValue > 0)
        {
            sum += minValue % 10;
            minValue /= 10;
        }

        return sum % 2 == 0 ? 1 : 0;
    }
}
```

## Complexity

- **Time:** `O(n + log(min))` — a linear scan for the minimum plus digit extraction.
- **Space:** `O(1)`.
