# 434. Number of Segments in a String

**Difficulty:** Easy
**Category:** String

## Problem

Given a string `s`, return the number of segments in the string, where a segment is defined as a contiguous sequence of non-space characters.

### Example

```
Input: s = "Hello, my name is John"
Output: 5
```

### Constraints

- `0 <= s.length <= 300`
- `s` consists of lowercase and uppercase English letters, digits, or one of the following characters `"!@#$%^&*()_+-=',.:"`.
- Adjacent characters in `s` don't have to belong to different types.

## Approach

Scan the string once, counting a new segment every time a non-space character is found that is either the first character of the string or immediately preceded by a space — this marks the start of each contiguous word without needing to explicitly split the string.

## C# Solution

```csharp
public class Solution
{
    public int CountSegments(string s)
    {
        int count = 0;
        for (int i = 0; i < s.Length; i++)
        {
            if (s[i] != ' ' && (i == 0 || s[i - 1] == ' '))
                count++;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
