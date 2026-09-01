# 957. Prison Cells After N Days

**Difficulty:** Medium
**Category:** Array, Bit Manipulation, Simulation

## Problem

Given an array of 8 cells (`1` occupied, `0` vacant), each day every cell (except the two end cells) becomes occupied if both its neighbors were the same on the previous day, otherwise vacant. Return the state of the cells after `n` days.

### Example

```
Input: cells = [0,1,0,1,1,0,0,1], n = 7
Output: [0,0,1,1,0,0,0,0]
```

## Approach

Since there are only 256 possible states, the sequence of states must eventually cycle. Simulate day by day, recording each seen state; once a repeated state is found, compute the cycle length and reduce the remaining days modulo that length, then simulate only the reduced number of remaining days.

## C# Solution

```csharp
public class Solution
{
    public int[] PrisonAfterNDays(int[] cells, int n)
    {
        var seen = new Dictionary<string, int>();
        int remaining = n, day = 0;

        while (remaining > 0)
        {
            string key = string.Join(",", cells);

            if (seen.TryGetValue(key, out int firstDay))
            {
                int cycleLen = day - firstDay;
                remaining %= cycleLen;
                for (int i = 0; i < remaining; i++) cells = NextDay(cells);
                return cells;
            }

            seen[key] = day;
            cells = NextDay(cells);
            day++;
            remaining--;
        }

        return cells;
    }

    private int[] NextDay(int[] cells)
    {
        var next = new int[cells.Length];
        for (int i = 1; i < cells.Length - 1; i++)
        {
            next[i] = cells[i - 1] == cells[i + 1] ? 1 : 0;
        }
        return next;
    }
}
```

## Complexity

- **Time:** `O(min(n, cycleLen))`, bounded by at most 256 distinct states.
- **Space:** `O(1)` (8-cell states).
