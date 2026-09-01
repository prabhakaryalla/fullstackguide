# 2109. Adding Spaces to a String

**Difficulty:** Medium
**Category:** Array, Two Pointers, String, Simulation

## Problem

You are given a string `s` and an integer array `spaces` representing indices where spaces should be added. Return the modified string with spaces inserted at the specified positions.

### Example

```
Input: s = "LeetcodeHelpsMeLearn", spaces = [8,13,15]
Output: "Leetcode Helps Me Learn"
```

## Approach

Use a StringBuilder to efficiently build the result. Iterate through the string, and whenever the current index matches an entry in the spaces array, append a space before appending the character.

## C# Solution

```csharp
public class Solution
{
    public string AddSpaces(string s, int[] spaces)
    {
        var sb = new StringBuilder();
        int spaceIdx = 0;
        
        for (int i = 0; i < s.Length; i++)
        {
            if (spaceIdx < spaces.Length && i == spaces[spaceIdx])
            {
                sb.Append(' ');
                spaceIdx++;
            }
            sb.Append(s[i]);
        }
        
        return sb.ToString();
    }
}
```

## Complexity

- **Time:** O(n + m) where n is the length of s and m is the length of spaces
- **Space:** O(n) for the result string
