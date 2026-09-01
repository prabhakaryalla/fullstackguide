# 2980. Check if Bitwise OR Has Trailing Zeros

**Difficulty:** Easy
**Category:** Array, Bit Manipulation

## Problem

You are given an array of positive integers `nums`. Return `true` if the bitwise OR of any two different elements has trailing zeros, otherwise return `false`.

A number has trailing zeros if its binary representation ends with one or more 0s.

### Example

```
Input: nums = [1, 2, 3, 4, 5]
Output: true
Explanation: 2 OR 4 = 110 OR 100 = 110 (ends with 0)

Input: nums = [1, 3, 5, 7, 9]
Output: false
Explanation: All numbers are odd, so any OR will also be odd (no trailing zeros).
```

## Approach

A bitwise OR has a trailing zero only if both operands have a trailing zero (both are even). Simply check if there are at least two even numbers in the array.

## C# Solution

```csharp
public class Solution
{
    public bool HasTrailingZeros(int[] nums)
    {
        int evenCount = 0;

        foreach (int num in nums)
        {
            if (num % 2 == 0)
            {
                evenCount++;
                if (evenCount >= 2)
                {
                    return true;
                }
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
