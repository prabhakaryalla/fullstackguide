# 878. Nth Magical Number

**Difficulty:** Hard
**Category:** Math, Binary Search

## Problem

A positive integer is "magical" if it is divisible by `a` or `b`. Given `n`, `a`, and `b`, return the `n`-th magical number, modulo `10^9 + 7`.

### Example

```
Input: n = 1, a = 2, b = 3
Output: 2
```

## Approach

Binary search on the answer. For a candidate value `x`, the count of magical numbers `<= x` is given by inclusion-exclusion: `x/a + x/b - x/lcm(a, b)`. Since this count is monotonically non-decreasing in `x`, binary search for the smallest `x` whose count is at least `n`.

## C# Solution

```csharp
public class Solution
{
    public int NthMagicalNumber(int n, int a, int b)
    {
        const int MOD = 1_000_000_007;
        long lcm = Lcm(a, b);

        long left = 1, right = (long)n * Math.Min(a, b);

        while (left < right)
        {
            long mid = left + (right - left) / 2;
            long count = mid / a + mid / b - mid / lcm;

            if (count < n)
                left = mid + 1;
            else
                right = mid;
        }

        return (int)(left % MOD);
    }

    private long Gcd(long a, long b) => b == 0 ? a : Gcd(b, a % b);
    private long Lcm(long a, long b) => a / Gcd(a, b) * b;
}
```

## Complexity

- **Time:** `O(log(n * min(a, b)))`.
- **Space:** `O(1)` extra.
