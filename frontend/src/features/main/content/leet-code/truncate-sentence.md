# 1816. Truncate Sentence

**Difficulty:** Easy
**Category:** Array, String

## Problem

Given a sentence `s` (words separated by single spaces) and an integer `k`, return the first `k` words of the sentence joined back with single spaces.

### Example

```
Input: s = "Hello how are you Contestant", k = 4
Output: "Hello how are you"
```

## Approach

Split the sentence into words, take the first `k` of them, and join with single spaces.

## C# Solution

```csharp
public class Solution
{
    public string TruncateSentence(string s, int k)
    {
        var words = s.Split(' ');
        return string.Join(' ', words.Take(k));
    }
}
```

## Complexity

- **Time:** `O(n)` where `n` is the length of `s`.
- **Space:** `O(n)` for the split words.
