# 1694. Reformat Phone Number

**Difficulty:** Easy
**Category:** String

## Problem

Given a phone number string containing digits, spaces, and dashes, reformat it: strip all separators, then group the digits into blocks of 3 from the left, except the final block(s) — a leftover group of 4 digits splits into two groups of 2, and a leftover group of 2 or 3 stays as-is. Join the groups with dashes.

### Example

```
Input: number = "1-23-45 6"
Output: "123-456"
```

## Approach

Extract just the digit characters, then repeatedly take chunks of 3 while more than 4 digits remain (so the final trailing group is never left with just 1 leftover digit). Handle the final remainder specially: split exactly 4 leftover digits into 2+2, otherwise take the remaining 2 or 3 digits as a single final group. Join everything with dashes.

## C# Solution

```csharp
public class Solution
{
    public string ReformatNumber(string number)
    {
        string digits = new string(number.Where(char.IsDigit).ToArray());
        List<string> groups = new List<string>();
        int i = 0;

        while (digits.Length - i > 4)
        {
            groups.Add(digits.Substring(i, 3));
            i += 3;
        }

        int remaining = digits.Length - i;

        if (remaining == 4)
        {
            groups.Add(digits.Substring(i, 2));
            groups.Add(digits.Substring(i + 2, 2));
        }
        else
        {
            groups.Add(digits.Substring(i));
        }

        return string.Join("-", groups);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the output.
