# 1507. Reformat Date

**Difficulty:** Easy
**Category:** String

## Problem

Given a date string in the form `"day month year"` (e.g. `"20th Oct 2052"`), convert it to the format `YYYY-MM-DD`.

### Example

```
Input: date = "20th Oct 2052"
Output: "2052-10-20"
```

## Approach

Split the input on spaces to get the day (strip the ordinal suffix such as `st`/`nd`/`rd`/`th`), the month (map the three-letter abbreviation to its two-digit number), and the year. Format each piece with leading zeros as needed and join with `-`.

## C# Solution

```csharp
public class Solution
{
    private static readonly string[] Months =
    {
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    };

    public string ReformatDate(string date)
    {
        string[] parts = date.Split(' ');
        string dayDigits = new string(parts[0].TakeWhile(char.IsDigit).ToArray());
        int day = int.Parse(dayDigits);
        int month = Array.IndexOf(Months, parts[1]) + 1;
        string year = parts[2];

        return $"{year}-{month:D2}-{day:D2}";
    }
}
```

## Complexity

- **Time:** `O(1)` — the input length is bounded by a small constant.
- **Space:** `O(1)`.
