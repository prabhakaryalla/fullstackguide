# 539. Minimum Time Difference

**Difficulty:** Medium
**Category:** Array, Math, String, Sorting

## Problem

Given a list of 24-hour clock time points in `"HH:MM"` format, return the minimum minutes difference between any two time points in the list.

### Example

```
Input: timePoints = ["23:59","00:00"]
Output: 1
```

### Constraints

- `2 <= timePoints.length <= 2 * 10^4`
- `timePoints[i]` is in the format `"HH:MM"`.

## Approach

Convert every time point to minutes since midnight, then sort them. The minimum difference must occur between two adjacent values in this sorted order, so check every consecutive pair. Since the clock wraps around at midnight, also check the "wraparound" gap between the largest and smallest time (i.e., `1440` minus their difference).

## C# Solution

```csharp
public class Solution
{
    public int FindMinDifference(IList<string> timePoints)
    {
        var minutes = timePoints.Select(ToMinutes).OrderBy(m => m).ToArray();
        int n = minutes.Length;
        int minDiff = int.MaxValue;

        for (int i = 1; i < n; i++)
            minDiff = Math.Min(minDiff, minutes[i] - minutes[i - 1]);

        int wraparound = 1440 - minutes[n - 1] + minutes[0];
        minDiff = Math.Min(minDiff, wraparound);

        return minDiff;
    }

    private int ToMinutes(string time)
    {
        var parts = time.Split(':');
        return int.Parse(parts[0]) * 60 + int.Parse(parts[1]);
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sort.
- **Space:** `O(n)` for the minutes array.
