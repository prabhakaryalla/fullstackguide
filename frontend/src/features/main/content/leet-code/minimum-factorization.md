# 625. Minimum Factorization

**Difficulty:** Medium
**Category:** Math
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a positive integer `num`, return the smallest positive integer whose digits multiply together to equal `num`. Return `0` if no such integer exists or the result overflows a 32-bit signed integer.

### Example

```
Input: num = 48
Output: 68
```

### Constraints

- `1 <= num <= 2^31 - 1`

## Approach

Greedily divide `num` by the largest possible single digit factor (from `9` down to `2`) repeatedly, collecting each factor used — using the largest digits first keeps the resulting number as short (and thus as small) as possible. If `num` can't be fully reduced to `1` this way, it has a prime factor greater than `9`, so no valid digit-based factorization exists. Otherwise, arrange the collected factors from smallest to largest to form the minimal number.

## C# Solution

```csharp
public class Solution
{
    public int SmallestFactorization(int num)
    {
        if (num == 1) return 1;

        var digits = new List<int>();

        for (int factor = 9; factor >= 2; factor--)
        {
            while (num % factor == 0)
            {
                digits.Add(factor);
                num /= factor;
            }
        }

        if (num != 1) return 0;

        digits.Reverse();
        long result = 0;
        foreach (var digit in digits)
        {
            result = result * 10 + digit;
            if (result > int.MaxValue) return 0;
        }

        return (int)result;
    }
}
```

## Complexity

- **Time:** `O(log num)`.
- **Space:** `O(log num)` for the collected digits.
