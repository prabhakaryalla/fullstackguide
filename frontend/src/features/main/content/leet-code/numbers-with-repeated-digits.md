# 1012. Numbers With Repeated Digits

**Difficulty:** Hard
**Category:** Math, Dynamic Programming

## Problem

Given an integer `n`, return the number of positive integers in the range `[1, n]` that have at least one repeated digit.

### Example

```
Input: n = 20
Output: 1
Explanation: The only positive number (<= 20) with repeated digits is 11.
```

## Approach

It's easier to count numbers with **all unique digits** and subtract from `n`. First, count every number with fewer digits than `n` that has all-unique digits (a standard permutation count: `9` choices for the leading digit, then `9, 8, 7, ...` for the rest). Then walk the digits of `n` itself: at each position, for every smaller unused digit than the actual digit, count how many ways the remaining positions can be filled with unique digits; if the actual digit has already been used, no larger completions share this prefix, so stop. If every digit is reached without repetition, `n` itself is also unique-digit. The final answer is `n` minus this unique-digit count.

## C# Solution

```csharp
public class Solution
{
    public int NumDupDigitsAtMostN(int n)
    {
        var digits = n.ToString();
        int len = digits.Length;
        int countUnique = 0;

        for (int length = 1; length < len; length++)
        {
            countUnique += 9 * Permute(9, length - 1);
        }

        var used = new bool[10];
        for (int i = 0; i < len; i++)
        {
            int digit = digits[i] - '0';
            int start = i == 0 ? 1 : 0;

            for (int d = start; d < digit; d++)
            {
                if (used[d]) continue;
                countUnique += Permute(9 - i, len - i - 1);
            }

            if (used[digit]) break;
            used[digit] = true;

            if (i == len - 1) countUnique++;
        }

        return n - countUnique;
    }

    private int Permute(int available, int choose)
    {
        if (choose == 0) return 1;
        int result = 1;
        for (int i = 0; i < choose; i++) result *= available - i;
        return result;
    }
}
```

## Complexity

- **Time:** `O(log n)` — proportional to the number of digits in `n`.
- **Space:** `O(1)` — a fixed 10-element `used` array.
