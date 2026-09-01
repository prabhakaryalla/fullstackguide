# 3374. First Letter Capitalization II

**Difficulty:** Medium
**Category:** String

## Problem
Given a paragraph made of one or more sentences (sentences end with `.`, `!`, or `?`), capitalize the first letter of **each sentence** and leave every other character exactly as it is. Return the resulting paragraph.

### Example

Input: `paragraph = "hello world. how are you? i am fine!"`

Output: `"Hello world. How are you? I am fine!"`

## Approach
Scan the paragraph once, tracking whether the next non-whitespace letter encountered starts a new sentence. Initially, and immediately after seeing a `.`, `!`, or `?`, set a flag so that the next letter found gets uppercased; every other character is left untouched.

## C# Solution

```csharp
public class Solution 
{
    public string CapitalizeSentences(string paragraph) 
    {
        var sb = new System.Text.StringBuilder(paragraph);
        bool startOfSentence = true;

        for (int i = 0; i < sb.Length; i++) 
        {
            char c = sb[i];
            if (char.IsWhiteSpace(c)) continue;

            if (startOfSentence && char.IsLetter(c)) 
            {
                sb[i] = char.ToUpper(c);
                startOfSentence = false;
            }

            if (c == '.' || c == '!' || c == '?') startOfSentence = true;
        }
        return sb.ToString();
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
