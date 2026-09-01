# 1952. Three Divisors

**Difficulty:** Easy
**Category:** Math

## Problem

Given an integer `n`, return `true` if `n` has exactly three positive divisors, otherwise return `false`.

### Example

```
Input: n = 4
Output: true
Explanation: 4 has divisors 1, 2, and 4 — exactly three.
```

### Constraints

- `1 <= n <= 10^4`

## Approach

A number has exactly three divisors if and only if it is the square of a prime number (divisors are `1`, `p`, and `p^2`). Compute the integer square root `r` of `n`; if `r * r != n`, `n` is not a perfect square and thus cannot have exactly three divisors. If it is a perfect square, check whether `r` is prime by trial division up to `sqrt(r)`.

## C# Solution

```csharp
public class Solution
{
    public bool IsThree(int n)
    {
        int r = (int)Math.Sqrt(n);
        while (r * r > n) r--;
        while ((r + 1) * (r + 1) <= n) r++;

        if (r * r != n) return false;
        if (r < 2) return false;

        for (int i = 2; (long)i * i <= r; i++)
        {
            if (r % i == 0) return false;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(sqrt(n))` — dominated by the primality check on the square root.
- **Space:** `O(1)`.
