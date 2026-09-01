# 557. Reverse Words in a String III

**Difficulty:** Easy
**Category:** Two Pointers, String

## Problem

Given a string `s`, reverse the characters of each word within a sentence while keeping the whitespace and the original order of the words.

### Example

```
Input: s = "Let's take LeetCode contest"
Output: "s'teL ekat edoCteeL tsetnoc"
```

### Constraints

- `1 <= s.length <= 5 * 10^4`
- `s` contains printable ASCII characters and does not contain leading or trailing spaces, with words separated by a single space.

## Approach

Split the sentence on spaces to isolate each word, reverse each word's characters independently, then rejoin the reversed words with single spaces to reconstruct the sentence structure.

## C# Solution

```csharp
public class Solution
{
    public string ReverseWords(string s)
    {
        var words = s.Split(' ');
        for (int i = 0; i < words.Length; i++)
        {
            var chars = words[i].ToCharArray();
            Array.Reverse(chars);
            words[i] = new string(chars);
        }

        return string.Join(' ', words);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the split words and result.
