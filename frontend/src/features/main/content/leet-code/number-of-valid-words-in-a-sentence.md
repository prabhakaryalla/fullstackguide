# 2047. Number of Valid Words in a Sentence

**Difficulty:** Easy
**Category:** String

## Problem

A sentence consists of lowercase letters, digits, and various punctuation, split into tokens by single spaces. A token is a **valid word** if it satisfies all of the following:
- It consists only of lowercase letters, at most one hyphen `'-'`, and at most one of the punctuation marks `'!'`, `'.'`, or `','`.
- If a hyphen is present, it must be surrounded by lowercase letters on both sides (not at the start or end of the token).
- If a punctuation mark is present, it must be the last character of the token.
- It must contain no digits.

Return *the number of valid words in the sentence*.

## Approach

Split the sentence into tokens by spaces. For each token, walk through its characters, tracking whether a digit was found (immediately invalid), how many hyphens have been seen (invalid if more than one, or if the hyphen isn't strictly between two lowercase letters), and whether punctuation appears anywhere but the last character. Any character that isn't a lowercase letter, the allowed hyphen, or the allowed trailing punctuation also invalidates the token.

## C# Solution

```csharp
public class Solution
{
    public int CountValidWords(string sentence)
    {
        var tokens = sentence.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        int count = 0;

        foreach (var token in tokens)
            if (IsValid(token)) count++;

        return count;
    }

    private bool IsValid(string token)
    {
        int hyphens = 0;
        int n = token.Length;

        for (int i = 0; i < n; i++)
        {
            char c = token[i];

            if (char.IsDigit(c)) return false;

            if (c == '-')
            {
                hyphens++;
                if (hyphens > 1) return false;
                if (i == 0 || i == n - 1) return false;
                if (!char.IsLower(token[i - 1]) || !char.IsLower(token[i + 1])) return false;
            }
            else if (c == '!' || c == '.' || c == ',')
            {
                if (i != n - 1) return false;
            }
            else if (!char.IsLower(c))
            {
                return false;
            }
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the length of the sentence.
- **Space:** `O(n)` for the split tokens.
