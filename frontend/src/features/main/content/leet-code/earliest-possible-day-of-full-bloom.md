# 2136. Earliest Possible Day of Full Bloom

**Difficulty:** Hard
**Category:** Array, Greedy, Sorting

## Problem

You are given two integer arrays `plantTime` and `growTime`, both of length `n`. For the `i-th` seed:
- `plantTime[i]` is the number of full days it takes to plant
- `growTime[i]` is the number of full days it takes to grow after being completely planted

You can plant seeds in any order, but you can only plant one seed at a time. Seeds start growing as soon as they're fully planted.

Return the earliest possible day where all seeds are blooming.

### Example

```
Input: plantTime = [1,4,3], growTime = [2,3,1]
Output: 9
Explanation: Plant seeds in order 1,0,2. Day 9 is when all have bloomed.
```

## Approach

This is a greedy scheduling problem. The key insight is to plant seeds with longer grow times first. Once a seed is planted, it grows independently, so we want seeds with longer grow times to start growing earlier.

Sort seeds by grow time in descending order, then plant them sequentially:
1. Seeds with longer grow time should be planted first
2. Track cumulative plant time and calculate bloom day for each seed
3. Maximum bloom day across all seeds is the answer

## C# Solution

```csharp
public class Solution
{
    public int EarliestFullBloom(int[] plantTime, int[] growTime)
    {
        int n = plantTime.Length;
        var seeds = new (int plant, int grow)[n];
        
        for (int i = 0; i < n; i++)
        {
            seeds[i] = (plantTime[i], growTime[i]);
        }
        
        // Sort by grow time descending
        Array.Sort(seeds, (a, b) => b.grow.CompareTo(a.grow));
        
        int currentDay = 0;
        int maxBloomDay = 0;
        
        foreach (var seed in seeds)
        {
            currentDay += seed.plant;
            int bloomDay = currentDay + seed.grow;
            maxBloomDay = Math.Max(maxBloomDay, bloomDay);
        }
        
        return maxBloomDay;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(n) for the seed array
