# 1957. Delete Characters to Make Fancy String

**Difficulty:** Easy
**Category:** String

## Problem

A "fancy" string never has 3 consecutive identical characters. Given a string `s`, delete the minimum number of characters so that it becomes fancy, and return the resulting string.

### Example

```
Input: s = "leeetcode"
Output: "leetcode"
Explanation: Remove one of the three consecutive 'e's.
```

### Constraints

- `1 <= s.length <= 10^5`
- `s` consists only of lowercase English letters.

## Approach

Build the result greedily by appending each character to a result buffer only if doing so would not create a run of 3 identical characters at the end (i.e., skip a character if the last two characters already appended equal it).

## C# Solution

```csharp
public class Solution
{
    public string MakeFancyString(string s)
    {
        var result = new System.Text.StringBuilder();

        foreach (char c in s)
        {
            int len = result.Length;
            if (len >= 2 && result[len - 1] == c && result[len - 2] == c)
            {
                continue;
            }
            result.Append(c);
        }

        return result.ToString();
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over the string.
- **Space:** `O(n)` for the result buffer.
