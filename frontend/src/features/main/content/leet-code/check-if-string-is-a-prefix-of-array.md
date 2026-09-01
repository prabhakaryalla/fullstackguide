# 1961. Check If String Is a Prefix of Array

**Difficulty:** Easy
**Category:** Array, String

## Problem

Given a string `s` and an array of strings `words`, return `true` if `s` can be constructed by concatenating some prefix of `words` (i.e., `words[0] + words[1] + ... + words[k-1]` for some `k`) exactly equal to `s`.

### Example

```
Input: s = "iloveleetcode", words = ["i","love","leetcode","apples"]
Output: true
Explanation: "i" + "love" + "leetcode" == "iloveleetcode".
```

### Constraints

- `1 <= words.length <= 100`
- `1 <= words[i].length <= 20`
- `1 <= s.length <= 1000`
- `words[i]` and `s` consist of only lowercase English letters.

## Approach

Concatenate words from `words` one at a time into a running buffer. If at any point the buffer's length reaches or exceeds `s.Length`, check whether it exactly equals `s` (stop early once the buffer's length equals or exceeds `s.Length`, since it can't be a valid prefix concatenation match after that).

## C# Solution

```csharp
public class Solution
{
    public bool IsPrefixString(string s, string[] words)
    {
        var sb = new System.Text.StringBuilder();

        foreach (string word in words)
        {
            sb.Append(word);
            if (sb.Length >= s.Length)
            {
                return sb.ToString() == s;
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(n)` — where `n` is the total length of the concatenated prefix, bounded by `s.Length` plus one extra word.
- **Space:** `O(n)` for the running buffer.
