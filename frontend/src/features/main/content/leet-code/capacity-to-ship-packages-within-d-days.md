# 1011. Capacity To Ship Packages Within D Days

**Difficulty:** Medium
**Category:** Array, Binary Search

## Problem

A conveyor belt has packages with `weights[i]` that must be shipped within `days` days, in order, without splitting a package's weight. Each day the ship carries as many packages (in order) as fit under its weight capacity. Return the least weight capacity that lets all packages ship within `days` days.

### Example

```
Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5
Output: 15
```

## Approach

Binary search the answer: the minimum feasible capacity is at least the heaviest single package (`max(weights)`) and at most the sum of all weights (ship everything in one day). For a candidate capacity, greedily simulate loading packages in order, starting a new day whenever adding the next package would exceed capacity, and count the days used. Shrink the search range toward the smallest capacity for which the simulated day count is `<= days`.

## C# Solution

```csharp
public class Solution
{
    public int ShipWithinDays(int[] weights, int days)
    {
        int low = weights.Max();
        int high = weights.Sum();

        while (low < high)
        {
            int mid = low + (high - low) / 2;
            if (CanShip(weights, days, mid)) high = mid;
            else low = mid + 1;
        }

        return low;
    }

    private bool CanShip(int[] weights, int days, int capacity)
    {
        int daysNeeded = 1;
        int currentLoad = 0;

        foreach (var w in weights)
        {
            if (currentLoad + w > capacity)
            {
                daysNeeded++;
                currentLoad = 0;
            }
            currentLoad += w;
        }

        return daysNeeded <= days;
    }
}
```

## Complexity

- **Time:** `O(n log(sum - max))` — binary search over capacity, `O(n)` simulation per check.
- **Space:** `O(1)`.
