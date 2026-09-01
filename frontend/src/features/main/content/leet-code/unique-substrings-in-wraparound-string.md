# 467. Unique Substrings in Wraparound String

**Difficulty:** Medium
**Category:** String, Dynamic Programming

## Problem

Consider the infinite wraparound string formed by concatenating `"abcdefghijklmnopqrstuvwxyz"` repeatedly. Given a string `s`, return the number of unique non-empty substrings of `s` that also occur as a contiguous substring in this wraparound string.

### Example

```
Input: s = "zab"
Output: 6
```

### Constraints

- `1 <= s.length <= 10^5`
- `s` consists of lowercase English letters.

## Approach

A substring of `s` matches part of the wraparound string exactly when every consecutive pair of characters increases by one (wrapping `z` to `a`). Track the length of the longest such consecutive run ending at each position. For each ending character, only the longest run ending there matters (it automatically covers all shorter valid substrings ending at that same character), so keep a running maximum per letter and sum those maximums for the final answer.

## C# Solution

```csharp
public class Solution
{
    public int FindSubstringInWraproundString(string s)
    {
        var maxLengthEndingIn = new int[26];
        int currentLength = 0;

        for (int i = 0; i < s.Length; i++)
        {
            if (i > 0 && (s[i] - s[i - 1] == 1 || s[i - 1] - s[i] == 25))
                currentLength++;
            else
                currentLength = 1;

            int index = s[i] - 'a';
            maxLengthEndingIn[index] = Math.Max(maxLengthEndingIn[index], currentLength);
        }

        return maxLengthEndingIn.Sum();
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` — bounded by the 26-letter alphabet.
