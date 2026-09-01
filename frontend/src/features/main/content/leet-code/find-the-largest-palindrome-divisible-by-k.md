# 3260. Find the Largest Palindrome Divisible by K

**Difficulty:** Hard
**Category:** Dynamic Programming, Greedy, Math, Number Theory, String

## Problem
Given an integer `n` (the exact required digit length) and an integer `k`, find the largest palindromic number of exactly `n` digits (no leading zeros) that is divisible by `k`. Return the answer as a string.

## Approach
This problem has a known closed-form solution based on case analysis of `k` (from 1 to 9, since larger divisibility patterns can be decomposed using properties of repunits and known palindrome divisibility rules). For each specific value of `k`, a specific pattern of digits (built from combinations of '9's, '8's, or other specific digit sequences) is proven to produce the largest valid palindrome divisible by `k` for a given length `n`, with special handling for small `n` values and parity of `n`. For values of `k` not covered by a simple direct case (i.e., the "default" case), a repeating pattern based on `n` modulo 12 and precomputed "middle" segments (derived from the mathematical structure of repunits and their factorization properties related to that modulus) is used to construct the answer directly.

## C# Solution
```csharp
public class Solution {
    public string LargestPalindrome(int n, int k) {
        switch (k) {
            case 1:
                return new string('9', n);
            case 2:
                return n <= 2 ? new string('8', n) : "8" + new string('9', n - 2) + "8";
            case 3:
            case 9:
                return new string('9', n);
            case 4:
                return n <= 4 ? new string('8', n) : "88" + new string('9', n - 4) + "88";
            case 5:
                return n <= 2 ? new string('5', n) : "5" + new string('9', n - 2) + "5";
            case 6:
                if (n <= 2) {
                    return new string('6', n);
                } else if (n % 2 == 1) {
                    int l = n / 2 - 1;
                    return "8" + new string('9', l) + "8" + new string('9', l) + "8";
                } else {
                    int l = n / 2 - 2;
                    return "8" + new string('9', l) + "77" + new string('9', l) + "8";
                }
            case 8:
                return n <= 6 ? new string('8', n) : "888" + new string('9', n - 6) + "888";
            default:
                string[] middle = { "", "7", "77", "959", "9779", "99799",
                    "999999", "9994999", "99944999", "999969999", "9999449999", "99999499999" };
                int q = n / 12;
                int r = n % 12;
                return new string('9', q * 6) + middle[r] + new string('9', q * 6);
        }
    }
}
```

## Complexity
- Time: O(log n)
- Space: O(log n) for the result string
