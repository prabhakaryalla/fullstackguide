# 1618. Maximum Font to Fit a Sentence in a Screen

**Difficulty:** Medium
**Category:** Array, String, Binary Search

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `text`, a screen of width `w` and height `h`, an array of available `fonts` (sorted ascending), and a `FontInfo` object exposing `GetWidth(fontSize, ch)` and `GetHeight(fontSize)`, return the largest font size from `fonts` whose rendering of `text` fits within the screen, or `-1` if none fit.

### Example

```
Input: text = "helloworld", w = 80, h = 20, fonts = [6,8,10,12,14,16,18,24,36]
Output: 6
```

## Approach

Since larger font sizes always take equal-or-more space, "fits" is monotonic over the sorted `fonts` array — binary search for the largest fitting size. For each candidate font size, a fit requires the font's height to be at most `h` and the sum of each character's width (via `fontInfo.GetWidth`) to be at most `w`. `FontInfo` is assumed pre-defined per the problem statement.

## C# Solution

```csharp
public class Solution
{
    public int MaxFont(string text, int w, int h, int[] fonts, FontInfo fontInfo)
    {
        int left = 0;
        int right = fonts.Length - 1;
        int best = -1;

        while (left <= right)
        {
            int mid = left + (right - left) / 2;
            int fontSize = fonts[mid];

            if (Fits(text, w, h, fontSize, fontInfo))
            {
                best = fontSize;
                left = mid + 1;
            }
            else
            {
                right = mid - 1;
            }
        }

        return best;
    }

    private bool Fits(string text, int w, int h, int fontSize, FontInfo fontInfo)
    {
        if (fontInfo.GetHeight(fontSize) > h)
        {
            return false;
        }

        int totalWidth = 0;
        foreach (char c in text)
        {
            totalWidth += fontInfo.GetWidth(fontSize, c);
        }

        return totalWidth <= w;
    }
}
```

## Complexity

- **Time:** `O(log(f) * L)`, where `f` is the number of fonts and `L` is the text length.
- **Space:** `O(1)`.
