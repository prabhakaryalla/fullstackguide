# 1638. Count Substrings That Differ by One Character

**Difficulty:** Medium
**Category:** String, Dynamic Programming

## Problem

Given strings `s` and `t`, return the number of ways to choose a non-empty substring of `s` and a non-empty substring of `t` of the same length such that they differ in exactly one character position.

### Example

```
Input: s = "aba", t = "baba"
Output: 6
```

## Approach

For every pair of starting positions `(i, j)` in `s` and `t`, extend a matching window as far as possible while tracking the number of mismatches. Whenever exactly one mismatch has occurred, that extension length counts as a valid pair; stop extending once a second mismatch appears, since the substrings must differ in exactly one place.

## C# Solution

```csharp
public class Solution
{
    public int CountSubstrings(string s, string t)
    {
        int count = 0;

        for (int i = 0; i < s.Length; i++)
        {
            for (int j = 0; j < t.Length; j++)
            {
                int diff = 0;

                for (int k = 0; i + k < s.Length && j + k < t.Length; k++)
                {
                    if (s[i + k] != t[j + k])
                    {
                        diff++;
                    }

                    if (diff > 1)
                    {
                        break;
                    }

                    if (diff == 1)
                    {
                        count++;
                    }
                }
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n * m * min(n, m))`.
- **Space:** `O(1)`.
