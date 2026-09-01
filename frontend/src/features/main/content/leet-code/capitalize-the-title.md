# 2129. Capitalize the Title

**Difficulty:** Easy
**Category:** String

## Problem

Given a string `title` consisting of words separated by spaces, capitalize each word if its length is greater than 2 (first letter uppercase, rest lowercase). Words of length ≤2 should be entirely lowercase.

### Example

```
Input: title = "capiTalIze tHe titLe"
Output: "Capitalize The Title"

Input: title = "First leTTeR of EACH Word"
Output: "First Letter of Each Word"
```

## Approach

Split the string by spaces. For each word, check its length and apply the appropriate capitalization rule. Join the words back with spaces.

## C# Solution

```csharp
public class Solution
{
    public string CapitalizeTitle(string title)
    {
        var words = title.Split(' ');
        for (int i = 0; i < words.Length; i++)
        {
            words[i] = words[i].ToLower();
            if (words[i].Length > 2)
                words[i] = char.ToUpper(words[i][0]) + words[i].Substring(1);
        }
        return string.Join(" ", words);
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the string
- **Space:** O(n) for the result
