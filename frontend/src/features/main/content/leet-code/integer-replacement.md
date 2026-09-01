# 397. Integer Replacement

**Difficulty:** Medium
**Category:** Math, Bit Manipulation, Dynamic Programming, Memoization

## Problem

Given a positive integer `n`, apply the following operations until `n` equals `1`: if `n` is even, replace it with `n / 2`; if `n` is odd, replace it with either `n + 1` or `n - 1`. Return the minimum number of operations needed for `n` to become `1`.

### Example

```
Input: n = 8
Output: 3
Explanation: 8 -> 4 -> 2 -> 1
```

### Constraints

- `1 <= n <= 2^31 - 1`

## Approach

Greedily halve even numbers. For odd numbers, choosing `+1` versus `-1` is decided by looking at the second-lowest bit: if `n == 3` or `n mod 4 == 1`, decrementing leads to a number with more trailing zeros (fewer future steps), otherwise incrementing does. Use a `long` accumulator since `n` can temporarily exceed `int` range when incrementing near `int.MaxValue`.

## C# Solution

```csharp
public class Solution
{
    public int IntegerReplacement(int n)
    {
        long value = n;
        int steps = 0;

        while (value != 1)
        {
            if (value % 2 == 0)
            {
                value /= 2;
            }
            else if (value == 3 || value % 4 == 1)
            {
                value--;
            }
            else
            {
                value++;
            }

            steps++;
        }

        return steps;
    }
}
```

## Complexity

- **Time:** `O(log n)`.
- **Space:** `O(1)`.
