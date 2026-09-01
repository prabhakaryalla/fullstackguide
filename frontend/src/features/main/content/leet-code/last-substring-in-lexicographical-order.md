# 1163. Last Substring in Lexicographical Order

**Difficulty:** Hard
**Category:** Two Pointers, String

## Problem

Given a string `s`, return its lexicographically largest substring. (The answer is always a suffix of `s`.)

### Example

```
Input: s = "abab"
Output: "bab"
```

## Approach

Use two pointers `i` and `j` representing candidate starting positions for the best suffix, and an offset `k` tracking how far the two candidates currently match. Compare `s[i+k]` to `s[j+k]`: if they match, extend `k`; if `s[i+k]` is smaller, candidate `i` can never win against `j` for at least the matched region, so advance `i` past the matched section; otherwise advance `j` similarly. The pointer `i` that survives until `j + k` exceeds the string length marks the start of the answer.

## C# Solution

```csharp
public class Solution
{
    public string LastSubstring(string s)
    {
        int i = 0, j = 1, k = 0;
        int n = s.Length;

        while (j + k < n)
        {
            char a = s[i + k], b = s[j + k];

            if (a == b)
            {
                k++;
            }
            else if (a < b)
            {
                i = Math.Max(i + k + 1, j);
                j = i + 1;
                k = 0;
            }
            else
            {
                j = j + k + 1;
                k = 0;
            }
        }

        return s.Substring(i);
    }
}
```

## Complexity

- **Time:** `O(n)` amortized.
- **Space:** `O(n)` for the returned substring.
