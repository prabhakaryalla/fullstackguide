# 2586. Count the Number of Vowel Strings in Range

**Difficulty:** Easy
**Category:** Array, String

## Problem

You are given a 0-indexed array of strings `words` and two integers `left` and `right`. A string is called a vowel string if it starts with a vowel character and ends with a vowel character where vowel characters are 'a', 'e', 'i', 'o', and 'u'.

Return the number of vowel strings in the range `[left, right]`.

### Example

```
Input: words = ["are","amy","u"], left = 0, right = 2
Output: 2
Explanation: 
- "are" is a vowel string (starts with 'a', ends with 'e')
- "amy" is not a vowel string
- "u" is a vowel string (starts with 'u', ends with 'u')
```

## Approach

Iterate through the subarray from index `left` to `right` and count strings that start and end with a vowel. We check both the first and last character of each string.

## C# Solution

```csharp
public class Solution
{
    public int VowelStrings(string[] words, int left, int right)
    {
        var vowels = new HashSet<char> { 'a', 'e', 'i', 'o', 'u' };
        int count = 0;
        
        for (int i = left; i <= right; i++)
        {
            string word = words[i];
            if (vowels.Contains(word[0]) && vowels.Contains(word[word.Length - 1]))
            {
                count++;
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(right - left + 1)
- **Space:** O(1)
