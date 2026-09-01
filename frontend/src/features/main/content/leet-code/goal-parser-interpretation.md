# 1678. Goal Parser Interpretation

**Difficulty:** Easy
**Category:** String

## Problem

Given a `command` string made only of `"G"`, `"()"`, and `"(al)"`, interpret it: `"G"` maps to `"G"`, `"()"` maps to `"o"`, and `"(al)"` maps to `"al"`. Return the resulting interpreted string.

### Example

```
Input: command = "G()(al)"
Output: "Goal"
```

## Approach

Scan the command left to right. Whenever a `'G'` is seen, append `'G'` and advance one position. Whenever a `'('` is followed immediately by `')'`, append `'o'` and advance two positions. Otherwise it must be the start of `"(al)"`, so append `"al"` and advance four positions.

## C# Solution

```csharp
public class Solution
{
    public string Interpret(string command)
    {
        StringBuilder result = new StringBuilder();
        int i = 0;

        while (i < command.Length)
        {
            if (command[i] == 'G')
            {
                result.Append('G');
                i++;
            }
            else if (command[i + 1] == ')')
            {
                result.Append('o');
                i += 2;
            }
            else
            {
                result.Append("al");
                i += 4;
            }
        }

        return result.ToString();
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the output.
