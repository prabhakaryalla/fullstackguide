# 1201. Ugly Number III

**Difficulty:** Medium
**Category:** Math, Binary Search, Number Theory

## Problem

Given four integers `n`, `a`, `b`, and `c`, return the `n`th ugly number, where an ugly number is a positive integer divisible by `a`, `b`, or `c`.

### Example

```
Input: n = 3, a = 2, b = 3, c = 5
Output: 4
Explanation: The ugly numbers are 2, 3, 4, 5, 6, 8, 9, 10... The 3rd is 4.
```

## Approach

Binary search on the candidate value `x`. For any `x`, the count of ugly numbers `<= x` can be computed in O(1) using inclusion-exclusion: `x/a + x/b + x/c - x/lcm(a,b) - x/lcm(a,c) - x/lcm(b,c) + x/lcm(a,b,c)`. Binary search the smallest `x` whose count is `>= n`; that value is the answer.

## C# Solution

```csharp
public class Solution
{
    public int NthUglyNumber(int n, int a, int b, int c)
    {
        long ab = Lcm(a, b);
        long ac = Lcm(a, c);
        long bc = Lcm(b, c);
        long abc = Lcm(ab, c);

        long lo = 1, hi = 2_000_000_000L;
        while (lo < hi)
        {
            long mid = lo + (hi - lo) / 2;
            long count = mid / a + mid / b + mid / c - mid / ab - mid / ac - mid / bc + mid / abc;

            if (count >= n) hi = mid;
            else lo = mid + 1;
        }

        return (int)lo;
    }

    private long Gcd(long x, long y) => y == 0 ? x : Gcd(y, x % y);
    private long Lcm(long x, long y) => x / Gcd(x, y) * y;
}
```

## Complexity

- **Time:** `O(log(maxValue))` for the binary search.
- **Space:** `O(1)`.
