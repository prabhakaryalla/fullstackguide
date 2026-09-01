# 2746. Decremental String Concatenation

**Difficulty:** Medium
**Category:** Array, String, Dynamic Programming

## Problem

You are given an array of strings `words`. You need to concatenate all strings in the given order. However, you can save characters: if the last character of the current concatenated string equals the first character of the next word, you can skip one character during concatenation.

Return the minimum possible length of the concatenated string.

### Example

```
Input: words = ["aa","ab","bc"]
Output: 4
Explanation: "aa" + "ab" = "aab" (saved 1), "aab" + "bc" = "aabc" (saved 1), total length = 4.

Input: words = ["ab","b"]
Output: 2
Explanation: "ab" + "b" = "ab" (saved 1), length = 2.

Input: words = ["aaa","c","aba"]
Output: 6
Explanation: No character savings possible.
```

## Approach

Use dynamic programming where the state tracks:
- Current position in the words array
- First character of the current concatenated string
- Last character of the current concatenated string

For each word, we can either prepend or append it to the current string, potentially saving a character if there's a match.

## C# Solution

```csharp
public class Solution 
{
    private Dictionary<(int, char, char), int> memo;
    private string[] words;
    
    public int MinimizeConcatenatedLength(string[] words) 
    {
        this.words = words;
        memo = new Dictionary<(int, char, char), int>();
        
        return words[0].Length + Dp(1, words[0][0], words[0][words[0].Length - 1]);
    }
    
    private int Dp(int index, char first, char last)
    {
        if (index == words.Length)
        {
            return 0;
        }
        
        var key = (index, first, last);
        if (memo.ContainsKey(key))
        {
            return memo[key];
        }
        
        string word = words[index];
        int wordLen = word.Length;
        char wordFirst = word[0];
        char wordLast = word[wordLen - 1];
        
        int appendCost = wordLen - (last == wordFirst ? 1 : 0);
        int appendResult = appendCost + Dp(index + 1, first, wordLast);
        
        int prependCost = wordLen - (wordLast == first ? 1 : 0);
        int prependResult = prependCost + Dp(index + 1, wordFirst, last);
        
        int result = Math.Min(appendResult, prependResult);
        memo[key] = result;
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n * 26²) where n is the number of words (26 letters for first and last)
- **Space:** O(n * 26²) for memoization
