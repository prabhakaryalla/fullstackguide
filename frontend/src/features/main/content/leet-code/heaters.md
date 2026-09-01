# 475. Heaters

**Difficulty:** Medium
**Category:** Array, Binary Search, Two Pointers, Sorting

## Problem

Given the positions of `houses` and `heaters` on a number line, and given that each heater has a fixed radius of warmth, return the minimum radius standard so that every house is covered by at least one heater.

### Example

```
Input: houses = [1,2,3], heaters = [2]
Output: 1
```

### Constraints

- `1 <= houses.length, heaters.length <= 3 * 10^4`
- `1 <= houses[i], heaters[i] <= 10^9`

## Approach

Sort both arrays. For each house, binary search the sorted heaters for the insertion point, then check the distances to the nearest heater on the left and on the right of that point, taking the smaller of the two as this house's required radius. The overall answer is the maximum of these per-house minimum radii, since every house must be covered.

## C# Solution

```csharp
public class Solution
{
    public int FindRadius(int[] houses, int[] heaters)
    {
        Array.Sort(houses);
        Array.Sort(heaters);

        int radius = 0;

        foreach (var house in houses)
        {
            int index = LowerBound(heaters, house);
            int distLeft = index > 0 ? house - heaters[index - 1] : int.MaxValue;
            int distRight = index < heaters.Length ? heaters[index] - house : int.MaxValue;

            radius = Math.Max(radius, Math.Min(distLeft, distRight));
        }

        return radius;
    }

    private int LowerBound(int[] heaters, int value)
    {
        int lo = 0, hi = heaters.Length;
        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (heaters[mid] < value) lo = mid + 1;
            else hi = mid;
        }

        return lo;
    }
}
```

## Complexity

- **Time:** `O((h + m) log(h + m))`.
- **Space:** `O(1)` extra.
