# 2162. Minimum Cost to Set Cooking Time

**Difficulty:** Medium
**Category:** Math, Enumeration

## Problem

A microwave oven supports cooking times up to 99 minutes and 99 seconds (displayed as "MMSS"). You can set the time by pressing buttons for digits (cost = `targetSeconds`) and startButton (cost = `startCost`).

Given `startAt` (initial display), `moveCost`, `pushCost`, and `targetSeconds`, return the minimum cost to set the cooking time to `targetSeconds` seconds.

### Example

```
Input: startAt = 1, moveCost = 2, pushCost = 1, targetSeconds = 600
Output: 6
Explanation: 600 seconds = 10:00. From "1", move to "1", push "0", push "0", push "0", push startButton.
```

## Approach

Convert target seconds to possible MM:SS representations (there may be multiple valid ones, e.g., 100 seconds = 1:40 or 0:100, but 0:100 is invalid).

For each valid representation, calculate the cost of entering it from the current display position, tracking minimum cost.

## C# Solution

```csharp
public class Solution
{
    public int MinCostSetTime(int startAt, int moveCost, int pushCost, int targetSeconds)
    {
        int minCost = int.MaxValue;
        
        // Try different MM:SS combinations
        for (int minutes = 0; minutes <= 99; minutes++)
        {
            int seconds = targetSeconds - minutes * 60;
            
            if (seconds < 0 || seconds > 99)
                continue;
            
            string time = (minutes == 0 ? "" : minutes.ToString()) + 
                          (seconds < 10 && minutes > 0 ? "0" : "") + 
                          seconds.ToString();
            
            if (time.Length > 4)
                continue;
            
            int cost = CalculateCost(time, startAt, moveCost, pushCost);
            minCost = Math.Min(minCost, cost);
        }
        
        return minCost;
    }
    
    private int CalculateCost(string time, int currentPos, int moveCost, int pushCost)
    {
        int cost = 0;
        
        foreach (char c in time)
        {
            int digit = c - '0';
            
            if (digit != currentPos)
            {
                cost += moveCost;
                currentPos = digit;
            }
            
            cost += pushCost;
        }
        
        return cost;
    }
}
```

## Complexity

- **Time:** O(1) - bounded by at most 100 minute values
- **Space:** O(1)
