# 1854. Maximum Population Year

**Difficulty:** Easy
**Category:** Array, Prefix Sum, Counting

## Problem

Given `logs[i] = [birth, death]` for a set of people (each alive during `[birth, death - 1]` inclusive), return the earliest year with the maximum population.

### Example

```
Input: logs = [[1993,1999],[2000,2010]]
Output: 1993
```

## Approach

Use a difference array over the year range `[1950, 2050]`: increment at each `birth` year and decrement at each `death` year (since the person is no longer alive starting at `death`). Sweep the prefix sum across the years in order, tracking the running population and the best (year, population) seen so far; scanning left to right naturally prefers the earliest year on ties.

## C# Solution

```csharp
public class Solution
{
    public int MaximumPopulation(int[][] logs)
    {
        var delta = new int[2051];

        foreach (var log in logs)
        {
            delta[log[0]]++;
            delta[log[1]]--;
        }

        int bestYear = 1950;
        int bestPopulation = 0;
        int population = 0;

        for (int year = 1950; year <= 2050; year++)
        {
            population += delta[year];
            if (population > bestPopulation)
            {
                bestPopulation = population;
                bestYear = year;
            }
        }

        return bestYear;
    }
}
```

## Complexity

- **Time:** `O(n + Y)` where `Y` is the fixed year range (101).
- **Space:** `O(Y)` for the difference array.
