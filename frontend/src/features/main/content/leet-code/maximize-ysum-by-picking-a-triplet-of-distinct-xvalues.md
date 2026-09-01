# 3572. Maximize Y-Sum by Picking a Triplet of Distinct X-Values

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting, Hash Table

## Problem

You are given a 2D integer array `coordinates`, where `coordinates[i] = [xi, yi]`. Choose three points from `coordinates` such that their x-coordinates are pairwise distinct, and maximize the sum of the y-coordinates of the three chosen points. Return the maximum possible sum, or `-1` if it is not possible to choose three points with pairwise distinct x-coordinates.

### Example

`coordinates = [[1,3],[2,2],[3,4],[1,5]]`. The best `y` for `x = 1` is `5`, for `x = 2` is `2`, and for `x = 3` is `4`. Choosing one point per distinct x-value: `5 + 2 + 4 = 11`.

## Approach

Since only one point per distinct x-value can appear in the triplet, and for a fixed x-value the point with the largest y is always the best choice, first reduce the input to a map from each distinct x-value to its maximum y-value. If fewer than three distinct x-values exist, return `-1`. Otherwise, return the sum of the three largest values in this reduced map.

## C# Solution

```csharp
public class Solution 
{
    public long MaxSumTriplet(int[][] coordinates) 
    {
        Dictionary<int, long> bestY = new Dictionary<int, long>();

        foreach (int[] point in coordinates)
        {
            int x = point[0];
            long y = point[1];
            if (!bestY.ContainsKey(x) || y > bestY[x])
            {
                bestY[x] = y;
            }
        }

        if (bestY.Count < 3)
        {
            return -1;
        }

        List<long> values = new List<long>(bestY.Values);
        values.Sort();
        values.Reverse();

        return values[0] + values[1] + values[2];
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
