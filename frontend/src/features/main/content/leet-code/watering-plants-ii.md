# 2105. Watering Plants II

**Difficulty:** Medium
**Category:** Array, Two Pointers, Simulation

## Problem

Alice and Bob water `n` plants from opposite ends of a row. Alice starts at plant 0 moving right, Bob starts at plant n-1 moving left. Each carries a can with limited capacity. When a can is insufficient, they refill at their starting position. Return the minimum number of refills needed by both.

### Example

```
Input: plants = [2,2,3,3], capacityA = 5, capacityB = 5
Output: 1
Explanation: Alice waters plants 0,1 with one fill. Bob waters plants 3,2 needing 1 refill.
```

## Approach

Use two pointers from both ends. Track remaining water for each person. When they meet at the same plant, the one with more capacity waters it. Count refills when capacity becomes insufficient.

## C# Solution

```csharp
public class Solution
{
    public int MinimumRefill(int[] plants, int capacityA, int capacityB)
    {
        int left = 0, right = plants.Length - 1;
        int waterA = capacityA, waterB = capacityB;
        int refills = 0;
        
        while (left < right)
        {
            if (waterA < plants[left])
            {
                refills++;
                waterA = capacityA;
            }
            waterA -= plants[left++];
            
            if (waterB < plants[right])
            {
                refills++;
                waterB = capacityB;
            }
            waterB -= plants[right--];
        }
        
        if (left == right && Math.Max(waterA, waterB) < plants[left])
            refills++;
        
        return refills;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
