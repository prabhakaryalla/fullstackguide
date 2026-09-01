# 800. Similar RGB Color

**Difficulty:** Easy
**Category:** Math, String
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a 6-digit RGB color string like `"#AABBCC"`, find the "shorthand" color (where each pair of hex digits is a repeated single digit, like `"#AAAAAA"` shortened to `"#AAA"` style values, i.e., each channel is of the form `"XX"` for a single hex digit `X`) that is most similar — minimizing the sum of squared differences per channel — and return it in full 6-digit form.

### Example

```
Input: color = "#09f166"
Output: "#11ee66"
```

## Approach

Each color channel can be treated independently, since similarity is measured per channel. For each 2-digit hex channel value, try all 16 possible shorthand values (`0x00, 0x11, 0x22, ..., 0xFF`, i.e., `digit * 17` for `digit` from `0` to `15`) and pick whichever minimizes the absolute difference from the original channel value. Combine the three best single-digit results (each doubled into its 2-character form) into the final color string.

## C# Solution

```csharp
public class Solution
{
    public string SimilarRGB(string color)
    {
        string r = ClosestPair(color.Substring(1, 2));
        string g = ClosestPair(color.Substring(3, 2));
        string b = ClosestPair(color.Substring(5, 2));

        return "#" + r + g + b;
    }

    private string ClosestPair(string hex)
    {
        int value = Convert.ToInt32(hex, 16);
        int bestDiff = int.MaxValue;
        int bestDigit = 0;

        for (int digit = 0; digit <= 15; digit++)
        {
            int candidate = digit * 17;
            int diff = Math.Abs(candidate - value);

            if (diff < bestDiff)
            {
                bestDiff = diff;
                bestDigit = digit;
            }
        }

        string hexDigit = bestDigit.ToString("x");
        return hexDigit + hexDigit;
    }
}
```

## Complexity

- **Time:** `O(1)` — a fixed 16 candidates checked per channel.
- **Space:** `O(1)` extra.
