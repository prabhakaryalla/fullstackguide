# 917. Reverse Only Letters

**Difficulty:** Easy
**Category:** Two Pointers, String

## Problem

Given a string `s`, reverse only the letters in it, leaving all non-letter characters in their original positions.

### Example

```
Input: s = "ab-cd"
Output: "dc-ba"
```

## Approach

Use two pointers from opposite ends of the character array. Skip past any non-letter character on either side, and once both point at letters, swap them and move both pointers inward.

## C# Solution

```csharp
public class Solution
{
    public string ReverseOnlyLetters(string s)
    {
        var chars = s.ToCharArray();
        int i = 0, j = chars.Length - 1;

        while (i < j)
        {
            if (!char.IsLetter(chars[i])) { i++; continue; }
            if (!char.IsLetter(chars[j])) { j--; continue; }

            (chars[i], chars[j]) = (chars[j], chars[i]);
            i++;
            j--;
        }

        return new string(chars);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the character array.
