# 2788. Split Strings by Separator

**Difficulty:** Easy
**Category:** Array, String

## Problem

Given an array of strings `words` and a character `separator`, split each string in `words` by `separator`. Return an array of all the resulting non-empty strings, preserving the original order (a string that produces no non-empty pieces contributes nothing).

### Example

Input: words = ["one,two,three","four,five","six"], separator = ','
Output: ["one","two","three","four","five","six"]

## Approach

Iterate through each word, split it by the separator character, and append every non-empty resulting piece to the answer list, in order.

## C# Solution

```csharp
public class Solution 
{
    public IList<string> SplitWordsBySeparator(IList<string> words, char separator) 
    {
        var result = new List<string>();
        foreach (var word in words) 
        {
            foreach (var part in word.Split(separator)) 
            {
                if (part.Length > 0) result.Add(part);
            }
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(total length of all words)
- **Space:** O(total length of all words)
