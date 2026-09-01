# 1488. Avoid Flood in The City

**Difficulty:** Medium
**Category:** Array, Hash Table, Greedy, Heap (Priority Queue), Binary Search, Ordered Set

## Problem

Given `rains[i]` (a lake number that fills on day `i`, or `0` meaning you may dry one lake on that day), return, for each day, which lake you dried (any value if a `0`-day's choice doesn't matter) so that no already-full lake ever fills again, or an empty array if flooding is unavoidable.

### Example

```
Input: rains = [1,2,0,0,2,1]
Output: [-1,-1,2,1,-1,-1]
```

## Approach

Track, for each currently full lake, the day it was filled, and maintain a sorted set of "dry days" (days where `rains[i] == 0`) not yet assigned to a specific lake. When a lake that's already full is about to fill again, it must have been dried on some day strictly after it was last filled and before now — look up the smallest available dry day greater than that fill day; if none exists, flooding is unavoidable. Otherwise, assign that dry day to drying this lake and update its fill day to today. Any dry days left unused at the end can dry an arbitrary (never-refilled) lake.

## C# Solution

```csharp
public class Solution
{
    public int[] AvoidFlood(int[] rains)
    {
        int n = rains.Length;
        var ans = new int[n];
        Array.Fill(ans, -1);

        var full = new Dictionary<int, int>(); // lake -> day filled
        var dryDays = new SortedSet<int>();

        for (int i = 0; i < n; i++)
        {
            if (rains[i] == 0)
            {
                dryDays.Add(i);
                continue;
            }

            int lake = rains[i];
            if (full.ContainsKey(lake))
            {
                int filledDay = full[lake];
                var candidates = dryDays.GetViewBetween(filledDay + 1, n);
                if (candidates.Count == 0) return Array.Empty<int>();

                int dryDay = candidates.Min;
                ans[dryDay] = lake;
                dryDays.Remove(dryDay);
            }

            full[lake] = i;
        }

        foreach (var d in dryDays) ans[d] = 1;

        return ans;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sorted set operations.
- **Space:** `O(n)` for the tracking structures.
