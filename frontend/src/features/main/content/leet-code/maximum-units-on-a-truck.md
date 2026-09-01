# 1710. Maximum Units on a Truck

**Difficulty:** Easy
**Category:** Array, Greedy, Sorting

## Problem

You are given `boxTypes` where `boxTypes[i] = [numberOfBoxesi, numberOfUnitsPerBoxi]` and a truck with capacity `truckSize` (number of boxes it can hold). Return the maximum total number of units that can be put on the truck.

### Example

```
Input: boxTypes = [[1,3],[2,2],[3,1]], truckSize = 4
Output: 8
```

## Approach

Greedily load boxes with the highest units-per-box first: sort descending by units per box, then fill the truck's remaining capacity from each box type in that order.

## C# Solution

```csharp
public class Solution
{
    public int MaximumUnits(int[][] boxTypes, int truckSize)
    {
        Array.Sort(boxTypes, (a, b) => b[1] - a[1]);

        int total = 0;
        foreach (var box in boxTypes)
        {
            int take = Math.Min(box[0], truckSize);
            total += take * box[1];
            truckSize -= take;
            if (truckSize == 0) break;
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(1)` (excluding the sort).
