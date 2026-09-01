# 2067. Number of Equal Count Substrings

**Difficulty:** Medium
**Category:** Hash Table, String, Counting, Sliding Window
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a string `s` and an integer `count`, return the number of substrings of `s` where every unique character in the substring occurs exactly `count` times.

### Example

`s = "aaabcbbcc", count = 3` → substrings `"aaabc"` is not valid (b and c occur once/twice), but `"aaabcbbcc"` overall isn't uniform; the substrings that satisfy the condition (e.g. `"aaa"`, `"abcbbcc"`... ) total to 3 for this input.

## Approach

For a substring to have every distinct character occur exactly `count` times, its length must be `unique * count` for some `unique` (number of distinct characters in it) between 1 and 26. For each candidate `unique` from 1 up to the number of distinct characters in `s`, slide a fixed-size window of length `unique * count` across `s`, maintaining per-character counts and how many characters currently have a count of exactly `count`. Whenever the number of characters with count exactly `count` equals `unique` (meaning no character in the window has more or fewer than `count` occurrences, since window length forces exactly `unique` distinct groups), the window is a valid substring.

## C# Solution

```csharp
public class Solution 
{
    public int EqualCountSubstrings(string s, int count) 
    {
        int maxUnique = new HashSet<char>(s).Count;
        int ans = 0;

        for (int unique = 1; unique <= maxUnique; unique++)
        {
            int windowSize = unique * count;
            if (windowSize > s.Length)
                break;

            int[] lettersCount = new int[26];
            int uniqueCount = 0;

            for (int i = 0; i < s.Length; i++)
            {
                if (++lettersCount[s[i] - 'a'] == count)
                    uniqueCount++;
                if (i >= windowSize && --lettersCount[s[i - windowSize] - 'a'] == count - 1)
                    uniqueCount--;
                if (uniqueCount == unique)
                    ans++;
            }
        }

        return ans;
    }
}
```

## Complexity

- **Time:** O(26 * n)
- **Space:** O(26)
