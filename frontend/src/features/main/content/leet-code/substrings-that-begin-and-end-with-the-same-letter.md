# 2083. Substrings That Begin and End With the Same Letter

**Difficulty:** Medium
**Category:** Hash Table, String, Counting, Math, Prefix Sum
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a string `s`, return the number of substrings of `s` that both begin and end with the same character (a single character counts as such a substring).

### Example

`s = "abcba"` → substrings that start and end with the same letter include every single character (5), plus `"a...a"` (the whole string) and `"b...b"`, giving a total of 7.

## Approach

For every position, if the character at that position has already appeared `c` times before it (including itself once counted), it can pair with any of those prior occurrences (or stand alone) to form a valid substring — this contributes `c` new valid substrings where `c` is the running count of that character up to and including the current position. Summing `++count[character]` at every position across the whole string gives the total directly, since for each letter with total frequency `f`, this sums to `1 + 2 + ... + f = f(f+1)/2`, exactly the number of same-letter-boundary substrings for that letter (including single characters).

## C# Solution

```csharp
public class Solution 
{
    public long NumberOfSubstrings(string s) 
    {
        long ans = 0;
        int[] count = new int[26];

        foreach (char c in s)
            ans += ++count[c - 'a'];

        return ans;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
