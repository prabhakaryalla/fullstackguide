# 2781. Length of Longest Valid Substring

**Difficulty:** Hard
**Category:** String, Hash Table, Sliding Window

## Problem

You are given a string `word` and an array of strings `forbidden`. A string is called valid if none of its substrings are present in `forbidden`.

Return the length of the longest valid substring of the string `word`.

A substring is a contiguous sequence of characters in a string.

### Example

```
Input: word = "cbaaaabc", forbidden = ["aaa","cb"]
Output: 4
Explanation: "aabc" and "aaab" are valid substrings of length 4.
```

## Approach

Use a sliding window approach. For each ending position, maintain the leftmost valid starting position. Check all substrings ending at current position against the forbidden set, adjusting the left pointer as needed.

## C# Solution

```csharp
public class Solution
{
    public int LongestValidSubstring(string word, IList<string> forbidden)
    {
        var forbiddenSet = new HashSet<string>(forbidden);
        int maxLen = forbidden.Max(s => s.Length);
        int n = word.Length;
        int left = 0;
        int result = 0;
        
        for (int right = 0; right < n; right++)
        {
            for (int len = 1; len <= Math.Min(maxLen, right - left + 1); len++)
            {
                string sub = word.Substring(right - len + 1, len);
                if (forbiddenSet.Contains(sub))
                {
                    left = right - len + 2;
                    break;
                }
            }
            
            result = Math.Max(result, right - left + 1);
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n × maxLen) where maxLen is the maximum length of forbidden words
- **Space:** O(total characters in forbidden)
