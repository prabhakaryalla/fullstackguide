# 273. Integer to English Words

**Difficulty:** Hard
**Category:** Math, String, Recursion

## Problem

Convert a non-negative integer `num` to its English words representation.

### Example

```
Input: num = 1234567
Output: "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
```

### Constraints

- `0 <= num <= 2^31 - 1`

## Approach

Break the number into groups of three digits (ones, thousands, millions, billions). Write a helper that converts any number under 1000 into words using lookup tables for ones/teens, tens, and hundreds. Process the groups from most significant to least significant, appending the appropriate scale word (`"Billion"`, `"Million"`, `"Thousand"`) after each non-zero group.

## C# Solution

```csharp
public class Solution
{
    private static readonly string[] Below20 =
    {
        "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
        "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
        "Seventeen", "Eighteen", "Nineteen"
    };
    private static readonly string[] Tens =
    {
        "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
    };
    private static readonly (int Value, string Name)[] Scales =
    {
        (1_000_000_000, "Billion"), (1_000_000, "Million"), (1_000, "Thousand")
    };

    public string NumberToWords(int num)
    {
        if (num == 0) return "Zero";

        var sb = new StringBuilder();
        foreach (var (value, name) in Scales)
        {
            if (num >= value)
            {
                sb.Append(Helper(num / value)).Append(' ').Append(name).Append(' ');
                num %= value;
            }
        }

        if (num > 0) sb.Append(Helper(num));

        return sb.ToString().Trim();
    }

    private string Helper(int num)
    {
        if (num == 0) return "";
        if (num < 20) return Below20[num] + " ";
        if (num < 100) return Tens[num / 10] + " " + Helper(num % 10);
        return Below20[num / 100] + " Hundred " + Helper(num % 100);
    }
}
```

## Complexity

- **Time:** `O(1)` — bounded by a constant number of groups (up to 4) for 32-bit integers.
- **Space:** `O(1)` — excluding the output string.
