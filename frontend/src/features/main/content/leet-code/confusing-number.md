# 1056. Confusing Number

**Difficulty:** Easy
**Category:** Math

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

A number is confusing if, when rotated 180 degrees, each digit remains valid (only `0, 1, 6, 8, 9` are valid, mapping to `0, 1, 9, 8, 6` respectively) and the resulting rotated number is different from the original. Given an integer `n`, return `true` if it's a confusing number.

### Example

```
Input: n = 6
Output: true
Explanation: 6 rotates to 9, which is different from 6.
```

## Approach

Walk the digits of `n` from least to most significant, building the rotated number by mapping each digit through the rotation table (and failing immediately if a digit like `2, 3, 4, 5, 7` appears, since those have no valid rotation). Once the full rotated value is built, compare it to the original — it's confusing only if they differ.

## C# Solution

```csharp
public class Solution
{
    public bool ConfusingNumber(int n)
    {
        var rotate = new Dictionary<int, int>
        {
            [0] = 0, [1] = 1, [6] = 9, [8] = 8, [9] = 6
        };

        int original = n;
        long rotated = 0;
        int temp = n;

        while (temp > 0)
        {
            int digit = temp % 10;
            if (!rotate.ContainsKey(digit)) return false;
            rotated = rotated * 10 + rotate[digit];
            temp /= 10;
        }

        return rotated != original;
    }
}
```

## Complexity

- **Time:** `O(log n)` — one pass over the digits.
- **Space:** `O(1)`.
