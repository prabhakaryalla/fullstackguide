# 3519. Count Numbers with Non-Decreasing Digits

**Difficulty:** Hard
**Category:** Math, Dynamic Programming, String

## Problem
You are given two numeric strings `l` and `r` representing very large non-negative integers (too large to fit in a 64-bit integer), and an integer `b` (a base, `2 <= b <= 10`). Count how many integers `x` in the inclusive range `[l, r]` have **non-decreasing digits** when `x` is written in base `b` (each digit is greater than or equal to the digit before it). Return the count modulo `10^9 + 7`.

### Example
Input: `l = "1"`, `r = "5"`, `b = 2` → Numbers 1..5 in binary: `1, 10, 11, 100, 101`. Non-decreasing digit sequences: `1` (`1`), `11` (`11`). Others (`10`, `100`, `101`) have a decrease. Output: `2`.

## Approach
Since `l` and `r` can be arbitrarily large decimal strings, use big-number arithmetic to:
1. Convert `r` to base `b` (an array of digits, most significant first) via repeated "multiply current big number by 10, add next decimal digit, then re-express in base `b`" using a small digit-array bignum routine.
2. Compute `l - 1` as a decimal string (simple string decrement with borrowing), then convert it to base `b` the same way, padded with leading zeros to match `r`'s digit-array length.
3. Define `f(N)` = count of integers from `0` to `N` (inclusive) whose base-`b` representation has non-decreasing digits, computed with a **digit DP**: recurse over digit position, the last digit chosen so far (digits must not decrease), and whether the prefix is still "tight" against `N`'s digits, memoizing on `(position, tight, lastDigit)`.
4. The answer is `(f(r) - f(l - 1) + mod) % mod`.

## C# Solution

```csharp
public class Solution {
    private const int Mod = 1_000_000_007;
    private int _base;
    private Dictionary<(int, bool, int), long> _memo;

    public int CountNumbers(string l, string r, int b) {
        _base = b;
        List<int> rDigits = ConvertToBaseB(r, b);
        List<int> lDigits = ConvertToBaseB(l, b);
        List<int> lMinus1Digits = ConvertToBaseB(Decrement(l), b);

        PadToSameLength(lDigits, rDigits);
        PadToSameLength(lMinus1Digits, rDigits);

        long countR = CountWithMemo(rDigits);
        long countLMinus1 = CountWithMemo(lMinus1Digits);
        return (int)((countR - countLMinus1 + Mod) % Mod);
    }

    private void PadToSameLength(List<int> a, List<int> b) {
        while (a.Count < b.Count) a.Insert(0, 0);
    }

    private long CountWithMemo(List<int> digits) {
        _memo = new Dictionary<(int, bool, int), long>();
        return Count(digits, 0, 0, true);
    }

    private long Count(List<int> num, int pos, int lastDigit, bool tight) {
        if (pos == num.Count) return 1;

        var key = (pos, tight, lastDigit);
        if (_memo.TryGetValue(key, out long cached)) return cached;

        long res = 0;
        int limit = tight ? num[pos] : _base - 1;
        for (int d = lastDigit; d <= limit; d++) {
            bool newTight = tight && d == limit;
            res = (res + Count(num, pos + 1, d, newTight)) % Mod;
        }

        _memo[key] = res;
        return res;
    }

    private string Decrement(string s) {
        char[] arr = s.ToCharArray();
        for (int i = arr.Length - 1; i >= 0; i--) {
            if (arr[i] > '0') { arr[i]--; break; }
            arr[i] = '9';
        }
        string result = new string(arr);
        if (result.Length > 1 && result[0] == '0') {
            int start = 0;
            while (start < result.Length - 1 && result[start] == '0') start++;
            result = result.Substring(start);
        }
        return result;
    }

    // Converts a decimal string to a base-b digit array (most significant first).
    private List<int> ConvertToBaseB(string numStr, int b) {
        var currentNum = new List<int> { 0 }; // little-endian base-b digits
        foreach (char c in numStr) {
            int d = c - '0';

            int carry = 0;
            for (int i = 0; i < currentNum.Count; i++) {
                long product = (long)currentNum[i] * 10 + carry;
                currentNum[i] = (int)(product % b);
                carry = (int)(product / b);
            }
            while (carry > 0) {
                currentNum.Add(carry % b);
                carry /= b;
            }

            carry = d;
            for (int i = 0; i < currentNum.Count && carry > 0; i++) {
                int sum = currentNum[i] + carry;
                currentNum[i] = sum % b;
                carry = sum / b;
            }
            while (carry > 0) {
                currentNum.Add(carry % b);
                carry /= b;
            }
        }

        var digits = new List<int>();
        for (int i = currentNum.Count - 1; i >= 0; i--) digits.Add(currentNum[i]);
        if (digits.Count == 0) digits.Add(0);
        return digits;
    }
}
```

## Complexity

- **Time:** O(D * b^2 + D^3) where `D` is the number of base-`b` digits of `r` (from the digit DP states and bignum base conversion)
- **Space:** O(D * b^2) for memoization
