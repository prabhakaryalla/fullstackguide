# 2000. Reverse Prefix of Word

**Difficulty:** Easy
**Category:** Two Pointers, String

## Problem

Given a string `word` and a character `ch`, reverse the segment of `word` from index `0` up to and including the first occurrence of `ch` (if `ch` exists in `word`). If `ch` does not occur in `word`, return `word` unchanged.

### Example

```
Input: word = "abcdefd", ch = "d"
Output: "dcbaefd"
Explanation: The first occurrence of 'd' is at index 3; reversing word[0..3] gives "dcba" followed by the unchanged remainder "efd".
```

### Constraints

- `1 <= word.length <= 250`
- `word` consists of lowercase English letters.
- `ch` is a lowercase English letter.

## Approach

Find the index of the first occurrence of `ch` in `word`. If found, reverse the substring from `0` to that index (inclusive) and concatenate it with the unchanged remainder of the string.

## C# Solution

```csharp
public class Solution
{
    public string ReversePrefix(string word, char ch)
    {
        int idx = word.IndexOf(ch);
        if (idx == -1)
        {
            return word;
        }

        var prefix = word.Substring(0, idx + 1).ToCharArray();
        Array.Reverse(prefix);

        return new string(prefix) + word.Substring(idx + 1);
    }
}
```

## Complexity

- **Time:** `O(n)` — finding the index and reversing the prefix are both linear.
- **Space:** `O(n)` for the resulting string.
