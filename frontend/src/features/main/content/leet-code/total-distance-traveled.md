# 2739. Total Distance Traveled

**Difficulty:** Easy
**Category:** Math, Simulation

## Problem

A truck has two fuel tanks. You are given two integers, `mainTank` representing the fuel present in the main tank in liters and `additionalTank` representing the fuel present in the additional tank in liters.

The truck has a mileage of 10 km per liter. Whenever 5 liters of fuel get used up in the main tank, if the additional tank has at least 1 liter of fuel, 1 liter of fuel will be transferred from the additional tank to the main tank.

Return the maximum distance which can be traveled.

### Example

```
Input: mainTank = 5, additionalTank = 10
Output: 60
Explanation: After using 5L, transfer 1L. Now main=1, additional=9. Continue...
```

## Approach

Simulate the process. For every 5 liters consumed from the main tank, transfer 1 liter from additional (if available). Continue until main tank is empty.

## C# Solution

```csharp
public class Solution
{
    public int DistanceTraveled(int mainTank, int additionalTank)
    {
        int distance = 0;
        
        while (mainTank >= 5)
        {
            distance += 50; // 5 liters * 10 km/liter
            mainTank -= 5;
            
            if (additionalTank > 0)
            {
                mainTank += 1;
                additionalTank -= 1;
            }
        }
        
        distance += mainTank * 10;
        
        return distance;
    }
}
```

## Complexity

- **Time:** O(mainTank)
- **Space:** O(1)
