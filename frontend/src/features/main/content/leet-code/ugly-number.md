# 263. Ugly Number

**Difficulty:** Easy
**Category:** Math

## Problem

An ugly number is a positive integer whose prime factors are limited to `2`, `3`, and `5`. Given an integer `n`, return `true` if `n` is an ugly number.

### Example

```
Input: n = 6
Output: true
```

### Constraints

- `-2^31 <= n <= 2^31 - 1`

## Approach

Non-positive numbers are never ugly. Otherwise, repeatedly divide `n` by `2`, `3`, and `5` for as long as it remains divisible. If what's left after removing every factor of 2, 3, and 5 is exactly `1`, the number is ugly.

## C# Solution

```csharp
public class Solution
{
    public bool IsUgly(int n)
    {
        if (n <= 0) return false;

        foreach (int factor in new[] { 2, 3, 5 })
        {
            while (n % factor == 0) n /= factor;
        }

        return n == 1;
    }
}
```

## Complexity

- **Time:** `O(log n)` — each factor is divided out repeatedly.
- **Space:** `O(1)`.
