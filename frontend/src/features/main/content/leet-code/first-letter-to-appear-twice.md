# 2351. First Letter to Appear Twice

**Difficulty:** Easy
**Category:** String, Hash Table

## Problem

Given a string `s` consisting of lowercase English letters, return the first letter to appear twice.

Note:
- A letter `a` appears twice before another letter `b` if the second occurrence of `a` is before the second occurrence of `b`.
- `s` will contain at least one letter that appears twice.

### Example

```
Input: s = "abccbaacz"
Output: "c"
Explanation: c appears at indices 2 and 3, first to repeat
```

## Approach

Use a set to track seen characters. Iterate through the string and return the first character that's already in the set.

## C# Solution

```csharp
public class Solution
{
    public char RepeatedCharacter(string s)
    {
        var seen = new HashSet<char>();
        
        foreach (char c in s)
        {
            if (seen.Contains(c))
                return c;
            seen.Add(c);
        }
        
        return ' ';
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1) since at most 26 letters
