# 3677. Count Binary Palindromic Numbers

**Difficulty:** Hard
**Category:** Math, Bit Manipulation

## Problem

Given a non-negative integer `n`, a non-negative integer is binary-palindromic if its binary representation (written without leading zeros) reads the same forward and backward. The number `0` is considered binary-palindromic, with representation `"0"`. Return the number of integers `k` such that `0 <= k <= n` and `k` is binary-palindromic.

### Example

```
Input: n = 9
Output: 6
Explanation: 0 ("0"), 1 ("1"), 3 ("11"), 5 ("101"), 7 ("111"), 9 ("1001") are binary palindromes.
```

### Constraints

- `0 <= n <= 10^15`

## Approach

Enumerate palindromic numbers by bit-length instead of checking every number up to `n`. For each bit-length `L`, a binary palindrome is determined entirely by its first `ceil(L / 2)` bits (with the leading bit fixed to `1` since there is no leading zero); the remaining bits mirror the first half. Generate every possible "half" value, mirror it to build the full palindrome, and count how many such generated numbers are `<= n`. Start from `L = 1` and stop once the smallest palindrome for a bit-length exceeds `n`.

## C# Solution

```csharp
public class Solution
{
    public long CountBinaryPalindromes(long n)
    {
        long count = 1; // 0 is a palindrome

        for (int len = 1; len <= 60; len++)
        {
            int halfLen = (len + 1) / 2;
            long start = 1L << (halfLen - 1);
            long end = (1L << halfLen) - 1;

            for (long half = start; half <= end; half++)
            {
                long value = BuildPalindrome(half, len);
                if (value > n)
                {
                    return count;
                }
                count++;
            }
        }

        return count;
    }

    private long BuildPalindrome(long half, int len)
    {
        int halfLen = (len + 1) / 2;
        string bits = Convert.ToString(half, 2);

        string mirrorPart = len % 2 == 0 ? bits : bits.Substring(0, halfLen - 1);
        char[] mirrorChars = mirrorPart.ToCharArray();
        Array.Reverse(mirrorChars);

        string full = bits + new string(mirrorChars);
        return Convert.ToInt64(full, 2);
    }
}
```

## Complexity

- **Time:** `O(sqrt(n))` — the total number of generated palindromes up to `n` is proportional to the square root of `n`.
- **Space:** `O(1)`.
