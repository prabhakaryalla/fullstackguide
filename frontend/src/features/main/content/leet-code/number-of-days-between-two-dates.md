# 1360. Number of Days Between Two Dates

**Difficulty:** Easy
**Category:** Math, String

## Problem

Given two dates as strings in `"YYYY-MM-DD"` format, return the number of days between them.

### Example

```
Input: date1 = "2019-06-29", date2 = "2019-06-30"
Output: 1
```

## Approach

Parse both strings into `DateTime` values and compute the absolute difference in days between them, letting the standard date library handle month lengths and leap years correctly.

## C# Solution

```csharp
public class Solution
{
    public int DaysBetweenDates(string date1, string date2)
    {
        var d1 = DateTime.Parse(date1);
        var d2 = DateTime.Parse(date2);
        return Math.Abs((d1 - d2).Days);
    }
}
```

## Complexity

- **Time:** `O(1)`.
- **Space:** `O(1)`.
