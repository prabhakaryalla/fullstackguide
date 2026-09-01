# 2273. Find Resultant Array After Removing Anagrams

**Difficulty:** Easy
**Category:** Array, String, Hash Table

## Problem

You are given a 0-indexed string array `words`. In one operation, select any index `i` such that `words[i]` is an anagram of `words[i-1]` (if `i > 0`) and delete `words[i]` from `words`. Keep applying this operation while you can.

Return `words` after performing all operations. The order must be maintained.

### Example

```
Input: words = ["abba","baba","bbaa","cd","cd"]
Output: ["abba","cd"]
Explanation:
- "baba" is anagram of "abba", remove → ["abba","bbaa","cd","cd"]
- "bbaa" is anagram of "abba", remove → ["abba","cd","cd"]
- second "cd" is anagram of first "cd", remove → ["abba","cd"]
```

## Approach

Iterate through the array. For each word, check if it's an anagram of the previous word (compare sorted versions). If yes, skip it; otherwise, add it to the result.

## C# Solution

```csharp
public class Solution
{
    public IList<string> RemoveAnagrams(string[] words)
    {
        List<string> result = new List<string>();
        string prev = "";
        
        foreach (string word in words)
        {
            string sorted = SortString(word);
            if (sorted != prev)
            {
                result.Add(word);
                prev = sorted;
            }
        }
        
        return result;
    }
    
    private string SortString(string s)
    {
        char[] arr = s.ToCharArray();
        Array.Sort(arr);
        return new string(arr);
    }
}
```

## Complexity

- **Time:** O(n * m log m) where n is number of words and m is average word length.
- **Space:** O(m) for sorting.
