# 2255. Count Prefixes of a Given String

**Difficulty:** Easy
**Category:** Array, String

## Problem

You are given a string array `words` and a string `s`. Return the number of strings in `words` that are a prefix of `s`.

### Example

```
Input: words = ["a","b","c","ab","bc","abc"], s = "abc"
Output: 3
Explanation: "a", "ab", and "abc" are prefixes of "abc"
```

## Approach

For each word in the array, check if it is a prefix of s using the built-in `StartsWith` method or by comparing substrings.

## C# Solution

```csharp
public class Solution
{
    public int CountPrefixes(string[] words, string s)
    {
        int count = 0;
        foreach (var word in words)
        {
            if (s.StartsWith(word))
            {
                count++;
            }
        }
        return count;
    }
}
```

## Complexity

- **Time:** O(n * m) where n is the number of words and m is the average word length
- **Space:** O(1)
