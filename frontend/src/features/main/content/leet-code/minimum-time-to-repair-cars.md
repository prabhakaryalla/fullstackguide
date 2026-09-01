# 2594. Minimum Time to Repair Cars

**Difficulty:** Medium
**Category:** Array, Binary Search

## Problem

You are given an integer array `ranks` representing the ranks of mechanics and an integer `cars` representing the total number of cars waiting in the garage to be repaired.

The ith mechanic takes `ranks[i] * n * n` minutes to repair the nth car. All mechanics can work simultaneously.

Return the minimum time needed to repair all the cars.

### Example

```
Input: ranks = [4,2,3,1], cars = 10
Output: 16
Explanation: 
Mechanic 0: repairs 2 cars (4*1 + 4*4 = 20 minutes)
Mechanic 1: repairs 2 cars (2*1 + 2*4 = 10 minutes)
Mechanic 2: repairs 2 cars (3*1 + 3*4 = 15 minutes)
Mechanic 3: repairs 4 cars (1*1 + 1*4 + 1*9 + 1*16 = 30 minutes)
Total: 10 cars, max time = 16 minutes
```

## Approach

Use binary search on the answer. For a given time limit, calculate how many cars each mechanic can repair: if a mechanic has rank `r`, they can repair `floor(sqrt(time / r))` cars in that time. Sum up all cars and check if it's at least the required number.

## C# Solution

```csharp
public class Solution
{
    public long RepairCars(int[] ranks, int cars)
    {
        long left = 1;
        long right = (long)ranks.Min() * cars * cars;
        
        while (left < right)
        {
            long mid = left + (right - left) / 2;
            
            if (CanRepair(ranks, cars, mid))
            {
                right = mid;
            }
            else
            {
                left = mid + 1;
            }
        }
        
        return left;
    }
    
    private bool CanRepair(int[] ranks, int cars, long time)
    {
        long totalCars = 0;
        
        foreach (int rank in ranks)
        {
            long maxCars = (long)Math.Sqrt(time / rank);
            totalCars += maxCars;
            
            if (totalCars >= cars) return true;
        }
        
        return totalCars >= cars;
    }
}
```

## Complexity

- **Time:** O(n * log(min(ranks) * cars^2))
- **Space:** O(1)
