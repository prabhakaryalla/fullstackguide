# 902. Numbers At Most N Given Digit Set

**Difficulty:** Hard
**Category:** Array, Math, String, Binary Search, Dynamic Programming

## Problem

Given a sorted array of non-zero digit strings `digits` and an integer `n`, return the number of positive integers that can be generated using digits from `digits` (repetition allowed) that are less than or equal to `n`.

### Example

```
Input: digits = ["1","3","5","7"], n = 100
Output: 20
Explanation: The 20 numbers that can be written are 1, 3, 5, 7, 11, 13, 15, 17, 31, 33, 35, 37, 51, 53, 55, 57, 71, 73, 75, 77.
```

## Approach

Numbers shorter than `n` contribute `digits.Length ^ len` each, for every length shorter than `n`'s digit count. For numbers with the same length as `n`, walk `n`'s digits from the end using `dp[i]` = count of valid completions for the suffix starting at position `i`: for each candidate digit less than `n[i]`, all `digits.Length` choices are valid for the remaining positions; if a candidate equals `n[i]`, defer to `dp[i + 1]`.

## C# Solution

```csharp
public class Solution
{
    public int AtMostNGivenDigitSet(string[] digits, int n)
    {
        string s = n.ToString();
        int len = s.Length;
        var dp = new int[len + 1];
        dp[len] = 1;

        for (int i = len - 1; i >= 0; i--)
        {
            char d = s[i];
            foreach (var digit in digits)
            {
                if (digit[0] < d)
                    dp[i] += (int)Math.Pow(digits.Length, len - i - 1);
                else if (digit[0] == d)
                    dp[i] += dp[i + 1];
            }
        }

        int result = dp[0];
        for (int i = 1; i < len; i++)
        {
            result += (int)Math.Pow(digits.Length, i);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(len(n) * digits.Length)`.
- **Space:** `O(len(n))` for the DP array.
