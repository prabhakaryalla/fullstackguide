# 2452. Words Within Two Edits of Dictionary

**Difficulty:** Medium
**Category:** Array, String

## Problem

You are given two string arrays `queries` and `dictionary`. All words in both arrays have the same length and consist of lowercase English letters.

A word is similar to another word if you can change at most two characters to make them equal. Return an array of strings from `queries` where each word is similar to at least one word in `dictionary`.

### Example

```
Input: queries = ["word","note","ants","wood"], dictionary = ["wood","joke","moat"]
Output: ["word","note","wood"]
Explanation:
"word" differs from "wood" by 1 character
"note" differs from "joke" by 1 character
"wood" is in dictionary
"ants" requires 3+ changes
```

## Approach

For each query word, check against all dictionary words. Count how many characters differ between the query word and each dictionary word. If any dictionary word has ≤ 2 differences, include the query word in the result.

## C# Solution

```csharp
public class Solution
{
    public IList<string> TwoEditWords(string[] queries, string[] dictionary)
    {
        var result = new List<string>();
        
        foreach (string query in queries)
        {
            bool found = false;
            
            foreach (string word in dictionary)
            {
                int diffs = 0;
                for (int i = 0; i < query.Length; i++)
                {
                    if (query[i] != word[i])
                    {
                        diffs++;
                        if (diffs > 2) break;
                    }
                }
                
                if (diffs <= 2)
                {
                    found = true;
                    break;
                }
            }
            
            if (found)
            {
                result.Add(query);
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n * m * k) where n is queries length, m is dictionary length, k is word length
- **Space:** O(1) excluding the output array
