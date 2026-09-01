# 3765. Complete Prime Number

**Difficulty:** Medium
**Category:** Math, Enumeration, Number Theory

## Problem

Given an integer `num`, it is a "Complete Prime Number" if every prefix (first `k` digits) and every suffix (last `k` digits) of `num` is prime. Single-digit numbers qualify only if they themselves are prime. Return `true` if `num` is a Complete Prime Number.

### Example

Input: `num = 23`
Output: `true`

Prefixes are 2 and 23 (both prime); suffixes are 3 and 23 (both prime).

## Approach

Convert `num` to a string. For every length `k` from 1 to the string length, extract the prefix and the suffix of length `k` and check both for primality using trial division up to the square root. Return `false` as soon as any check fails.

## C# Solution

```csharp
public class Solution 
{
    public bool CompletePrime(int num) 
    {
        string s = num.ToString();
        int n = s.Length;
        for (int k = 1; k <= n; k++)
        {
            long prefix = long.Parse(s.Substring(0, k));
            long suffix = long.Parse(s.Substring(n - k, k));
            if (!IsPrime(prefix) || !IsPrime(suffix)) return false;
        }
        return true;
    }

    private bool IsPrime(long x)
    {
        if (x < 2) return false;
        if (x < 4) return true;
        if (x % 2 == 0) return false;
        for (long i = 3; i * i <= x; i += 2)
            if (x % i == 0) return false;
        return true;
    }
}
```

## Complexity

- **Time:** O(d * sqrt(num)) where d is the digit count
- **Space:** O(d)
