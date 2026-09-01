# 2147. Number of Ways to Divide a Long Corridor

**Difficulty:** Hard
**Category:** String, Dynamic Programming, Math

## Problem

Along a long corridor, there are seats and plants arranged in a row. You are given a string `corridor` consisting of 'S' (seat) and 'P' (plant).

Divide the corridor into non-overlapping sections where each section has exactly 2 seats. Return the number of ways to divide the corridor modulo 10^9 + 7.

### Example

```
Input: corridor = "SSPPSPS"
Output: 3
Explanation: Divide between: SS|PP|SPS, SS|PPSPS, or SSPPS|PS
```

## Approach

Count the total number of seats. If the count is not even or is 0, return 0. Otherwise, find groups of 2 seats and count the number of plants between consecutive groups. The number of ways to divide is the product of (plants_between + 1) for each gap.

Key insight: Between each pair of seat-groups, we can place a divider after any of the plants, giving us (num_plants + 1) choices.

## C# Solution

```csharp
public class Solution
{
    public int NumberOfWays(string corridor)
    {
        const int MOD = 1_000_000_007;
        
        var seatIndices = new List<int>();
        for (int i = 0; i < corridor.Length; i++)
        {
            if (corridor[i] == 'S')
                seatIndices.Add(i);
        }
        
        int seatCount = seatIndices.Count;
        
        // Need even number of seats and at least 2
        if (seatCount == 0 || seatCount % 2 != 0)
            return 0;
        
        if (seatCount == 2)
            return 1;
        
        long result = 1;
        
        // Count plants between each pair of seat-groups
        for (int i = 1; i < seatCount / 2; i++)
        {
            int endOfPrevGroup = seatIndices[2 * i - 1];
            int startOfNextGroup = seatIndices[2 * i];
            int plantsInBetween = startOfNextGroup - endOfPrevGroup;
            
            result = (result * plantsInBetween) % MOD;
        }
        
        return (int)result;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of corridor
- **Space:** O(s) where s is the number of seats
