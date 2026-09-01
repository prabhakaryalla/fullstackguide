# 2262. Total Appeal of A String

**Difficulty:** Hard
**Category:** Hash Table, String, Dynamic Programming

## Problem

The appeal of a string is the number of distinct characters in it. Return the total appeal of all substrings of the given string `s`.

### Example

```
Input: s = "abbca"
Output: 28
Explanation: Sum of appeal of all substrings
```

## Approach

For each position i, calculate how many substrings ending at i include character s[i] for the first time. Track the last occurrence of each character. The contribution of position i is (i - lastOccurrence[s[i]]) * appeal, where appeal is accumulated across positions.

## C# Solution

```csharp
public class Solution
{
    public long AppealSum(string s)
    {
        var lastSeen = new Dictionary<char, int>();
        long total = 0;
        long currentAppeal = 0;
        
        for (int i = 0; i < s.Length; i++)
        {
            char c = s[i];
            int lastPos = lastSeen.GetValueOrDefault(c, -1);
            currentAppeal += i - lastPos;
            total += currentAppeal;
            lastSeen[c] = i;
        }
        
        return total;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1) for fixed alphabet size
