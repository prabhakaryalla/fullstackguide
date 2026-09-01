# 2822. Check if Strings Can Be Made Equal With Operations II

**Difficulty:** Medium
**Category:** String, Sorting, Hash Table

## Problem

You are given two strings s1 and s2 of equal length. You can apply the following operation on either string any number of times:
- Choose two indices i and j where j - i = 2, then swap the characters at positions i and j.

Return true if you can make s1 equal to s2, otherwise return false.

### Example

```
Input: s1 = "abcdba", s2 = "cabdab"
Output: true
Explanation: We can swap characters at even indices among themselves and odd indices among themselves to make the strings equal
```

## Approach

Similar to problem 2821, but for strings of any length. The key insight remains the same: you can only swap characters whose indices have the same parity.

Characters at even positions (0, 2, 4, ...) can be rearranged among themselves.
Characters at odd positions (1, 3, 5, ...) can be rearranged among themselves.

Therefore, two strings can be made equal if and only if:
- The frequency count of characters at even positions is the same in both strings
- The frequency count of characters at odd positions is the same in both strings

We can use sorting or frequency maps to check this condition.

## C# Solution

```csharp
public class Solution
{
    public bool CheckStrings(string s1, string s2)
    {
        if (s1.Length != s2.Length)
            return false;
        
        int n = s1.Length;
        int[] evenCount1 = new int[26];
        int[] evenCount2 = new int[26];
        int[] oddCount1 = new int[26];
        int[] oddCount2 = new int[26];
        
        for (int i = 0; i < n; i++)
        {
            if (i % 2 == 0)
            {
                evenCount1[s1[i] - 'a']++;
                evenCount2[s2[i] - 'a']++;
            }
            else
            {
                oddCount1[s1[i] - 'a']++;
                oddCount2[s2[i] - 'a']++;
            }
        }
        
        for (int i = 0; i < 26; i++)
        {
            if (evenCount1[i] != evenCount2[i] || oddCount1[i] != oddCount2[i])
                return false;
        }
        
        return true;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the strings
- **Space:** O(1) for fixed-size frequency arrays (26 letters)
