# 759. Employee Free Time

**Difficulty:** Hard
**Category:** Array, Sorting, Heap, Line Sweep
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a list of schedules, one list of non-overlapping `Interval`s per employee (each employee's own intervals sorted), return the list of finite intervals representing common, positive-length free time shared by all employees, sorted in order.

### Example

```
Input: schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]
Output: [[3,4]]
```

## Approach

Flatten every employee's intervals into one big list and sort them all by start time. Sweep through the sorted intervals while merging overlapping ones, tracking the current merged interval's end. Whenever the next interval's start is strictly after the current merged end, that gap `[currentEnd, nextStart)` is a period when nobody is working — a free time slot common to all employees.

## C# Solution

```csharp
public class Solution
{
    public IList<Interval> EmployeeFreeTime(IList<IList<Interval>> schedule)
    {
        var allIntervals = new List<Interval>();
        foreach (var employee in schedule)
            allIntervals.AddRange(employee);

        allIntervals.Sort((a, b) => a.start - b.start);

        var result = new List<Interval>();
        int end = allIntervals[0].end;

        for (int i = 1; i < allIntervals.Count; i++)
        {
            var interval = allIntervals[i];

            if (interval.start > end)
            {
                result.Add(new Interval(end, interval.start));
                end = interval.end;
            }
            else
            {
                end = Math.Max(end, interval.end);
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n log n)`, where `n` is the total number of intervals.
- **Space:** `O(n)` for the flattened list.
