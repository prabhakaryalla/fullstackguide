# 3791. Number of Balanced Integers in a Range

**Difficulty:** Hard
**Category:** Dynamic Programming

## Problem

Given `low` and `high`, an integer is "balanced" if it has at least two digits and the sum of digits at odd positions equals the sum of digits at even positions (leftmost digit is position 1). Return the count of balanced integers in `[low, high]`.

### Example

Input: `low = 1, high = 100`
Output: `9`

The balanced numbers are 11, 22, 33, 44, 55, 66, 77, 88, 99.

## Approach

Use digit DP: `CountUpTo(x)` counts balanced integers in `[1, x]`. Process `x`'s digits left to right, tracking `(position, significantDigitsPlaced, diff, tight)`, where `diff` is the running odd-position-sum minus even-position-sum computed relative to each number's own first significant digit (skipping leading zeros). At the end, a number is valid if it has at least 2 significant digits and `diff == 0`. The answer is `CountUpTo(high) - CountUpTo(low - 1)`.

## C# Solution

```csharp
public class Solution 
{
    public long CountBalanced(long low, long high) 
    {
        return CountUpTo(high) - CountUpTo(low - 1);
    }

    private long CountUpTo(long x)
    {
        if (x <= 0) return 0;
        string s = x.ToString();
        int len = s.Length;
        var digits = new int[len];
        for (int i = 0; i < len; i++) digits[i] = s[i] - '0';

        int offset = 9 * len + 5;
        int size = 2 * offset + 1;
        var memo = new long[len + 1, len + 1, size];
        var computed = new bool[len + 1, len + 1, size];

        return Dfs(0, 0, 0, true, digits, len, offset, memo, computed);
    }

    private long Dfs(int pos, int sigPos, int diff, bool tight, int[] digits, int len, int offset,
        long[,,] memo, bool[,,] computed)
    {
        if (pos == len)
        {
            return (sigPos >= 2 && diff == 0) ? 1 : 0;
        }

        int diffIdx = diff + offset;
        if (!tight)
        {
            if (computed[pos, sigPos, diffIdx]) return memo[pos, sigPos, diffIdx];
        }

        int maxDigit = tight ? digits[pos] : 9;
        long total = 0;
        for (int d = 0; d <= maxDigit; d++)
        {
            bool newTight = tight && d == maxDigit;
            if (sigPos == 0 && d == 0)
            {
                total += Dfs(pos + 1, 0, 0, newTight, digits, len, offset, memo, computed);
            }
            else
            {
                int newSigPos = sigPos + 1;
                int sign = (newSigPos % 2 == 1) ? 1 : -1;
                int newDiff = diff + sign * d;
                total += Dfs(pos + 1, newSigPos, newDiff, newTight, digits, len, offset, memo, computed);
            }
        }

        if (!tight)
        {
            memo[pos, sigPos, diffIdx] = total;
            computed[pos, sigPos, diffIdx] = true;
        }
        return total;
    }
}
```

## Complexity

- **Time:** O(len^2 * diffRange) per call
- **Space:** O(len^2 * diffRange)
