# 29. Divide Two Integers

**Difficulty:** Medium
**Category:** Bit Manipulation, Math

## Problem

Given two integers `dividend` and `divisor`, divide two integers without using multiplication, division, and mod operator. The integer division should truncate toward zero.

Return the quotient after dividing `dividend` by `divisor`. Assume we are dealing with an environment that could only store integers within the 32-bit signed integer range; if the quotient overflows, return `2^31 - 1`.

### Example 1

```
Input: dividend = 10, divisor = 3
Output: 3
Explanation: 10/3 = 3.33333.. which is truncated to 3.
```

### Example 2

```
Input: dividend = 7, divisor = -3
Output: -2
Explanation: 7/-3 = -2.33333.. which is truncated to -2.
```

### Constraints

- `-2^31 <= dividend, divisor <= 2^31 - 1`
- `divisor != 0`

## Approach

Repeated subtraction is too slow for large inputs, so instead double the divisor via bit shifts (`divisor << 1`) to subtract the largest possible multiple of the divisor at each step, accumulating the corresponding power of two into the quotient. This is effectively long division in binary.

## C# Solution

```csharp
public class Solution
{
    public int Divide(int dividend, int divisor)
    {
        if (dividend == int.MinValue && divisor == -1) return int.MaxValue;

        bool negative = (dividend < 0) != (divisor < 0);
        long a = Math.Abs((long)dividend);
        long b = Math.Abs((long)divisor);
        long result = 0;

        while (a >= b)
        {
            long temp = b, multiple = 1;

            while (a >= (temp << 1))
            {
                temp <<= 1;
                multiple <<= 1;
            }

            a -= temp;
            result += multiple;
        }

        return negative ? (int)-result : (int)result;
    }
}
```

## Complexity

- **Time:** `O(log^2(dividend))` — each outer iteration removes at least half the remaining value, and each inner doubling loop is also logarithmic.
- **Space:** `O(1)`.
