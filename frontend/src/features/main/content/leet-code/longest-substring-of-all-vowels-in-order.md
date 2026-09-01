# 1839. Longest Substring Of All Vowels in Order

**Difficulty:** Medium
**Category:** String, Two Pointers

## Problem

A string is "beautiful" if it contains each of the five vowels `a, e, i, o, u` at least once, and its characters appear in strictly non-decreasing order according to `a < e < i < o < u` (repeats of the same vowel are allowed). Given a string `word` of lowercase vowels, return the length of the longest beautiful substring, or `0` if none exists.

### Example

```
Input: word = "aeiaaioaaaaeiiiiouuuooaauuaeiu"
Output: 13
```

## Approach

Scan for maximal runs that start with `a` and stay non-decreasing in vowel order. Whenever a run starts, track how many distinct vowels have appeared so far; extend the run while the next character is `>=` the current one. A run is beautiful only if it accumulated all 5 distinct vowels, in which case update the best length with the run's span.

## C# Solution

```csharp
public class Solution
{
    public int LongestBeautifulSubstring(string word)
    {
        int n = word.Length;
        int best = 0;
        int i = 0;

        while (i < n)
        {
            if (word[i] != 'a') { i++; continue; }

            int start = i;
            int distinct = 1;
            i++;

            while (i < n && word[i] >= word[i - 1])
            {
                if (word[i] != word[i - 1]) distinct++;
                i++;
            }

            if (distinct == 5) best = Math.Max(best, i - start);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)` — each character is visited a constant number of times.
- **Space:** `O(1)`.
