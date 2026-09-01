# 2490. Circular Sentence

**Difficulty:** Easy
**Category:** String

## Problem

A sentence is circular if:
- The last character of each word is equal to the first character of the next word
- The last character of the last word is equal to the first character of the first word

Given a string `sentence`, return `true` if it is circular, otherwise return `false`.

### Example

```
Input: sentence = "leetcode exercises sound delightful"
Output: true
Explanation: 
- "leetcode" ends with 'e', "exercises" starts with 'e'
- "exercises" ends with 's', "sound" starts with 's'
- "sound" ends with 'd', "delightful" starts with 'd'
- "delightful" ends with 'l', "leetcode" starts with 'l'

Input: sentence = "eetcode"
Output: true

Input: sentence = "Leetcode is cool"
Output: false
```

## Approach

Split the sentence into words and check:
1. For each consecutive pair of words, the last character of the first word must equal the first character of the second word
2. The last character of the last word must equal the first character of the first word

## C# Solution

```csharp
public class Solution
{
    public bool IsCircularSentence(string sentence)
    {
        if (sentence[0] != sentence[sentence.Length - 1])
        {
            return false;
        }
        
        for (int i = 0; i < sentence.Length; i++)
        {
            if (sentence[i] == ' ')
            {
                if (sentence[i - 1] != sentence[i + 1])
                {
                    return false;
                }
            }
        }
        
        return true;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the sentence
- **Space:** O(1)
