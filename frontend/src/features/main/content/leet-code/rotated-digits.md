# 788. Rotated Digits

**Difficulty:** Easy
**Category:** Math, Dynamic Programming

## Problem

An integer is "good" if, after rotating each of its digits 180 degrees (`0->0`, `1->1`, `8->8`, `2->5`, `5->2`, `6->9`, `9->6`; any digit `3`, `4`, or `7` invalidates the rotation), it produces a different valid number. Given `n`, return how many integers in `[1, n]` are good.

### Example

```
Input: n = 10
Output: 4
```

## Approach

For each number, inspect its digits: if any digit is `3`, `4`, or `7`, the rotation is invalid. Otherwise, if at least one digit is `2`, `5`, `6`, or `9` (a digit that changes under rotation), the number is good; if every digit is only `0`, `1`, or `8` (self-symmetric), rotating produces the same number, so it doesn't count.

## C# Solution

```csharp
public class Solution
{
    public int RotatedDigits(int n)
    {
        int count = 0;

        for (int i = 1; i <= n; i++)
        {
            if (IsGoodNumber(i)) count++;
        }

        return count;
    }

    private bool IsGoodNumber(int num)
    {
        bool hasDifferentDigit = false;

        while (num > 0)
        {
            int digit = num % 10;

            if (digit == 3 || digit == 4 || digit == 7) return false;

            if (digit == 2 || digit == 5 || digit == 6 || digit == 9)
                hasDifferentDigit = true;

            num /= 10;
        }

        return hasDifferentDigit;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(1)` extra.
