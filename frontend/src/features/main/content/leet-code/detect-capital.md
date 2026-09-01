# 520. Detect Capital

**Difficulty:** Easy
**Category:** String

## Problem

Given a string `word`, return `true` if the usage of capitals in it is correct, according to one of these rules: all letters are uppercase, all letters are lowercase, or only the first letter is uppercase.

### Example

```
Input: word = "USA"
Output: true
```

### Constraints

- `1 <= word.length <= 100`
- `word` consists of lowercase and uppercase English letters.

## Approach

Count the number of uppercase letters in the word. The usage is correct exactly when that count is zero (all lowercase), equal to the word's full length (all uppercase), or exactly one and located at the first character (title case).

## C# Solution

```csharp
public class Solution
{
    public bool DetectCapitalUse(string word)
    {
        int upperCount = word.Count(char.IsUpper);
        return upperCount == 0 || upperCount == word.Length || (upperCount == 1 && char.IsUpper(word[0]));
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
