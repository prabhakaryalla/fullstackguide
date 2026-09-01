# 2716. Minimize String Length

**Difficulty:** Easy
**Category:** Hash Table, String

## Problem

Given a string `s`, you need to repeatedly remove all occurrences of the closest character to the left and right of any chosen character until it's no longer possible.

Return the minimum possible length of the string after performing the operations optimally.

Essentially, the result is the number of distinct characters in the string, as each distinct character can appear only once in the final minimized string.

### Example

```
Input: s = "aaabc"
Output: 3
Explanation: After operations, we can have "abc" with distinct characters.

Input: s = "cbbd"
Output: 3
Explanation: We can reduce to "cbd".
```

## Approach

The problem simplifies to finding the number of unique/distinct characters in the string. After performing all possible removal operations optimally, each unique character will appear exactly once.

## C# Solution

```csharp
public class Solution 
{
    public int MinimizedStringLength(string s) 
    {
        var uniqueChars = new HashSet<char>(s);
        return uniqueChars.Count;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the string
- **Space:** O(1) as there are at most 26 lowercase English letters
