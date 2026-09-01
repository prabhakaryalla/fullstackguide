# 2131. Longest Palindrome by Concatenating Two Letter Words

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Greedy, Counting

## Problem

You are given an array of strings `words` where each word consists of exactly two lowercase English letters. Return the length of the longest palindrome that can be formed by concatenating some of the words from the array (possibly none). You can use each word at most once.

### Example

```
Input: words = ["lc","cl","gg"]
Output: 6
Explanation: One longest palindrome is "lc" + "gg" + "cl" = "lcggcl", length 6.
Another one is "cl" + "gg" + "lc" = "clgglc", length 6.
```

## Approach

Use a hash map to count occurrences of each two-letter word. For each word, check if its reverse exists in the map. If so, they can form pairs on both ends of the palindrome. Special attention is needed for palindromic words (like "aa", "bb") - we can use pairs of them, and at most one unpaired palindromic word can go in the center.

The algorithm:
1. Count all words using a hash map
2. For each word, check if its reverse exists and count pairs
3. Track if there's any unpaired palindromic word for the center
4. Each pair contributes 4 characters, center palindrome contributes 2

## C# Solution

```csharp
public class Solution
{
    public int LongestPalindrome(string[] words)
    {
        var wordCount = new Dictionary<string, int>();
        
        foreach (var word in words)
        {
            if (!wordCount.ContainsKey(word))
                wordCount[word] = 0;
            wordCount[word]++;
        }
        
        int result = 0;
        bool hasCenter = false;
        
        foreach (var kvp in wordCount)
        {
            string word = kvp.Key;
            int count = kvp.Value;
            
            if (word[0] == word[1])
            {
                // Palindromic word
                result += (count / 2) * 4;
                if (count % 2 == 1)
                    hasCenter = true;
            }
            else if (word[0] < word[1])
            {
                // Only count once (avoid double counting with reverse)
                string reverse = new string(new char[] { word[1], word[0] });
                if (wordCount.ContainsKey(reverse))
                {
                    int pairs = Math.Min(count, wordCount[reverse]);
                    result += pairs * 4;
                }
            }
        }
        
        if (hasCenter)
            result += 2;
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of words
- **Space:** O(n) for the hash map
