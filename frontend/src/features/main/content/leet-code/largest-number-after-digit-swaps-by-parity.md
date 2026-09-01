# 2231. Largest Number After Digit Swaps by Parity

**Difficulty:** Easy
**Category:** Array, Sorting

## Problem

You are given a positive integer `num`. You may swap any two digits of `num` that have the same parity (i.e., both odd digits or both even digits). Return the largest possible value of `num` after any number of swaps.

### Example

```
Input: num = 1234
Output: 3412
Explanation: Swap 1 with 3 (both odd), and swap 2 with 4 (both even).
```

## Approach

Extract all odd-positioned digits and even-positioned digits separately, sort them in descending order, then reconstruct the number by placing the largest available digit of the same parity at each position.

## C# Solution

```csharp
public class Solution
{
    public int LargestInteger(int num)
    {
        var digits = num.ToString().Select(c => c - '0').ToArray();
        var odds = digits.Where(d => d % 2 == 1).OrderByDescending(d => d).ToList();
        var evens = digits.Where(d => d % 2 == 0).OrderByDescending(d => d).ToList();
        
        int oddIdx = 0, evenIdx = 0;
        for (int i = 0; i < digits.Length; i++)
        {
            if (digits[i] % 2 == 1)
            {
                digits[i] = odds[oddIdx++];
            }
            else
            {
                digits[i] = evens[evenIdx++];
            }
        }
        
        return int.Parse(string.Concat(digits));
    }
}
```

## Complexity

- **Time:** O(n log n) where n is the number of digits
- **Space:** O(n) for storing digit lists
