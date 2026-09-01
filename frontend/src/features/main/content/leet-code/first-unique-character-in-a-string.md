# 387. First Unique Character in a String

**Difficulty:** Easy
**Category:** Hash Table, String, Queue, Counting

## Problem

Given a string `s`, find the first non-repeating character in it and return its index. If it does not exist, return `-1`.

### Example

```
Input: s = "leetcode"
Output: 0
```

### Constraints

- `1 <= s.length <= 10^5`
- `s` consists of only lowercase English letters.

## Approach

Count the occurrences of every character in a single pass, then scan the string again looking for the first character whose total count is exactly `1`.

## C# Solution

```csharp
public class Solution
{
    public int FirstUniqChar(string s)
    {
        var counts = new int[26];
        foreach (var c in s)
            counts[c - 'a']++;

        for (int i = 0; i < s.Length; i++)
        {
            if (counts[s[i] - 'a'] == 1) return i;
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(n)` — two linear passes over the string.
- **Space:** `O(1)` — bounded by the 26-letter alphabet.
