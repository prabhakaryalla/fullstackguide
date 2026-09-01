# 1832. Check if the Sentence Is Pangram

**Difficulty:** Easy
**Category:** Hash Table, String

## Problem

A pangram is a sentence containing every letter of the English alphabet at least once. Given a string `sentence` of lowercase letters, return whether it is a pangram.

### Example

```
Input: sentence = "thequickbrownfoxjumpsoverthelazydog"
Output: true
```

## Approach

Collect the distinct characters of `sentence` into a `HashSet<char>`; the sentence is a pangram exactly when that set contains all 26 letters.

## C# Solution

```csharp
public class Solution
{
    public bool CheckIfPangram(string sentence)
    {
        var seen = new HashSet<char>(sentence);
        return seen.Count == 26;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` (at most 26 distinct letters).
