# 1943. Describe the Painting

**Difficulty:** Hard
**Category:** Array, Hash Table, Prefix Sum, Sorting

## Problem

Given `segments[i] = [starti, endi, colori]` describing painted segments on a number line (later paints mix colors additively at overlaps by summing their color values), return a description of the final painting as a list of `[starti, endi, mixedColor]` for each maximal interval of constant mixed color, covering only painted (non-zero color) regions, sorted by start.

### Example

```
Input: segments = [[1,4,5],[4,7,7],[1,7,9]]
Output: [[1,4,14],[4,7,16]]
Explanation: [1,4) has colors 5+9=14; [4,7) has colors 7+9=16.
```

### Constraints

- `1 <= segments.length <= 2 * 10^4`
- `segments[i].length == 3`
- `1 <= starti < endi <= 10^5`
- `1 <= colori <= 10^9`

## Approach

Use a difference-map (sweep line) keyed by coordinate: for each segment `[start, end, color]`, add `color` at `start` and subtract `color` at `end`. Sort the distinct coordinates, then sweep left to right accumulating a running sum representing the mixed color of the current interval; whenever the running sum is non-zero between two consecutive coordinates, emit `[coord, nextCoord, sum]`.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<long>> SplitPainting(int[][] segments)
    {
        var delta = new SortedDictionary<int, long>();

        foreach (var seg in segments)
        {
            int start = seg[0], end = seg[1], color = seg[2];
            delta[start] = delta.GetValueOrDefault(start, 0) + color;
            delta[end] = delta.GetValueOrDefault(end, 0) - color;
        }

        var result = new List<IList<long>>();
        var points = delta.Keys.ToList();
        long runningSum = 0;

        for (int i = 0; i < points.Count; i++)
        {
            runningSum += delta[points[i]];
            if (i + 1 < points.Count && runningSum > 0)
            {
                result.Add(new List<long> { points[i], points[i + 1], runningSum });
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n log n)` — dominated by sorting the coordinate map.
- **Space:** `O(n)` for the difference map and result list.
