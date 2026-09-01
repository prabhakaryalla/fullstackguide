# 3518. Smallest Palindromic Rearrangement II

**Difficulty:** Hard
**Category:** String, Math, Combinatorics, Counting, Hash Table

## Problem
You are given a string `s` that is guaranteed to already be a palindrome, and an integer `k`. Consider every distinct string that can be formed by rearranging the characters of `s` such that the rearrangement is **also** a palindrome. Sort these distinct palindromic rearrangements lexicographically and return the `k`-th smallest one (1-indexed). If fewer than `k` such rearrangements exist, return an empty string.

### Example
Input: `s = "abba"`, `k = 2` → Distinct palindromic rearrangements sorted: `"abba"`, `"baab"`. Output: `"baab"`.

## Approach
Because `s` is a palindrome, every character count is even, except possibly one character (the middle one, when `s` has odd length). Any palindromic rearrangement is fully determined by its **first half** plus the (fixed) middle character — the second half must mirror the first half.

1. Count characters of `s`; the middle character (if any) is the one with an odd count, and every character contributes `count / 2` copies to the half-multiset.
2. Compute the total number of distinct permutations of the half-multiset using the multinomial formula `halfLen! / (freq_1! * freq_2! * ... )`, computed incrementally via combinations `C(n, k)` and capped at a safe sentinel value (since `k` is bounded, e.g. up to `10^6`) to avoid overflow — once a running product reaches the cap it stays saturated.
3. If the total number of arrangements is less than `k`, return `""`.
4. Otherwise, greedily build the half string position by position: for each position, try the smallest available character `c` (in alphabetical order); tentatively use one occurrence of `c` and compute the number of arrangements of the *remaining* multiset. If that count is `>= k`, commit to `c`; otherwise subtract that count from `k` and try the next character.
5. The final palindrome is `half + middle + reverse(half)`.

## C# Solution

```csharp
public class Solution {
    private const long Cap = 1_000_001L;

    public string SmallestPalindrome(string s, int k) {
        int[] count = new int[26];
        foreach (char c in s) count[c - 'a']++;

        int oddCount = 0;
        foreach (int f in count) if (f % 2 == 1) oddCount++;
        if (oddCount > 1) return ""; // not achievable as a palindrome (shouldn't happen per constraints)

        int[] halfCount = new int[26];
        char middle = '\0';
        for (int c = 0; c < 26; c++) {
            halfCount[c] = count[c] / 2;
            if (count[c] % 2 == 1) middle = (char)('a' + c);
        }

        long total = CountArrangements(halfCount);
        if (k > total) return "";

        int halfLen = 0;
        foreach (int f in halfCount) halfLen += f;

        var left = new char[halfLen];
        for (int pos = 0; pos < halfLen; pos++) {
            for (int c = 0; c < 26; c++) {
                if (halfCount[c] == 0) continue;
                halfCount[c]--;
                long arrangements = CountArrangements(halfCount);
                if (arrangements >= k) {
                    left[pos] = (char)('a' + c);
                    break;
                }
                k -= (int)arrangements;
                halfCount[c]++;
            }
        }

        var sb = new System.Text.StringBuilder();
        sb.Append(left);
        if (middle != '\0') sb.Append(middle);
        for (int i = halfLen - 1; i >= 0; i--) sb.Append(left[i]);
        return sb.ToString();
    }

    private long CountArrangements(int[] count) {
        long total = 0;
        foreach (int f in count) total += f;
        long res = 1;
        foreach (int freq in count) {
            res *= NChooseK(total, freq);
            if (res >= Cap) return Cap;
            total -= freq;
        }
        return res;
    }

    private long NChooseK(long n, long k) {
        long res = 1;
        long upper = Math.Min(k, n - k);
        for (long i = 1; i <= upper; i++) {
            res = res * (n - i + 1) / i;
            if (res >= Cap) return Cap;
        }
        return res;
    }
}
```

## Complexity

- **Time:** O(n) positions times O(26) character tries times O(26) arrangement counting work, effectively O(n)
- **Space:** O(1) extra beyond the output string (fixed 26-size count arrays)
