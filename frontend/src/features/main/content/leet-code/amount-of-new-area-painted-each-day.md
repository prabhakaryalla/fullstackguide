# 2158. Amount of New Area Painted Each Day

**Difficulty:** Hard
**Category:** Array, Segment Tree, Ordered Set
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are painting a long wall represented as a number line. Each day you paint a segment `[start, end)`. Return an array where the `i-th` element is the amount of new (unpainted) area painted on day `i`.

### Example

```
Input: paint = [[1,4],[4,7],[5,8]]
Output: [3,3,1]
Explanation: 
- Day 0: paint [1,4) -> 3 units
- Day 1: paint [4,7) -> 3 units
- Day 2: paint [5,8), but [5,7) already painted -> 1 unit
```

## Approach

Track painted intervals using a data structure that supports interval merging. For each new paint operation:
1. Find all existing intervals that overlap with the new one
2. Calculate the new painted area (total new range minus already painted parts)
3. Merge overlapping intervals

Can use a TreeMap/SortedDictionary to maintain intervals sorted by start position.

## C# Solution

```csharp
public class Solution
{
    public int[] AmountPainted(int[][] paint)
    {
        var painted = new SortedDictionary<int, int>(); // start -> end
        var result = new int[paint.Length];
        
        for (int i = 0; i < paint.Length; i++)
        {
            int start = paint[i][0];
            int end = paint[i][1];
            int newArea = 0;
            
            var toRemove = new List<int>();
            int mergedStart = start;
            int mergedEnd = end;
            
            foreach (var kvp in painted)
            {
                if (kvp.Key >= end) break;
                if (kvp.Value <= start) continue;
                
                // Overlapping interval found
                toRemove.Add(kvp.Key);
                mergedStart = Math.Min(mergedStart, kvp.Key);
                mergedEnd = Math.Max(mergedEnd, kvp.Value);
            }
            
            // Calculate new painted area
            newArea = end - start;
            foreach (var key in toRemove)
            {
                int existingStart = Math.Max(key, start);
                int existingEnd = Math.Min(painted[key], end);
                newArea -= Math.Max(0, existingEnd - existingStart);
                painted.Remove(key);
            }
            
            painted[mergedStart] = mergedEnd;
            result[i] = newArea;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n * m) where n is number of paint operations and m is number of intervals
- **Space:** O(m) for storing intervals
