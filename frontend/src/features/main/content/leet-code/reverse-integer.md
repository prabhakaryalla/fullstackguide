# 7. Reverse Integer

**Difficulty:** Medium
**Category:** Math

## Problem

Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range `[-2^31, 2^31 - 1]`, then return `0`.

### Example 1

```
Input: x = 123
Output: 321
```

### Example 2

```
Input: x = -123
Output: -321
```

### Example 3

```
Input: x = 120
Output: 21
```

### Constraints

- `-2^31 <= x <= 2^31 - 1`

## Approach

Peel off digits one at a time using `% 10` and `/ 10`, building the reversed number. Accumulate into a `long` so overflow can be detected by comparing against `int.MinValue`/`int.MaxValue` before casting back down.

## C# Solution

```csharp
public class Solution
{
    public int Reverse(int x)
    {
        long result = 0;

        while (x != 0)
        {
            result = result * 10 + x % 10;
            x /= 10;
        }

        return (result < int.MinValue || result > int.MaxValue) ? 0 : (int)result;
    }
}
```

## Complexity

- **Time:** `O(log10(x))` — proportional to the number of digits in `x`.
- **Space:** `O(1)`.
