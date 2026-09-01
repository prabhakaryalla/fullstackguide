# 1578. Minimum Time to Make Rope Colorful

**Difficulty:** Medium
**Category:** Array, String, Greedy

## Problem

Given a string `colors` (each character representing a balloon's color) and an integer array `neededTime` (the time to remove each balloon), remove the minimum total time's worth of balloons so that no two adjacent balloons share the same color.

### Example

```
Input: colors = "abaac", neededTime = [1,2,3,4,5]
Output: 3
```

## Approach

Scan through consecutive runs of the same color. Within each run, keep the balloon with the maximum removal time (so it isn't removed) and sum the removal times of all the others in that run — that sum is the cost added for this run. Summing this over every run of repeated colors gives the minimum total time.

## C# Solution

```csharp
public class Solution
{
    public int MinCost(string colors, int[] neededTime)
    {
        int n = colors.Length;
        int totalCost = 0;
        int i = 0;

        while (i < n)
        {
            int j = i;
            int sum = 0;
            int maxTime = 0;

            while (j < n && colors[j] == colors[i])
            {
                sum += neededTime[j];
                maxTime = Math.Max(maxTime, neededTime[j]);
                j++;
            }

            totalCost += sum - maxTime;
            i = j;
        }

        return totalCost;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over the string, grouping consecutive runs.
- **Space:** `O(1)`.
