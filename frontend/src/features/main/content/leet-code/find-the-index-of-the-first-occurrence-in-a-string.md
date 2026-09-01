# 28. Find the Index of the First Occurrence in a String

**Difficulty:** Easy
**Category:** Two Pointers, String, String Matching

## Problem

Given two strings `needle` and `haystack`, return the index of the first occurrence of `needle` in `haystack`, or `-1` if `needle` is not part of `haystack`.

### Example 1

```
Input: haystack = "sadbutsad", needle = "sad"
Output: 0
Explanation: "sad" occurs at index 0 and 6. The first occurrence is at index 0.
```

### Example 2

```
Input: haystack = "leetcode", needle = "leeto"
Output: -1
Explanation: "leeto" did not occur in "leetcode".
```

### Constraints

- `1 <= haystack.length, needle.length <= 10^4`
- `haystack` and `needle` consist of only lowercase English characters.

## Approach

A straightforward sliding-window check compares `needle` against every possible starting index in `haystack` where it could still fit. For interview purposes this brute-force approach is normally accepted; KMP is the standard optimal follow-up for guaranteed linear time.

## C# Solution

```csharp
public class Solution
{
    public int StrStr(string haystack, string needle)
    {
        int n = haystack.Length, m = needle.Length;

        for (int i = 0; i <= n - m; i++)
        {
            int j = 0;
            while (j < m && haystack[i + j] == needle[j])
            {
                j++;
            }

            if (j == m) return i;
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(n * m)` — worst case, comparing `needle` at every starting position.
- **Space:** `O(1)`.
