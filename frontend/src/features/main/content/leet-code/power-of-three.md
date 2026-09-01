# 326. Power of Three

**Difficulty:** Easy
**Category:** Math, Recursion

## Problem

Given an integer `n`, return `true` if it is a power of three. Otherwise, return `false`.

### Example

```
Input: n = 27
Output: true
```

### Constraints

- `-2^31 <= n <= 2^31 - 1`

## Approach

Repeatedly divide `n` by `3` while it divides evenly; `n` is a power of three if and only if this process ends at exactly `1` (non-positive numbers are never powers of three).

## C# Solution

```csharp
public class Solution
{
    public bool IsPowerOfThree(int n)
    {
        if (n <= 0) return false;

        while (n % 3 == 0)
            n /= 3;

        return n == 1;
    }
}
```

## Complexity

- **Time:** `O(log₃ n)`.
- **Space:** `O(1)`.
