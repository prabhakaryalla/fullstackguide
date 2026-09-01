# 650. 2 Keys Keyboard

**Difficulty:** Medium
**Category:** Math, Dynamic Programming

## Problem

Starting with one `'A'` on a notepad, you can only `Copy All` or `Paste` (pasting appends a copy of everything last copied). Given an integer `n`, return the minimum number of operations to produce exactly `n` `'A'`s.

### Example

```
Input: n = 3
Output: 3
Explanation: Copy All, Paste, Paste.
```

### Constraints

- `1 <= n <= 1000`

## Approach

The minimum number of operations to reach `n` equals the sum of its prime factors (with multiplicity): each prime factor `p` corresponds to one `Copy All` followed by `p - 1` pastes (p operations total) to multiply the current count by `p`. Repeatedly divide `n` by its smallest available factor, accumulating that factor into the operation count, until `n` is reduced to `1`.

## C# Solution

```csharp
public class Solution
{
    public int MinSteps(int n)
    {
        int steps = 0;

        for (int factor = 2; factor <= n; factor++)
        {
            while (n % factor == 0)
            {
                steps += factor;
                n /= factor;
            }
        }

        return steps;
    }
}
```

## Complexity

- **Time:** `O(n)` in the worst case (bounded by trial division), effectively much faster for typical inputs.
- **Space:** `O(1)`.
