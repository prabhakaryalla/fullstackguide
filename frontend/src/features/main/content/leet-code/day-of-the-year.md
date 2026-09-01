# 1154. Day of the Year

**Difficulty:** Easy
**Category:** Math, String

## Problem

Given a date string in the format `"YYYY-MM-DD"`, return the day number of the year for that date.

### Example

```
Input: date = "2019-01-09"
Output: 9
```

## Approach

Parsing the string into a `DateTime` and reading its built-in `DayOfYear` property directly accounts for leap years and varying month lengths.

## C# Solution

```csharp
public class Solution
{
    public int DayOfYear(string date)
    {
        var parsed = DateTime.Parse(date);
        return parsed.DayOfYear;
    }
}
```

## Complexity

- **Time:** `O(1)`.
- **Space:** `O(1)`.
