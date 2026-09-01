# 69. Sqrt(x)

**Difficulty:** Easy
**Category:** Math, Binary Search

## Problem

Given a non-negative integer `x`, return the square root of `x` rounded down to the nearest integer. You must not use any built-in exponent function or operator.

### Example 1

```
Input: x = 4
Output: 2
```

### Example 2

```
Input: x = 8
Output: 2
Explanation: sqrt(8) is 2.82842..., and since the decimal part is truncated, 2 is returned.
```

### Constraints

- `0 <= x <= 2^31 - 1`

## Approach

Binary search over the candidate answer range `[0, x]`: for a candidate `mid`, check whether `mid * mid <= x`. Find the largest such `mid` — this is the integer square root. Use `long` for the multiplication to avoid overflow.

## C# Solution

```csharp
public class Solution
{
    public int MySqrt(int x)
    {
        if (x < 2) return x;

        long lo = 1, hi = x, answer = 1;

        while (lo <= hi)
        {
            long mid = lo + (hi - lo) / 2;

            if (mid * mid <= x)
            {
                answer = mid;
                lo = mid + 1;
            }
            else
            {
                hi = mid - 1;
            }
        }

        return (int)answer;
    }
}
```

## Complexity

- **Time:** `O(log x)` — binary search over the range `[0, x]`.
- **Space:** `O(1)`.
