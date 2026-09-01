# 522. Longest Uncommon Subsequence II

**Difficulty:** Medium
**Category:** Array, Two Pointers, String, Sorting

## Problem

Given an array of strings `strs`, return the length of the longest uncommon subsequence between them — a string that is a subsequence of exactly one string in the array and not a subsequence of any other string in it. Return `-1` if no such string exists.

### Example

```
Input: strs = ["aba","cdc","eae"]
Output: 3
```

### Constraints

- `1 <= strs.length <= 50`
- `1 <= strs[i].length <= 10`
- `strs[i]` consists of lowercase English letters.

## Approach

A candidate uncommon subsequence, if it exists, must be one of the strings in `strs` itself (any proper subsequence is dominated by the full string it came from). For each string, check whether it is a subsequence of any *other* string in the array; if it is not a subsequence of any other string, it qualifies, and the answer is the maximum length among all qualifying strings.

## C# Solution

```csharp
public class Solution
{
    public int FindLUSlength(string[] strs)
    {
        int result = -1;

        for (int i = 0; i < strs.Length; i++)
        {
            bool isUncommon = true;

            for (int j = 0; j < strs.Length; j++)
            {
                if (i == j) continue;

                if (IsSubsequence(strs[i], strs[j]))
                {
                    isUncommon = false;
                    break;
                }
            }

            if (isUncommon)
                result = Math.Max(result, strs[i].Length);
        }

        return result;
    }

    private bool IsSubsequence(string s, string t)
    {
        int i = 0;
        foreach (var c in t)
        {
            if (i < s.Length && s[i] == c) i++;
        }

        return i == s.Length;
    }
}
```

## Complexity

- **Time:** `O(n^2 * L)`, where `L` is the average string length.
- **Space:** `O(1)` extra.
