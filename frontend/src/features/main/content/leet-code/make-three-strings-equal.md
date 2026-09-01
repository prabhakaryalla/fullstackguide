# 2937. Make Three Strings Equal

**Difficulty:** Easy
**Category:** String

## Problem

You are given three strings `s1`, `s2`, and `s3`. In one operation, you can remove one character from the end of any string. Return the minimum number of operations needed to make all three strings equal. If impossible, return -1.

### Example

```
Input: s1 = "abc", s2 = "abb", s3 = "ab"
Output: 2
Explanation: Remove 'c' from s1 and 'b' from s2, resulting in "ab" for all.
```

## Approach

Find the longest common prefix of all three strings. If the common prefix is empty, return -1. Otherwise, count how many characters need to be removed from each string to reduce them to the common prefix length.

## C# Solution

```csharp
public class Solution 
{
    public int FindMinimumOperations(string s1, string s2, string s3) 
    {
        int minLen = Math.Min(s1.Length, Math.Min(s2.Length, s3.Length));
        int commonLen = 0;
        
        for (int i = 0; i < minLen; i++) 
        {
            if (s1[i] == s2[i] && s2[i] == s3[i]) 
            {
                commonLen++;
            } 
            else 
            {
                break;
            }
        }
        
        if (commonLen == 0) return -1;
        
        return (s1.Length - commonLen) + (s2.Length - commonLen) + (s3.Length - commonLen);
    }
}
```

## Complexity

- **Time:** O(min(len1, len2, len3))
- **Space:** O(1)
