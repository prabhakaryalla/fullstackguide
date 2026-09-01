# 214. Shortest Palindrome

**Difficulty:** Hard
**Category:** String, String Matching, Hash Function, Rolling Hash

## Problem

Given a string `s`, add characters in front of it to make it a palindrome, and return the shortest such palindrome achievable.

### Example

```
s = "aacecaaa" -> "aaacecaaa"
s = "abcd" -> "dcbabcd"
```

## Approach

The shortest prefix that needs mirroring in front is `s` minus its longest palindromic *prefix* — so the core task is finding that longest palindromic prefix efficiently. Build the string `s + "#" + reverse(s)` and compute its KMP failure function (longest proper prefix that's also a suffix); the failure value at the very last position tells exactly how long `s`'s longest palindromic prefix is. Everything after that prefix, reversed, gets prepended to `s`.

## C# Solution

```csharp
public class Solution
{
    public string ShortestPalindrome(string s)
    {
        if (s.Length == 0) return s;

        string reversed = new string(s.Reverse().ToArray());
        string combined = s + "#" + reversed;

        int[] failure = BuildFailureFunction(combined);
        int palindromicPrefixLength = failure[combined.Length - 1];

        string suffixToPrepend = s.Substring(palindromicPrefixLength);
        string reversedSuffix = new string(suffixToPrepend.Reverse().ToArray());

        return reversedSuffix + s;
    }

    private int[] BuildFailureFunction(string s)
    {
        var failure = new int[s.Length];
        int len = 0;

        for (int i = 1; i < s.Length; i++)
        {
            while (len > 0 && s[i] != s[len])
            {
                len = failure[len - 1];
            }

            if (s[i] == s[len]) len++;

            failure[i] = len;
        }

        return failure;
    }
}
```

## Complexity

- **Time:** `O(n)` — building the KMP failure function is linear in the combined string's length.
- **Space:** `O(n)` — for the combined string and failure array.
