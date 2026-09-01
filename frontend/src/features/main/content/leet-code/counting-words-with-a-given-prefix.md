# 2185. Counting Words With a Given Prefix

**Difficulty:** Easy
**Category:** String, Array

## Problem

You are given an array of strings `words` and a string `pref`. Return the number of strings in `words` that start with `pref`.

A prefix of a string `s` is any leading contiguous substring of `s`.

### Example

```
Input: words = ["pay","attention","practice","attend"], pref = "at"
Output: 2
Explanation: The 2 strings that contain "at" as a prefix are: "attention" and "attend".
```

## Approach

Iterate through the array of words and for each word, check if it starts with the given prefix. Count how many words satisfy this condition.

We can use the `StartsWith` method in C# or manually compare characters up to the length of the prefix.

## C# Solution

```csharp
public class Solution
{
    public int PrefixCount(string[] words, string pref)
    {
        int count = 0;
        
        foreach (string word in words)
        {
            if (word.StartsWith(pref))
            {
                count++;
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n * m), where n is the number of words and m is the length of the prefix
- **Space:** O(1)
