# 2015. Average Height of Buildings in Each Segment

**Difficulty:** Medium
**Category:** Array, Prefix Sum, Sorting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given `buildings` where `buildings[i] = [starti, endi, heighti]` means there is a building of height `heighti` covering the street segment `[starti, endi)`. For every maximal street segment covered by at least one building, the "average height" is the sum of heights of all buildings covering it divided by the number of buildings covering it. Return a list of `[start, end, averageHeight]` for every such segment, merging adjacent segments that end up with the same average height, sorted by position, only including segments that have at least one building.

### Example

`buildings = [[1,4,2],[3,9,4]]` → overlapping segment `[3,4)` has 2 buildings averaging 3, `[1,3)` has one building of height 2, `[4,9)` has one building of height 4. Output: `[[1,3,2],[3,4,3],[4,9,4]]`.

## Approach

Use a coordinate-based line sweep. For each building, record `+height` at `start` and `-height` at `end`. Sort all these events by position. Sweep through, maintaining a running `sumHeight` and `count` of active buildings; whenever we cross to a new x-coordinate with `count > 0`, the average height for `[prev, curr)` is `sumHeight / count`. Merge the new segment into the previous one in the answer list if the previous segment's end matches `prev` and it has the same average height; otherwise append a new segment.

## C# Solution

```csharp
public class Solution 
{
    public int[][] AverageHeightOfBuildings(int[][] buildings) 
    {
        var events = new List<(int pos, int height)>();
        foreach (var b in buildings)
        {
            events.Add((b[0], b[2]));
            events.Add((b[1], -b[2]));
        }
        events.Sort((a, b) => a.pos != b.pos ? a.pos.CompareTo(b.pos) : 0);

        var ans = new List<int[]>();
        int prev = 0, count = 0, sumHeight = 0;

        foreach (var (curr, height) in events)
        {
            if (sumHeight > 0 && curr > prev)
            {
                int avgHeight = sumHeight / count;
                if (ans.Count > 0 && ans[^1][1] == prev && ans[^1][2] == avgHeight)
                    ans[^1][1] = curr;
                else
                    ans.Add(new[] { prev, curr, avgHeight });
            }
            sumHeight += height;
            count += height > 0 ? 1 : -1;
            prev = curr;
        }

        return ans.ToArray();
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
