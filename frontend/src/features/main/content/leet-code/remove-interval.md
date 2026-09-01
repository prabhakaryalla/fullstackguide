# 1272. Remove Interval

**Difficulty:** Medium
**Category:** Array
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a sorted list of disjoint intervals `intervals` and another interval `toBeRemoved`, return the set of intervals remaining after subtracting `toBeRemoved` from every interval in `intervals`.

### Example

```
Input: intervals = [[0,2],[3,4],[5,7]], toBeRemoved = [1,6]
Output: [[0,1],[6,7]]
```

## Approach

Process each interval independently. If it doesn't overlap `toBeRemoved` at all (ends before it starts, or starts after it ends), keep it unchanged. Otherwise, the overlapping interval may leave behind a left remainder (`[start, toBeRemoved.start)`, if the interval starts before the removal begins) and/or a right remainder (`[toBeRemoved.end, end)`, if the interval extends past the removal), so emit whichever of those two pieces is non-empty.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> RemoveInterval(int[][] intervals, int[] toBeRemoved)
    {
        var result = new List<IList<int>>();

        foreach (var interval in intervals)
        {
            int start = interval[0], end = interval[1];

            if (end <= toBeRemoved[0] || start >= toBeRemoved[1])
            {
                result.Add(new List<int> { start, end });
                continue;
            }

            if (start < toBeRemoved[0])
                result.Add(new List<int> { start, toBeRemoved[0] });

            if (end > toBeRemoved[1])
                result.Add(new List<int> { toBeRemoved[1], end });
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of intervals.
- **Space:** `O(n)` for the output.
