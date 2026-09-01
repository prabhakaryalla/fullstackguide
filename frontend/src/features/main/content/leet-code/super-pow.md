# 372. Super Pow

**Difficulty:** Medium
**Category:** Math, Divide and Conquer

## Problem

Given a base integer `a` and a huge exponent given as an array of digits `b`, calculate `a^b mod 1337`.

### Example

```
Input: a = 2, b = [3]
Output: 8
```

### Constraints

- `1 <= a <= 2^31 - 1`
- `1 <= b.length <= 2000`
- `0 <= b[i] <= 9`
- `b` does not contain leading zeros.

## Approach

Process the exponent digit by digit from left to right using the identity `a^(10*x + d) = (a^x)^10 * a^d`. Maintain a running result, and for each new digit, raise the current result to the 10th power (mod 1337) and multiply by `a` raised to that digit (mod 1337).

## C# Solution

```csharp
public class Solution
{
    private const int Mod = 1337;

    public int SuperPow(int a, int[] b)
    {
        int result = 1;
        a %= Mod;

        foreach (var digit in b)
        {
            result = Power(result, 10) * Power(a, digit) % Mod;
        }

        return result;
    }

    private int Power(int a, int exponent)
    {
        a %= Mod;
        int result = 1;
        for (int i = 0; i < exponent; i++)
            result = result * a % Mod;

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of digits in `b` (each digit does constant-bounded work).
- **Space:** `O(1)`.
