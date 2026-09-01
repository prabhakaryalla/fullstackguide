# 2904. Shortest and Lexicographically Smallest Beautiful String

**Difficulty:** Medium
**Category:** String, Sliding Window

## Problem

A string is called beautiful if the count of '1's in any substring of length `k` equals `k`. Given a binary string `s` and an integer `k`, find the shortest beautiful substring. If there are multiple of the same shortest length, return the lexicographically smallest one. If no beautiful substring exists, return an empty string.

### Example

```
Input: s = "100011001", k = 3
Output: "11001"
Explanation: The substring "11001" has length 5 and contains at least one substring of length 3 with three 1's.
```

## Approach

Use a sliding window to track consecutive '1's. For each window starting and ending with '1', check if it can form a beautiful substring. Track the positions of '1's and try all valid windows that have exactly `k` ones. Among valid candidates, select the shortest and lexicographically smallest.

## C# Solution

```csharp
public class Solution 
{
    public string ShortestBeautifulSubstring(string s, int k) 
    {
        var positions = new List<int>();
        for (int i = 0; i < s.Length; i++) 
        {
            if (s[i] == '1') positions.Add(i);
        }
        
        if (positions.Count < k) return "";
        
        string result = "";
        int minLen = int.MaxValue;
        
        for (int i = 0; i <= positions.Count - k; i++) 
        {
            int start = positions[i];
            int end = positions[i + k - 1];
            int len = end - start + 1;
            string candidate = s.Substring(start, len);
            
            if (len < minLen || (len == minLen && string.Compare(candidate, result) < 0)) 
            {
                minLen = len;
                result = candidate;
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n * k) where n is string length
- **Space:** O(n) for storing positions
