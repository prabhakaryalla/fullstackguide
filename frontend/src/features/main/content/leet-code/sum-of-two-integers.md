# 371. Sum of Two Integers

**Difficulty:** Medium
**Category:** Math, Bit Manipulation

## Problem

Given two integers `a` and `b`, return the sum of the two integers without using the operators `+` and `-`.

### Example

```
Input: a = 1, b = 2
Output: 3
```

### Constraints

- `-1000 <= a, b <= 1000`

## Approach

Use bitwise operations to simulate addition: `a ^ b` gives the sum ignoring carries, and `a & b` (shifted left by one) gives the carry bits that need to be added back in. Repeat, feeding the carry back in as `b`, until there is no carry left.

## C# Solution

```csharp
public class Solution
{
    public int GetSum(int a, int b)
    {
        while (b != 0)
        {
            int carry = a & b;
            a ^= b;
            b = carry << 1;
        }

        return a;
    }
}
```

## Complexity

- **Time:** `O(1)` — bounded by the fixed 32-bit integer width.
- **Space:** `O(1)`.
