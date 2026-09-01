# 3099. Harshad Number

**Difficulty:** Easy
**Category:** Math

## Problem

An integer `x` is a "Harshad number" if it is divisible by the sum of its digits. Given a positive integer `x`, return the digit sum of `x` if it is a Harshad number, or `-1` otherwise.

### Example

```
Input: x = 18
Output: 9
Explanation: The digit sum of 18 is 1 + 8 = 9, and 18 is divisible by 9, so 18 is a Harshad number.
```

## Approach

Compute the digit sum by repeatedly extracting the last digit. Then check whether `x` is evenly divisible by that digit sum.

## C# Solution

```csharp
public class Solution {
    public int SumOfTheDigitsOfHarshadNumber(int x) {
        int digitSum = GetDigitSum(x);
        return x % digitSum == 0 ? digitSum : -1;
    }

    private int GetDigitSum(int x) {
        int digitSum = 0;
        while (x > 0) {
            digitSum += x % 10;
            x /= 10;
        }
        return digitSum;
    }
}
```

## Complexity

- Time: O(log x) — proportional to the number of digits in `x`.
- Space: O(1).
