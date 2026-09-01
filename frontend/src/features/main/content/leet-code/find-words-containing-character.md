# 2942. Find Words Containing Character

**Difficulty:** Easy
**Category:** Array, String

## Problem

You are given an array of strings `words` and a character `x`. Return the indices of all strings that contain the character `x`.

### Example

```
Input: words = ["leet","code"], x = 'e'
Output: [0,1]
Explanation: Both "leet" and "code" contain 'e'.
```

## Approach

Iterate through the array and check if each string contains the target character. If it does, add its index to the result list.

## C# Solution

```csharp
public class Solution 
{
    public IList<int> FindWordsContaining(string[] words, char x) 
    {
        var result = new List<int>();
        
        for (int i = 0; i < words.Length; i++) 
        {
            if (words[i].Contains(x)) 
            {
                result.Add(i);
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n * m) where m is average word length
- **Space:** O(1) excluding output
