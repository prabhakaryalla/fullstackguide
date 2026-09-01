# 3016. Minimum Number of Pushes to Type Word II

**Difficulty:** Medium
**Category:** Hash Table, String, Greedy, Sorting, Counting

## Problem

This is the same setup as [Minimum Number of Pushes to Type Word I](minimum-number-of-pushes-to-type-word-i.md), but with a much longer `word` (up to `2 * 10^5` characters): assign the 26 lowercase letters to an 8-key keypad however you like, where the `n`-th letter assigned to a key costs `n` presses. Return the minimum total presses needed to type `word`.

## Approach

The size of `word` doesn't change the underlying algorithm — only the letter **frequencies** matter, and there are always at most 26 distinct lowercase letters. Count frequencies, sort them descending, and assign the most frequent letters to the cheapest keypad slots first: rank `i` (0-indexed, sorted descending) costs `i / 8 + 1` presses per occurrence.

## C# Solution

```csharp
public class Solution {
    public int MinimumPushes(string word) {
        int[] count = new int[26];
        foreach (char c in word)
            count[c - 'a']++;

        Array.Sort(count);
        Array.Reverse(count);

        int ans = 0;
        for (int i = 0; i < 26; i++)
            ans += count[i] * (i / 8 + 1);
        return ans;
    }
}
```

## Complexity

- Time: O(n) — dominated by counting letter frequencies in `word`; sorting the fixed 26-slot array is O(1).
- Space: O(1).
