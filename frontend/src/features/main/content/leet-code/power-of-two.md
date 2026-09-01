# 231. Power of Two

**Difficulty:** Easy
**Category:** Math, Bit Manipulation, Recursion

## Problem

Given an integer `n`, return `true` if it is a power of two, and `false` otherwise.

### Example

```
n = 16 -> true
n = 3 -> false
```

## Approach

A power of two has exactly one bit set in its binary representation (e.g. `1000` for 8). The `n & (n - 1)` trick clears the lowest set bit; if `n` had only one bit set, this leaves `0`. Also guard against `n <= 0`, since negative numbers and zero can never be powers of two.

## C# Solution

```csharp
public class Solution
{
    public bool IsPowerOfTwo(int n)
    {
        return n > 0 && (n & (n - 1)) == 0;
    }
}
```

## Complexity

- **Time:** `O(1)`.
- **Space:** `O(1)`.
