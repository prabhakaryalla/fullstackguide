# 2278. Percentage of Letter in String

**Difficulty:** Easy
**Category:** String

## Problem

Given a string `s` and a character `letter`, return the percentage of characters in `s` that equal `letter` rounded down to the nearest whole percent.

### Example

```
Input: s = "foobar", letter = "o"
Output: 33
Explanation: "o" appears 2 times in "foobar" (length 6). Percentage = 2/6 * 100 = 33.33..., rounded down = 33.
```

## Approach

Count occurrences of `letter` in `s`, divide by string length, multiply by 100, and truncate to integer.

## C# Solution

```csharp
public class Solution
{
    public int PercentageLetter(string s, char letter)
    {
        int count = 0;
        
        foreach (char c in s)
        {
            if (c == letter) count++;
        }
        
        return (count * 100) / s.Length;
    }
}
```

## Complexity

- **Time:** O(n).
- **Space:** O(1).
