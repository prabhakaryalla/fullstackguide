# 2645. Minimum Additions to Make Valid String

**Difficulty:** Medium
**Category:** String, Greedy, Stack

## Problem

Given a string `word` to which you can insert letters "a", "b", and/or "c" anywhere and any number of times, return the minimum number of letters that must be added so that `word` becomes valid.

A string is valid if it can be formed by concatenating the string "abc" several times.

### Example

```
Input: word = "b"
Output: 2
Explanation: Insert "a" before and "c" after to get "abc".
```

## Approach

Track the expected next character in the "abc" pattern. Traverse the string. If the current character matches the expected next character, advance the pattern. Otherwise, add operations for the missing characters. Count how many characters are needed to complete partial patterns at the end.

## C# Solution

```csharp
public class Solution
{
    public int AddMinimum(string word)
    {
        int additions = 0;
        int i = 0;
        
        while (i < word.Length)
        {
            int expected = 0;
            
            if (word[i] == 'a')
            {
                expected++;
                i++;
            }
            
            if (i < word.Length && word[i] == 'b')
            {
                expected++;
                i++;
            }
            
            if (i < word.Length && word[i] == 'c')
            {
                expected++;
                i++;
            }
            
            additions += 3 - expected;
        }
        
        return additions;
    }
}
```

## Complexity

- **Time:** O(n) — single pass through the string
- **Space:** O(1) — constant extra space
