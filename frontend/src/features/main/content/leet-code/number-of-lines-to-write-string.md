# 806. Number of Lines To Write String

**Difficulty:** Easy
**Category:** Array, String

## Problem

Given an array `widths` giving the pixel width of each lowercase letter and a string `s`, letters are written left to right, wrapping to a new line whenever adding the next letter would exceed 100 pixels on the current line. Return the number of lines used and the pixel width of the last line.

### Example

```
Input: widths = [4,4,4,4,4,4,4,4,4,4,4,4,10,4,4,4,4,4,4,4,4,4,4,4,4,4], s = "abcdefghijklmnopqrstuvwxyz"
Output: [3,60]
```

## Approach

Track the running width of the current line and the number of lines used so far. For each character, if adding its width would exceed 100 pixels, start a new line (incrementing the line count and resetting the current width to this character's width); otherwise, add its width to the current line.

## C# Solution

```csharp
public class Solution
{
    public int[] NumberOfLines(int[] widths, string s)
    {
        int lines = 1;
        int currentWidth = 0;

        foreach (var c in s)
        {
            int charWidth = widths[c - 'a'];

            if (currentWidth + charWidth > 100)
            {
                lines++;
                currentWidth = charWidth;
            }
            else
            {
                currentWidth += charWidth;
            }
        }

        return new[] { lines, currentWidth };
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` extra.
