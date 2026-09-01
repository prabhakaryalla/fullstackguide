# 1088. Confusing Number II

**Difficulty:** Hard
**Category:** Math, Backtracking

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

A confusing number is one that, when rotated 180 degrees, becomes a different valid number (using the digit rotations `0→0, 1→1, 6→9, 8→8, 9→6`; any other digit makes the rotation invalid). Given an integer `n`, return the count of confusing numbers in the range `[1, n]`.

### Example

```
Input: n = 20
Output: 6
```

## Approach

Only numbers built entirely from the digits `{0, 1, 6, 8, 9}` can possibly be confusing, so backtrack by appending one valid digit at a time to build candidate numbers up to `n` digits long (skipping a leading zero). At each constructed number (other than the implicit empty prefix), check whether rotating it produces a different value than the original, and count it if so. Prune any branch once the number under construction would exceed `n`.

## C# Solution

```csharp
public class Solution
{
    private static readonly int[] ValidDigits = { 0, 1, 6, 8, 9 };
    private static readonly Dictionary<int, int> Rotation = new Dictionary<int, int>
    {
        [0] = 0, [1] = 1, [6] = 9, [8] = 8, [9] = 6
    };

    public int ConfusingNumberII(int n)
    {
        return Backtrack(0, n);
    }

    private int Backtrack(long current, int n)
    {
        int count = 0;

        if (current != 0 && IsConfusing(current))
        {
            count++;
        }

        foreach (var digit in ValidDigits)
        {
            if (current == 0 && digit == 0) continue;

            long next = current * 10 + digit;
            if (next > n) continue;

            count += Backtrack(next, n);
        }

        return count;
    }

    private bool IsConfusing(long num)
    {
        long original = num;
        long rotated = 0;
        long temp = num;

        while (temp > 0)
        {
            int digit = (int)(temp % 10);
            rotated = rotated * 10 + Rotation[digit];
            temp /= 10;
        }

        return rotated != original;
    }
}
```

## Complexity

- **Time:** `O(5^d)` where `d` is the number of digits in `n` — bounded by the valid-digit branching factor.
- **Space:** `O(d)` recursion depth.
