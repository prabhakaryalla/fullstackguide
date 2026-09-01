# 2309. Greatest English Letter in Upper and Lower Case

**Difficulty:** Easy
**Category:** String, Hash Table

## Problem

Given a string of English letters `s`, return the greatest English letter which occurs as both a lowercase and uppercase letter in `s`. The returned letter should be in uppercase. If no such letter exists, return an empty string.

An English letter `b` is greater than another letter `a` if `b` appears after `a` in the English alphabet.

### Example

```
Input: s = "lEeTcOdE"
Output: "E"
Explanation: The letter 'E' is the only letter to appear in both lower and upper case.
```

## Approach

Use a set to track all characters present in the string. Iterate from 'Z' down to 'A' and check if both the uppercase and lowercase versions exist in the set. Return the first (greatest) match found.

## C# Solution

```csharp
public class Solution
{
    public string GreatestLetter(string s)
    {
        var seen = new HashSet<char>(s);
        
        for (char c = 'Z'; c >= 'A'; c--)
        {
            if (seen.Contains(c) && seen.Contains(char.ToLower(c)))
            {
                return c.ToString();
            }
        }
        
        return "";
    }
}
```

## Complexity

- **Time:** O(n) where n is length of s
- **Space:** O(1) since there are at most 52 letters
