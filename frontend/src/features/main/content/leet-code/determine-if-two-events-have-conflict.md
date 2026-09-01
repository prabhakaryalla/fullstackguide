# 2446. Determine if Two Events Have Conflict

**Difficulty:** Easy
**Category:** Array, String

## Problem

You are given two arrays of strings `event1` and `event2` representing the start and end times of two events in 24-hour "HH:MM" format:
- `event1 = [startTime1, endTime1]`
- `event2 = [startTime2, endTime2]`

Return `true` if there is a conflict between the two events. That is, if there is any moment when both events are happening.

### Example

```
Input: event1 = ["01:15","02:00"], event2 = ["02:00","03:00"]
Output: true
Explanation: Both events are happening at 02:00.
```

## Approach

Two events conflict if they overlap. Events overlap if:
- `start1 <= end2` AND `start2 <= end1`

Convert times to comparable integers (minutes since midnight) or compare them as strings directly since "HH:MM" format is lexicographically comparable.

## C# Solution

```csharp
public class Solution
{
    public bool HaveConflict(string[] event1, string[] event2)
    {
        // Since times are in "HH:MM" format, string comparison works
        return event1[0].CompareTo(event2[1]) <= 0 && 
               event2[0].CompareTo(event1[1]) <= 0;
    }
}
```

## Complexity

- **Time:** O(1) - constant time string comparisons
- **Space:** O(1)
