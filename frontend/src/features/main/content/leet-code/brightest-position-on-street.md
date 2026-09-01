# 2021. Brightest Position on Street

**Difficulty:** Medium
**Category:** Array, Prefix Sum, Sorting, Ordered Map
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given `lights` where `lights[i] = [positioni, rangei]` means a street lamp at `positioni` illuminates every integer position in `[positioni - rangei, positioni + rangei]`. Return the position with the maximum total brightness (number of lamps illuminating it). If multiple positions tie for maximum, return the smallest such position.

### Example

`lights = [[-3,2],[1,2],[3,3]]` → lamp 1 covers `[-5,-1]`, lamp 2 covers `[-1,3]`, lamp 3 covers `[0,6]`. Position `-1` and `0` are each covered by 2 lamps (the maximum), so the answer is `-1` (the smaller of the two).

## Approach

This is a classic difference-array / line sweep over sparse coordinates. For each lamp, add `+1` at `position - range` and `-1` at `position + range + 1` in a sorted map keyed by position. Then iterate the map in ascending key order, accumulating brightness; the first position where brightness strictly exceeds the current maximum becomes the new candidate answer. Because brightness is constant between consecutive event keys, the position where a new maximum starts is exactly the key of that event, and scanning in ascending order naturally picks the smallest tied position.

## C# Solution

```csharp
public class Solution 
{
    public int BrightestPosition(int[][] lights) 
    {
        var line = new SortedDictionary<int, int>();
        foreach (var light in lights)
        {
            int position = light[0], range = light[1];
            int start = position - range;
            int end = position + range + 1;
            line[start] = line.GetValueOrDefault(start, 0) + 1;
            line[end] = line.GetValueOrDefault(end, 0) - 1;
        }

        int ans = int.MaxValue;
        int maxBrightness = -1;
        int currBrightness = 0;

        foreach (var (pos, delta) in line)
        {
            currBrightness += delta;
            if (currBrightness > maxBrightness)
            {
                maxBrightness = currBrightness;
                ans = pos;
            }
        }

        return ans;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
