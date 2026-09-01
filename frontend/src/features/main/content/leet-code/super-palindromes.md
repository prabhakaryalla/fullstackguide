# 906. Super Palindromes

**Difficulty:** Hard
**Category:** Math, Enumeration

## Problem

A *super-palindrome* is a positive integer that is a palindrome, and whose square is also a palindrome. Given two positive integers represented as strings `left` and `right`, return the number of super-palindromes in the inclusive range `[left, right]`.

### Example

```
Input: left = "4", right = "1000"
Output: 4
Explanation: 4, 9, 121, and 484 are superpalindromes.
```

## Approach

Any palindrome whose square is at most `10^18` has a square root under `10^9`, so its "root" is built from a half of at most 5 digits. Enumerate every half `k` from `1` up to `100000`, mirror it to build both an odd-length and an even-length palindrome root, square it, and check whether the square lies in range and is itself a palindrome.

## C# Solution

```csharp
public class Solution
{
    public int SuperpalindromesInRange(string left, string right)
    {
        long l = long.Parse(left), r = long.Parse(right);
        int count = 0;

        for (long k = 1; k < 100000; k++)
        {
            string half = k.ToString();
            string reversed = new string(half.Reverse().ToArray());

            // odd-length root: mirror without repeating the middle digit
            long oddRoot = long.Parse(half + reversed.Substring(1));
            count += CheckRoot(oddRoot, l, r);

            // even-length root: mirror the whole half
            long evenRoot = long.Parse(half + reversed);
            count += CheckRoot(evenRoot, l, r);
        }

        return count;
    }

    private int CheckRoot(long root, long l, long r)
    {
        long square = root * root;
        if (square > r) return 0;
        return square >= l && IsPalindrome(square) ? 1 : 0;
    }

    private bool IsPalindrome(long x)
    {
        string s = x.ToString();
        int i = 0, j = s.Length - 1;
        while (i < j)
        {
            if (s[i] != s[j]) return false;
            i++;
            j--;
        }
        return true;
    }
}
```

## Complexity

- **Time:** `O(10^5 * digits)` root candidates checked.
- **Space:** `O(digits)` for string conversions.
