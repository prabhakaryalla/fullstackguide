# 1017. Convert to Base -2

**Difficulty:** Medium
**Category:** Math

## Problem

Given an integer `n`, return a binary string representing `n` in base `-2` (negative two).

### Example

```
Input: n = 3
Output: "111"
Explanation: (-2)^2 + (-2)^1 + (-2)^0 = 4 - 2 + 1 = 3
```

## Approach

Repeatedly divide `n` by `-2`, extracting a digit each time from the remainder. Since C#'s `%` operator can return a negative remainder when the divisor is negative, normalize any negative remainder by adding `2` and compensating the quotient by adding `1`, which keeps the digit in `{0, 1}` while preserving the mathematical value. Collect digits from least significant to most significant, then reverse them for the final string.

## C# Solution

```csharp
public class Solution
{
    public string BaseNeg2(int n)
    {
        if (n == 0) return "0";

        var digits = new List<char>();

        while (n != 0)
        {
            int remainder = n % -2;
            n /= -2;

            if (remainder < 0)
            {
                remainder += 2;
                n += 1;
            }

            digits.Add((char)('0' + remainder));
        }

        digits.Reverse();
        return new string(digits.ToArray());
    }
}
```

## Complexity

- **Time:** `O(log n)` — number of digits produced.
- **Space:** `O(log n)` for the digit buffer.
