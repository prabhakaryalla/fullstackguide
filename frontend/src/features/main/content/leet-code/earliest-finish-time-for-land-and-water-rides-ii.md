# 3635. Earliest Finish Time for Land and Water Rides II

**Difficulty:** Medium
**Category:** Array, Greedy

## Problem

Same setup as the easier version, but with larger input sizes that require an efficient (no nested-loop) solution: given land and water ride start/duration arrays, a rider takes one of each in either order, and you must return the earliest possible finish time.

### Example

With many rides, brute-forcing all pairs is too slow; the earliest finish only ever depends on the *globally earliest-finishing* ride of the opposite type.

## Approach

For the "land then water" order, `max(waterStart[j], landFinish[i])` is minimized by choosing the smallest `landFinish[i]` overall (a smaller `landFinish` never hurts since the max only cares about whichever value is bigger). So compute the global minimum land finish time and minimum water finish time once, then scan each ride of the opposite type in O(n+m) instead of O(n*m).

## C# Solution

```csharp
public class Solution 
{
    public int EarliestFinishTime(int[] landStartTime, int[] landDuration, int[] waterStartTime, int[] waterDuration) 
    {
        int n = landStartTime.Length, m = waterStartTime.Length;

        int minLandFinish = int.MaxValue;
        for (int i = 0; i < n; i++) 
        {
            minLandFinish = Math.Min(minLandFinish, landStartTime[i] + landDuration[i]);
        }

        int minWaterFinish = int.MaxValue;
        for (int j = 0; j < m; j++) 
        {
            minWaterFinish = Math.Min(minWaterFinish, waterStartTime[j] + waterDuration[j]);
        }

        int result = int.MaxValue;
        for (int j = 0; j < m; j++) 
        {
            result = Math.Min(result, Math.Max(waterStartTime[j], minLandFinish) + waterDuration[j]);
        }
        for (int i = 0; i < n; i++) 
        {
            result = Math.Min(result, Math.Max(landStartTime[i], minWaterFinish) + landDuration[i]);
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(n + m)
- **Space:** O(1)
