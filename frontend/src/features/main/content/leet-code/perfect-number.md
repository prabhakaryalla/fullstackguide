# 507. Perfect Number

**Difficulty:** Easy
**Category:** Math

## Problem

A perfect number is a positive integer that is equal to the sum of its positive divisors, excluding the number itself. Given an integer `num`, return `true` if it is a perfect number.

### Example

```
Input: num = 28
Output: true
Explanation: 28 = 1 + 2 + 4 + 7 + 14
```

### Constraints

- `1 <= num <= 10^8`

## Approach

Only check divisors up to `√num`, since divisors pair up (`i` and `num / i`). Accumulate both members of each divisor pair found (skipping the double-count when `i == num / i`), starting the sum at `1` since every number greater than 1 is divisible by 1.

## C# Solution

```csharp
public class Solution
{
    public bool CheckPerfectNumber(int num)
    {
        if (num <= 1) return false;

        int sum = 1;
        for (int i = 2; (long)i * i <= num; i++)
        {
            if (num % i == 0)
            {
                sum += i;
                if (i != num / i)
                    sum += num / i;
            }
        }

        return sum == num;
    }
}
```

## Complexity

- **Time:** `O(√num)`.
- **Space:** `O(1)`.
