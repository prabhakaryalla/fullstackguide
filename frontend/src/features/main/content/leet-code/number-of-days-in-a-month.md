# 1118. Number of Days in a Month

**Difficulty:** Easy
**Category:** Math

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given a `year` and a `month`, return the number of days in that month, correctly accounting for leap years.

### Example

```
Input: year = 1992, month = 7
Output: 31
```

## Approach

Look up the standard day count for the given month from a fixed table, with a special case for February: a year is a leap year if it's divisible by `4` and not by `100`, unless it's also divisible by `400`.

## C# Solution

```csharp
public class Solution
{
    public int NumberOfDays(int year, int month)
    {
        int[] days = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
        bool isLeap = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
        if (month == 2 && isLeap) return 29;
        return days[month - 1];
    }
}
```

## Complexity

- **Time:** `O(1)`.
- **Space:** `O(1)`.
