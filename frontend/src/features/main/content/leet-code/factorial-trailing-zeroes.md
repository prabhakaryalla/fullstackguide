# 172. Factorial Trailing Zeroes

**Difficulty:** Medium
**Category:** Math

## Problem

Given an integer `n`, return the number of trailing zeroes in `n!`.

### Example

```
n = 3 -> 0   (3! = 6)
n = 5 -> 1   (5! = 120)
```

## Approach

Trailing zeroes come from factors of 10, which come from pairing a 2 and a 5. Factors of 2 are far more abundant than factors of 5 in any factorial, so the count of trailing zeroes equals the count of factor-5's in `n!`. Sum `n / 5 + n / 25 + n / 125 + ...` to count every multiple of 5, 25, 125, etc. (numbers like 25 contribute two 5's, 125 contributes three, and so on).

## C# Solution

```csharp
public class Solution
{
    public int TrailingZeroes(int n)
    {
        int count = 0;

        for (long divisor = 5; divisor <= n; divisor *= 5)
        {
            count += (int)(n / divisor);
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(log5 n)` — the loop runs once per power of 5 up to `n`.
- **Space:** `O(1)`.
