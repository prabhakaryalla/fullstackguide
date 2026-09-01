# 1392. Longest Happy Prefix

**Difficulty:** Hard
**Category:** String, Rolling Hash, String Matching

## Problem

Given a string `s`, return the longest proper prefix of `s` that is also a proper suffix of `s`, or an empty string if none exists.

### Example

```
Input: s = "level"
Output: "l"
```

## Approach

This is exactly what the KMP failure function computes: `fail[i]` is the length of the longest proper prefix of `s[0..i]` that is also a suffix of it. The final value `fail[n-1]` gives the length of the longest prefix that is also a suffix of the entire string, so return that many leading characters.

## C# Solution

```csharp
public class Solution
{
    public string LongestPrefix(string s)
    {
        int n = s.Length;
        var fail = new int[n];

        for (int i = 1, k = 0; i < n; i++)
        {
            while (k > 0 && s[i] != s[k]) k = fail[k - 1];
            if (s[i] == s[k]) k++;
            fail[i] = k;
        }

        return s.Substring(0, fail[n - 1]);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the failure function array.
