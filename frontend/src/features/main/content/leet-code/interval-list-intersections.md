# 986. Interval List Intersections

**Difficulty:** Medium
**Category:** Array, Two Pointers

## Problem

Given two lists of closed, pairwise disjoint, sorted intervals `firstList` and `secondList`, return the intersection of the two interval lists.

### Example

```
Input: firstList = [[0,2],[5,10],[13,23],[24,25]], secondList = [[1,5],[8,12],[15,24],[25,26]]
Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
```

## Approach

Walk both lists with two pointers. The overlap between the current interval from each list is `[max(starts), min(ends)]`; if that range is valid (`start <= end`), record it. Then advance whichever interval ends first, since it can't overlap with anything further in the other list.

## C# Solution

```csharp
public class Solution
{
    public int[][] IntervalIntersection(int[][] firstList, int[][] secondList)
    {
        var result = new List<int[]>();
        int i = 0, j = 0;

        while (i < firstList.Length && j < secondList.Length)
        {
            int lo = Math.Max(firstList[i][0], secondList[j][0]);
            int hi = Math.Min(firstList[i][1], secondList[j][1]);

            if (lo <= hi) result.Add(new[] { lo, hi });

            if (firstList[i][1] < secondList[j][1]) i++; else j++;
        }

        return result.ToArray();
    }
}
```

## Complexity

- **Time:** `O(n + m)`.
- **Space:** `O(n + m)` for the output.
