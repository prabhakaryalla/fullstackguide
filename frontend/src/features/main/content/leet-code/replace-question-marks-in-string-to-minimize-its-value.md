# 3081. Replace Question Marks in String to Minimize Its Value

**Difficulty:** Medium
**Category:** String, Greedy, Hash Table, Heap (Priority Queue), Sorting, Counting

## Problem

You are given a string `s` containing lowercase letters and `'?'` characters. The "value" of a string is the sum, over every index `i`, of how many times `s[i]` already appeared among `s[0..i-1]` (`cost(i)`). Replace every `'?'` with a lowercase letter (your choice) to minimize the total value. If multiple results tie for minimum value, return the lexicographically smallest one.

## Approach

Only the final multiset of letter frequencies (not their positions) determines the total value, and the total value is minimized by keeping every letter's frequency as balanced as possible (always assigning the next `'?'` to whichever letter currently has the smallest count, ties broken toward earlier letters). Greedily assign each `'?'` to the least-frequent letter so far, incrementing its count. Since we also need lexicographic-smallest tie-breaking among positions, sort the chosen replacement letters and fill them into the `'?'` slots in left-to-right order (this keeps the earliest `'?'` slots holding the smallest letters, without changing the total value, which depends only on the final frequency multiset).

## C# Solution

```csharp
public class Solution {
    public string MinimizeStringValue(string s) {
        int[] count = new int[26];
        foreach (char c in s)
            if (c != '?')
                count[c - 'a']++;

        var letters = new List<char>();
        foreach (char c in s) {
            if (c != '?')
                continue;
            char minFreqLetter = GetMinFreqLetter(count);
            letters.Add(minFreqLetter);
            count[minFreqLetter - 'a']++;
        }

        letters.Sort();
        int idx = 0;
        var ans = new System.Text.StringBuilder();
        foreach (char c in s)
            ans.Append(c == '?' ? letters[idx++] : c);

        return ans.ToString();
    }

    private char GetMinFreqLetter(int[] count) {
        char minFreqLetter = 'a';
        for (char c = 'b'; c <= 'z'; c++)
            if (count[c - 'a'] < count[minFreqLetter - 'a'])
                minFreqLetter = c;
        return minFreqLetter;
    }
}
```

## Complexity

- Time: O(n * 26) — for each `'?'`, scanning the 26-letter frequency array, plus a final sort.
- Space: O(n) — the collected replacement letters.
