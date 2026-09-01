# 1780. Check if Number is a Sum of Powers of Three

**Difficulty:** Medium
**Category:** Math

## Problem

Given an integer `n`, return `true` if it is possible to express `n` as the sum of distinct powers of three.

### Example

```
Input: n = 12
Output: true
Explanation: 12 = 3^1 + 3^2
```

## Approach

Repeatedly divide `n` by `3`, examining the remainder at each step — this is equivalent to inspecting the base-3 representation of `n`. If any digit is `2`, that power of three would need to be used twice (or a workaround borrowed from a higher power), which is not allowed since powers must be distinct; only digits `0` and `1` are valid.

## C# Solution

```csharp
public class Solution
{
    public bool CheckPowersOfThree(int n)
    {
        while (n > 0)
        {
            if (n % 3 == 2) return false;
            n /= 3;
        }
        return true;
    }
}
```

## Complexity

- **Time:** `O(log n)`.
- **Space:** `O(1)`.
