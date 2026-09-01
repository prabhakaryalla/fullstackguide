# 2114. Maximum Number of Words Found in Sentences

**Difficulty:** Easy
**Category:** Array, String

## Problem

Given an array of sentences where each sentence is a string of space-separated words, return the maximum number of words in any single sentence.

### Example

```
Input: sentences = ["alice and bob love leetcode", "i think so too", "this is great thanks very much"]
Output: 6
Explanation: "alice and bob love leetcode" has 6 words.
```

## Approach

For each sentence, count the number of words by splitting on spaces. Return the maximum count found.

## C# Solution

```csharp
public class Solution
{
    public int MostWordsFound(string[] sentences)
    {
        int maxWords = 0;
        foreach (string sentence in sentences)
        {
            int wordCount = sentence.Split(' ').Length;
            maxWords = Math.Max(maxWords, wordCount);
        }
        return maxWords;
    }
}
```

## Complexity

- **Time:** O(n * m) where n is number of sentences and m is average sentence length
- **Space:** O(m) for split operation
