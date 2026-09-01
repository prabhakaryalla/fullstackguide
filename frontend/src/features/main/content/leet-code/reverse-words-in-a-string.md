# 151. Reverse Words in a String

**Difficulty:** Medium
**Category:** Two Pointers, String

## Problem

Given an input string `s`, reverse the order of the words. A word is defined as a sequence of non-space characters. Return a string with the words in reverse order, joined by a single space, with no leading, trailing, or duplicate spaces.

### Example 1

```
Input: s = "the sky is blue"
Output: "blue is sky the"
```

### Example 2

```
Input: s = "  hello world  "
Output: "world hello"
```

### Constraints

- `1 <= s.length <= 10^4`
- `s` contains English letters, digits, and spaces `' '`.

## Approach

Split the string on whitespace using an option that discards empty entries (collapsing runs of multiple spaces and trimming the ends automatically), then reverse the order of the resulting word list and join them back together with single spaces.

## C# Solution

```csharp
public class Solution
{
    public string ReverseWords(string s)
    {
        var words = s.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        Array.Reverse(words);
        return string.Join(" ", words);
    }
}
```

## Complexity

- **Time:** `O(n)` — splitting, reversing, and joining are all linear in the string length.
- **Space:** `O(n)` — for the split word array and result string.
