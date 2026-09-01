# 3348. Smallest Divisible Digit Product II

**Difficulty:** Hard
**Category:** Math, Greedy, String

## Problem
Given a (possibly very large) number `n` as a string and an integer `t`, return, as a string, the smallest integer greater than or equal to `n` whose digits are all non-zero and whose digit product is divisible by `t`. If no such number can ever exist (because `t` has a prime factor other than 2, 3, 5, or 7 — the only primes that can appear in a product of the digits 1-9), return `"-1"`.

### Example

Input: `n = "25", t = 5`

Output: `"25"`

Explanation: The digit product of 25 is 10, which is divisible by 5, and neither digit is 0.

## Approach
Digits 1-9 only contribute the prime factors 2, 3, 5, and 7 to a product, so first factor `t` into exponents of these four primes; if anything remains, answer `"-1"`.

Otherwise, search for the smallest valid number of the same length as `n` first, then increasingly longer lengths if needed. For a fixed length, try keeping a prefix of `n` unchanged and increasing the digit right after the prefix by the smallest amount that avoids a zero digit, then greedily fill the remaining suffix with the fewest digits necessary to cover whatever prime-factor requirement the fixed prefix didn't already satisfy (using `8`s for leftover 2s, `9`s for leftover 3s, `5`s for leftover 5s, `7`s for leftover 7s, and padding the rest with `1`s, which contribute no factors), placing those required digits at the end so the result stays as small as possible.

## C# Solution

```csharp
public class Solution 
{
    public string SmallestNumber(string n, int t) 
    {
        int need2 = 0, need3 = 0, need5 = 0, need7 = 0, rem = t;
        while (rem % 2 == 0) { rem /= 2; need2++; }
        while (rem % 3 == 0) { rem /= 3; need3++; }
        while (rem % 5 == 0) { rem /= 5; need5++; }
        while (rem % 7 == 0) { rem /= 7; need7++; }
        if (rem != 1) return "-1";

        int[] digits = new int[n.Length];
        for (int i = 0; i < n.Length; i++) digits[i] = n[i] - '0';

        while (true) 
        {
            string result = TryBuild(digits, need2, need3, need5, need7);
            if (result != null) return result;

            int[] next = new int[digits.Length + 1];
            Array.Fill(next, 1);
            digits = next;
        }
    }

    private string TryBuild(int[] digits, int need2, int need3, int need5, int need7) 
    {
        int len = digits.Length;

        for (int cut = len; cut >= 0; cut--) 
        {
            int[] prefix = new int[len];
            Array.Copy(digits, prefix, len);
            int fixedLen;

            if (cut == len) 
            {
                fixedLen = len;
            } 
            else 
            {
                int newDigit = digits[cut] + 1;
                if (newDigit == 0 || newDigit > 9) continue;
                prefix[cut] = newDigit;
                fixedLen = cut + 1;
            }

            bool hasZero = false;
            int r2 = need2, r3 = need3, r5 = need5, r7 = need7;
            for (int i = 0; i < fixedLen; i++) 
            {
                if (prefix[i] == 0) { hasZero = true; break; }
                Reduce(prefix[i], ref r2, ref r3, ref r5, ref r7);
            }
            if (hasZero) continue;

            int suffixLen = len - fixedLen;
            int needed8 = (r2 + 2) / 3, needed9 = (r3 + 1) / 2, needed5s = r5, needed7s = r7;
            if (needed8 + needed9 + needed5s + needed7s > suffixLen) continue;

            int[] result = new int[len];
            Array.Copy(prefix, result, fixedLen);
            int pos = len - 1;
            for (int i = 0; i < needed7s; i++) result[pos--] = 7;
            for (int i = 0; i < needed5s; i++) result[pos--] = 5;
            for (int i = 0; i < needed9; i++) result[pos--] = 9;
            for (int i = 0; i < needed8; i++) result[pos--] = 8;
            while (pos >= fixedLen) result[pos--] = 1;

            return string.Join("", result);
        }
        return null;
    }

    private void Reduce(int d, ref int need2, ref int need3, ref int need5, ref int need7) 
    {
        while (d % 2 == 0 && need2 > 0) { d /= 2; need2--; }
        while (d % 3 == 0 && need3 > 0) { d /= 3; need3--; }
        while (d % 5 == 0 && need5 > 0) { d /= 5; need5--; }
        while (d % 7 == 0 && need7 > 0) { d /= 7; need7--; }
    }
}
```

## Complexity

- **Time:** O(L^2) where `L` is the length of the answer (each of the `O(L)` cut positions does `O(L)` work).
- **Space:** O(L)
