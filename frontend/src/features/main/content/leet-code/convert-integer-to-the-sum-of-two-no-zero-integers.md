# 1317. Convert Integer to the Sum of Two No-Zero Integers

**Difficulty:** Easy
**Category:** Math

## Problem

Given an integer `n`, return two positive integers `a` and `b` such that `a + b == n` and neither `a` nor `b` contains the digit `0` in its decimal representation.

### Example

```
Input: n = 11
Output: [2,9]
```

## Approach

Try every split `a = 1, 2, 3, ...` with `b = n - a`, checking whether both numbers are free of the digit `0`. Since "no-zero" numbers are common, a valid split is found quickly.

## C# Solution

```csharp
public class Solution
{
    public int[] GetNoZeroIntegers(int n)
    {
        for (int a = 1; a < n; a++)
        {
            int b = n - a;
            if (HasNoZero(a) && HasNoZero(b)) return new[] { a, b };
        }

        return new[] { 0, 0 };
    }

    private bool HasNoZero(int num)
    {
        while (num > 0)
        {
            if (num % 10 == 0) return false;
            num /= 10;
        }
        return true;
    }
}
```

## Complexity

- **Time:** `O(n log n)` in the worst case.
- **Space:** `O(1)`.
