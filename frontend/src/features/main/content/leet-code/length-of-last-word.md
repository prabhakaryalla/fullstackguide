# 58. Length of Last Word

**Difficulty:** Easy
**Category:** String

## Problem

Given a string `s` consisting of words and spaces, return the length of the last word in the string. A word is a maximal substring consisting of non-space characters only.

### Example 1

```
Input: s = "Hello World"
Output: 5
```

### Example 2

```
Input: s = "   fly me   to   the moon  "
Output: 4
```

### Example 3

```
Input: s = "luffy is still joyboy"
Output: 6
```

### Constraints

- `1 <= s.length <= 10^4`
- `s` consists of only English letters and spaces `' '`.
- There will be at least one word in `s`.

## Approach

Scan from the end of the string, first skipping any trailing spaces, then counting characters until the next space (or the start of the string) is reached.

## C# Solution

```csharp
public class Solution
{
    public int LengthOfLastWord(string s)
    {
        int i = s.Length - 1;
        while (i >= 0 && s[i] == ' ') i--;

        int length = 0;
        while (i >= 0 && s[i] != ' ')
        {
            length++;
            i--;
        }

        return length;
    }
}
```

## Complexity

- **Time:** `O(n)` — single reverse scan.
- **Space:** `O(1)`.
