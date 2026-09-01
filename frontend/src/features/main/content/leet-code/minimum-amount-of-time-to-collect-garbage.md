# 2391. Minimum Amount of Time to Collect Garbage

**Difficulty:** Medium
**Category:** Array, String, Prefix Sum

## Problem

You are given a 0-indexed array of strings `garbage` where `garbage[i]` represents the assortment of garbage at the `i`-th house. `garbage[i]` consists only of the characters 'M', 'P' and 'G' representing metal, paper and glass garbage respectively.

Picking up one unit of any type of garbage takes 1 minute. You are also given a 0-indexed integer array `travel` where `travel[i]` is the number of minutes needed to travel from house `i` to house `i + 1`.

There are three garbage trucks in the city, each responsible for picking up one type of garbage. Each garbage truck starts at house 0 and must visit each house in order. Only one garbage truck may be used at any given moment. While one truck is driving or picking up garbage, the other two trucks cannot do anything.

Return the minimum number of minutes needed to pick up all the garbage.

### Example

```
Input: garbage = ["G","P","GP","GG"], travel = [2,4,3]
Output: 21
Explanation:
- Paper truck: house 0 (1 min) + travel to 1 (2 min) + house 1 (1 min) = 4 min
- Glass truck: house 0 (1 min) + travel to 1 (2 min) + travel to 2 (4 min) + house 2 (2 min) + travel to 3 (3 min) + house 3 (2 min) = 14 min
- Metal truck: 0 min (no metal)
Total: 4 + 14 + 0 = 18 minutes
```

## Approach

For each garbage type, calculate the total pickup time (count of that character across all houses) plus the travel time to reach the last house containing that garbage type. Sum these values for all three types.

## C# Solution

```csharp
public class Solution
{
    public int GarbageCollection(string[] garbage, int[] travel)
    {
        int totalTime = 0;
        
        // Count all garbage pickup time
        foreach (string house in garbage)
        {
            totalTime += house.Length;
        }
        
        // Add travel time for each truck type
        totalTime += CalculateTravelTime('M', garbage, travel);
        totalTime += CalculateTravelTime('P', garbage, travel);
        totalTime += CalculateTravelTime('G', garbage, travel);
        
        return totalTime;
    }
    
    private int CalculateTravelTime(char type, string[] garbage, int[] travel)
    {
        int lastHouse = -1;
        
        // Find last house with this garbage type
        for (int i = 0; i < garbage.Length; i++)
        {
            if (garbage[i].Contains(type))
            {
                lastHouse = i;
            }
        }
        
        // Sum travel time to reach last house
        int travelTime = 0;
        for (int i = 0; i < lastHouse && i < travel.Length; i++)
        {
            travelTime += travel[i];
        }
        
        return travelTime;
    }
}
```

## Complexity

- **Time:** O(n * m) where n is the number of houses and m is the average length of garbage strings
- **Space:** O(1)
