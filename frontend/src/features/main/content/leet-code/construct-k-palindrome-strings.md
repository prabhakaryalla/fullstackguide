# 1400. Construct K Palindrome Strings

**Difficulty:** Medium
**Category:** Hash Table, String, Greedy, Counting

## Problem

Given a string `s` and an integer `k`, return `true` if the characters of `s` can be rearranged and split into exactly `k` non-empty palindromic strings.

### Example

```
Input: s = "annabelle", k = 2
Output: true
```

## Approach

A palindrome allows at most one character with an odd frequency. Count how many distinct characters in `s` have an odd occurrence count — this is the minimum number of palindromes required (each odd-count character needs its own palindrome, or can be paired with an even-count character to balance it out). It's possible to form exactly `k` palindromes as long as `k` is at least that minimum and no more than the total string length (since a single character alone always forms a valid one-character palindrome).

## C# Solution

```csharp
public class Solution
{
    public bool CanConstruct(string s, int k)
    {
        if (k > s.Length) return false;

        var count = new int[26];
        foreach (char c in s) count[c - 'a']++;

        int oddCount = count.Count(c => c % 2 == 1);

        return oddCount <= k;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` — fixed-size 26-letter counts.
