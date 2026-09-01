# 408. Valid Word Abbreviation

**Difficulty:** Easy
**Category:** Two Pointers, String
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a string `word` and an abbreviation `abbr`, return `true` if `abbr` is a valid abbreviation of `word`, where sequences of digits represent a run of skipped characters (with no leading zeros allowed in any digit run).

### Example

```
Input: word = "internationalization", abbr = "i12iz4n"
Output: true
```

### Constraints

- `1 <= word.length <= 20`
- `1 <= abbr.length <= 10`

## Approach

Walk both strings simultaneously with two pointers. When the abbreviation pointer sits on a digit, parse the full run of digits into a number (rejecting a leading `'0'` immediately, since that's never a valid abbreviation encoding) and advance the word pointer by that many characters. Otherwise, the characters at both pointers must match literally. The abbreviation is valid only if both pointers reach the end of their respective strings simultaneously.

## C# Solution

```csharp
public class Solution
{
    public bool ValidWordAbbreviation(string word, string abbr)
    {
        int i = 0, j = 0;

        while (i < word.Length && j < abbr.Length)
        {
            if (char.IsDigit(abbr[j]))
            {
                if (abbr[j] == '0') return false;

                int num = 0;
                while (j < abbr.Length && char.IsDigit(abbr[j]))
                {
                    num = num * 10 + (abbr[j] - '0');
                    j++;
                }

                i += num;
            }
            else
            {
                if (word[i] != abbr[j]) return false;

                i++;
                j++;
            }
        }

        return i == word.Length && j == abbr.Length;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
