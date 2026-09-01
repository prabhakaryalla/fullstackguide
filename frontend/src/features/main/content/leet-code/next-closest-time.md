# 681. Next Closest Time

**Difficulty:** Medium
**Category:** Hash Table, String, Backtracking, Enumeration
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `time` string in `"HH:MM"` format, return the next closest time that can be formed by reusing the same set of digits as many times as needed.

### Example

```
Input: time = "19:34"
Output: "19:39"
```

### Constraints

- `time` is a valid 24-hour time in `"HH:MM"` format.

## Approach

Collect the distinct digits present in the input time. Convert the time to total minutes since midnight, then simulate advancing minute by minute (wrapping around at 24 hours), checking at each candidate minute whether its formatted `"HHMM"` representation uses only the allowed digit set. The first valid candidate found is the next closest time.

## C# Solution

```csharp
public class Solution
{
    public string NextClosestTime(string time)
    {
        var digits = new SortedSet<char>();
        foreach (var c in time)
            if (c != ':')
                digits.Add(c);

        int totalMinutes = int.Parse(time.Substring(0, 2)) * 60 + int.Parse(time.Substring(3, 2));

        for (int add = 1; add <= 24 * 60; add++)
        {
            int candidateMinutes = (totalMinutes + add) % (24 * 60);
            int hour = candidateMinutes / 60;
            int minute = candidateMinutes % 60;

            var candidate = $"{hour:D2}{minute:D2}";
            if (candidate.All(c => digits.Contains(c)))
                return $"{candidate.Substring(0, 2)}:{candidate.Substring(2, 2)}";
        }

        return time;
    }
}
```

## Complexity

- **Time:** `O(1)` — bounded by at most 1440 candidate minutes.
- **Space:** `O(1)`.
