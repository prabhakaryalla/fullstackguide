# 2042. Check if Numbers Are Ascending in a Sentence

**Difficulty:** Easy
**Category:** String

## Problem

A sentence is a list of tokens separated by single spaces, where each token is either a word (only lowercase letters) or a number (only digits, no leading zeros). Return `true` if all the numbers in `s` are strictly increasing from left to right.

## Approach

Split the sentence by spaces. For each token, check whether its first character is a digit to identify numeric tokens (ignoring word tokens). Parse each numeric token and compare it to the previously seen number; if it's not strictly greater, return `false`. If every numeric token passes the check, return `true`.

## C# Solution

```csharp
public class Solution
{
    public bool AreNumbersAscending(string s)
    {
        var tokens = s.Split(' ');
        long prev = long.MinValue;

        foreach (var token in tokens)
        {
            if (!char.IsDigit(token[0])) continue;

            long value = long.Parse(token);
            if (value <= prev) return false;
            prev = value;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the length of `s`.
- **Space:** `O(n)` for the split tokens.
