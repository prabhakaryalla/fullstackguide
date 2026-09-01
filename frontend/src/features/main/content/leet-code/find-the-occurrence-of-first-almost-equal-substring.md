# 2953. Find the Occurrence of First Almost Equal Substring

**Difficulty:** Hard
**Category:** String, String Matching, Rolling Hash
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given two strings `s` and `pattern`. A string `x` is called almost equal to `y` if you can change at most one character in `x` to make it identical to `y`.

Return the smallest starting index of a substring in `s` that is almost equal to `pattern`. If no such index exists, return `-1`.

### Example

```
Input: s = "abcdefg", pattern = "bcd"
Output: 1
Explanation: The substring s[1..3] = "bcd" matches pattern exactly.

Input: s = "ababbababa", pattern = "bacaba"
Output: 4
Explanation: The substring s[4..9] = "bababa" differs from "bacaba" in exactly one position.
```

## Approach

For each starting position in `s` where a substring of length `pattern.length` can fit, check if the substring differs from `pattern` in at most one position. Track the mismatch count and return the first valid starting index.

## C# Solution

```csharp
public class Solution
{
    public int MinStartingIndex(string s, string pattern)
    {
        int n = s.Length, m = pattern.Length;
        if (m > n) return -1;

        for (int i = 0; i <= n - m; i++)
        {
            int mismatches = 0;
            for (int j = 0; j < m; j++)
            {
                if (s[i + j] != pattern[j])
                {
                    mismatches++;
                    if (mismatches > 1) break;
                }
            }
            if (mismatches <= 1)
            {
                return i;
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** O(n * m) where n = length of s, m = length of pattern
- **Space:** O(1)
