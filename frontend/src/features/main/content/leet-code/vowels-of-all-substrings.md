# 2063. Vowels of All Substrings

**Difficulty:** Medium
**Category:** String, Math, Prefix Sum, Combinatorics

## Problem

Given a string `word`, return *the total number of vowels across all of its substrings*. A vowel is one of `'a'`, `'e'`, `'i'`, `'o'`, `'u'`.

## Approach

Rather than enumerating every substring, count each vowel's total contribution directly. A vowel at index `i` (0-indexed, string length `n`) appears in exactly `(i + 1) * (n - i)` substrings — there are `i + 1` choices for the substring's left endpoint (any index from `0` to `i`) and `n - i` choices for the right endpoint (any index from `i` to `n - 1`). Summing `(i + 1) * (n - i)` over every vowel position gives the total vowel count across all substrings.

## C# Solution

```csharp
public class Solution
{
    public long CountVowels(string word)
    {
        var vowels = new HashSet<char> { 'a', 'e', 'i', 'o', 'u' };
        int n = word.Length;
        long total = 0;

        for (int i = 0; i < n; i++)
        {
            if (vowels.Contains(word[i]))
                total += (long)(i + 1) * (n - i);
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
