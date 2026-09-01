# 1185. Day of the Week

**Difficulty:** Easy
**Category:** Math, String

## Problem

Given a date as `day`, `month`, and `year`, return the name of the day of the week for that date.

### Example

```
Input: day = 31, month = 8, year = 2019
Output: "Saturday"
```

## Approach

Construct a `DateTime` from the given day, month, and year, and read its built-in `DayOfWeek` property directly.

## C# Solution

```csharp
public class Solution
{
    public string DayOfTheWeek(int day, int month, int year)
    {
        var date = new DateTime(year, month, day);
        return date.DayOfWeek.ToString();
    }
}
```

## Complexity

- **Time:** `O(1)`.
- **Space:** `O(1)`.
