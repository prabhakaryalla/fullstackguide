# 3492. Maximum Containers on a Ship

**Difficulty:** Easy
**Category:** Math, Greedy

## Problem

A ship is an `n x n` grid, where each cell can hold exactly one container, and every container has the same weight `w`. The ship's total weight capacity is `maxWeight`. Return the maximum number of containers that can be loaded onto the ship.

### Example

```
Input: n = 2, w = 3, maxWeight = 15
Output: 4
Explanation: The ship has 2 x 2 = 4 cells. The maximum containers by weight is 15 / 3 = 5, but only 4 cells exist, so the answer is 4.

Input: n = 3, w = 5, maxWeight = 20
Output: 4
Explanation: There are 9 cells, but only 20 / 5 = 4 containers fit within the weight limit.
```

## Approach

The number of containers is limited by two independent constraints: the number of available cells (`n * n`) and how many containers of weight `w` fit within `maxWeight` (`maxWeight / w`, integer division). The answer is the minimum of the two.

## C# Solution

```csharp
public class Solution 
{
    public int MaxContainers(int n, int w, int maxWeight) 
    {
        long capacityByWeight = maxWeight / w;
        long totalCells = (long)n * n;
        return (int)Math.Min(capacityByWeight, totalCells);
    }
}
```

## Complexity

- **Time:** O(1).
- **Space:** O(1).
