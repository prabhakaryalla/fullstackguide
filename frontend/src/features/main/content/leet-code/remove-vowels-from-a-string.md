# 1119. Remove Vowels from a String

**Difficulty:** Easy
**Category:** String

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given a string `s`, return a new string with all vowels (`a`, `e`, `i`, `o`, `u`) removed.

### Example

```
Input: s = "leetcodeisacommunityforcoders"
Output: "ltcdscmmntyfrcdrs"
```

## Approach

Iterate through the characters of `s`, appending every character that is not one of the five lowercase vowels to a `StringBuilder`.

## C# Solution

```csharp
public class Solution
{
    public string RemoveVowels(string s)
    {
        var sb = new StringBuilder();

        foreach (char c in s)
        {
            if ("aeiou".IndexOf(c) == -1) sb.Append(c);
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the result string.
