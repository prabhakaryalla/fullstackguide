# 3167. Better Compression of String

**Difficulty:** Medium
**Category:** Hash Table, String, Counting, Sorting

## Problem
You are given a string `compressed` that represents a compressed string, formed of pairs of (character, frequency), for example `"a2b3"` meaning 'a' appears 2 times and 'b' appears 3 times (frequencies can be multi-digit, and a character may appear multiple times in the compressed string with different runs). Return an equivalent "better" compressed representation where each distinct character appears exactly once, followed by its total combined frequency, with characters ordered alphabetically.

## Approach
Parse through the compressed string, extracting each character and its associated (possibly multi-digit) frequency number, accumulating the total for each of the 26 lowercase letters into a count array. After processing the whole input, iterate through letters 'a' to 'z' in order, and for every letter with a nonzero total count, append the letter followed by its combined frequency to the output.

## C# Solution
```csharp
public class Solution {
    public string BetterCompression(string compressed) {
        int[] count = new int[26];
        int n = compressed.Length;
        int i = 0;

        while (i < n) {
            char c = compressed[i++];
            int freq = 0;
            while (i < n && char.IsDigit(compressed[i]))
                freq = freq * 10 + (compressed[i++] - '0');
            count[c - 'a'] += freq;
        }

        var ans = new System.Text.StringBuilder();
        for (char c = 'a'; c <= 'z'; c++)
            if (count[c - 'a'] > 0)
                ans.Append(c).Append(count[c - 'a']);

        return ans.ToString();
    }
}
```

## Complexity
- Time: O(n)
- Space: O(1), bounded by 26 letters
