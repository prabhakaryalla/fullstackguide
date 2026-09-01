# 660. Remove 9

**Difficulty:** Hard
**Category:** Math
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a positive integer `n`, imagine removing every number from the positive integer sequence that contains the digit `9`. Return the `n`th number remaining in this filtered sequence.

### Example

```
Input: n = 9
Output: 10
```

## Approach

The remaining numbers (those with no digit `9`) are exactly the base-9 representations of `0, 1, 2, ...` reinterpreted as base-10 digit strings — since skipping digit `9` from base-10 counting is equivalent to counting in base 9 and using the same digit symbols. Convert `n` to base 9, then read those base-9 digits back as a base-10 number to get the answer.

## C# Solution

```csharp
public class Solution
{
    public int NewInteger(int n)
    {
        var digits = new List<int>();

        while (n > 0)
        {
            digits.Add(n % 9);
            n /= 9;
        }

        digits.Reverse();

        int result = 0;
        foreach (var digit in digits)
            result = result * 10 + digit;

        return result;
    }
}
```

## Complexity

- **Time:** `O(log n)`.
- **Space:** `O(log n)` for the digit list.
