# 2730. Find the Longest Semi-Repetitive Substring

**Difficulty:** Medium
**Category:** String, Sliding Window

## Problem

You are given a 0-indexed string `s` that consists of digits from 0 to 9.

A string is called semi-repetitive if there is at most one adjacent pair of the same digit inside it.

Return the length of the longest semi-repetitive substring.

### Example

```
Input: s = "52233"
Output: 4
Explanation: "5223" is semi-repetitive (one adjacent pair "22"), length 4.
```

## Approach

Use sliding window. Track the count of adjacent equal pairs. When count exceeds 1, shrink the window from the left until it's valid again.

## C# Solution

```csharp
public class Solution
{
    public int LongestSemiRepetitiveSubstring(string s)
    {
        int n = s.Length;
        if (n == 1) return 1;
        
        int maxLen = 1;
        int left = 0;
        int pairCount = 0;
        
        for (int right = 1; right < n; right++)
        {
            if (s[right] == s[right - 1])
            {
                pairCount++;
            }
            
            while (pairCount > 1)
            {
                left++;
                if (left < n && s[left] == s[left - 1])
                {
                    pairCount--;
                }
            }
            
            maxLen = Math.Max(maxLen, right - left + 1);
        }
        
        return maxLen;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
