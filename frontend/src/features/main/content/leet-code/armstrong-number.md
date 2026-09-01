# 1134. Armstrong Number

**Difficulty:** Easy
**Category:** Math

## Problem

Given an integer `n`, return `true` if it is an Armstrong number — a number equal to the sum of its own digits, each raised to the power of the number of digits.

### Example

```
Input: n = 153
Output: true
```

## Approach

Count the number of digits in `n`, then peel off digits one at a time from the least significant end, raising each to that digit count and accumulating the sum. Compare the accumulated sum to the original number.

## C# Solution

```csharp
public class Solution
{
    public bool IsArmstrong(int n)
    {
        int original = n;
        int digitCount = n.ToString().Length;
        int sum = 0;
        int temp = n;

        while (temp > 0)
        {
            int digit = temp % 10;
            sum += (int)Math.Pow(digit, digitCount);
            temp /= 10;
        }

        return sum == original;
    }
}
```

## Complexity

- **Time:** `O(d)`, where `d` is the number of digits in `n`.
- **Space:** `O(1)`.
