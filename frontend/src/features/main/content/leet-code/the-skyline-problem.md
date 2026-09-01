# 218. The Skyline Problem

**Difficulty:** Hard
**Category:** Array, Divide and Conquer, Binary Indexed Tree, Segment Tree, Line Sweep, Heap, Ordered Set

## Problem

Given a list of buildings `[left, right, height]`, compute the skyline formed by their outlines — a list of `[x, height]` key points where the outline height changes, describing the silhouette when all buildings are viewed from a distance.

### Example

```
buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]
-> [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
```

## Approach

A line-sweep with a max-heap: convert every building into two events — a "start" event at `left` (adding its height) and an "end" event at `right` (removing its height). Sort events by x-coordinate (processing starts before ends at the same x, so overlapping buildings merge correctly). Maintain a max-heap of "currently active" heights with lazy deletion; whenever the current maximum active height changes after processing an event, that x-coordinate becomes a new key point.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> GetSkyline(int[][] buildings)
    {
        var events = new List<(int x, int height, bool isStart)>();

        foreach (var b in buildings)
        {
            events.Add((b[0], b[2], true));
            events.Add((b[1], b[2], false));
        }

        events.Sort((a, b) =>
        {
            if (a.x != b.x) return a.x.CompareTo(b.x);
            if (a.isStart != b.isStart) return a.isStart ? -1 : 1;
            return a.isStart ? b.height.CompareTo(a.height) : a.height.CompareTo(b.height);
        });

        var result = new List<IList<int>>();
        var activeHeights = new SortedDictionary<int, int>(Comparer<int>.Create((a, b) => b.CompareTo(a)));
        activeHeights[0] = 1;
        int prevMax = 0;

        foreach (var e in events)
        {
            if (e.isStart)
            {
                activeHeights[e.height] = activeHeights.GetValueOrDefault(e.height) + 1;
            }
            else
            {
                activeHeights[e.height]--;
                if (activeHeights[e.height] == 0) activeHeights.Remove(e.height);
            }

            int currentMax = activeHeights.Keys.First();

            if (currentMax != prevMax)
            {
                result.Add(new List<int> { e.x, currentMax });
                prevMax = currentMax;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n log n)` — sorting events plus logarithmic heap operations per event.
- **Space:** `O(n)` — for the events list and active-heights structure.
