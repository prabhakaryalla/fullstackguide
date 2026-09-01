# 258. Add Digits

**Difficulty:** Easy
**Category:** Math, Simulation, Number Theory

## Problem

Given an integer `num`, repeatedly add all its digits until the result has only one digit, and return that digit.

### Example

```
Input: num = 38
Output: 2
```

### Constraints

- `0 <= num <= 2^31 - 1`

## Approach

Repeated digit summation converges to the number's "digital root", which has a closed-form solution based on modular arithmetic: for `num > 0`, the answer is `1 + (num - 1) % 9`; for `num == 0`, the answer is `0`. This avoids looping entirely.

## C# Solution

```csharp
public class Solution
{
    public int AddDigits(int num)
    {
        if (num == 0) return 0;
        return 1 + (num - 1) % 9;
    }
}
```

## Complexity

- **Time:** `O(1)`.
- **Space:** `O(1)`.
