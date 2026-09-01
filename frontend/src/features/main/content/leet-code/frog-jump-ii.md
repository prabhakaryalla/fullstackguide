# 2498. Frog Jump II

**Difficulty:** Medium
**Category:** Array, Binary Search, Greedy

## Problem

You are given a 0-indexed integer array `stones` sorted in strictly increasing order representing the positions of stones on a river.

A frog initially on the first stone wants to travel to the last stone and then return to the first stone. On each jump, the frog can jump to any stone in either direction.

The frog's cost is the maximum distance it jumps during its entire journey. Return the minimum possible cost.

### Example

```
Input: stones = [0,2,5,6,7]
Output: 5
Explanation: Path: 0→5→7 (return) 7→2→0
Max jump: 5 (from 0 to 5)

Input: stones = [0,3,9]
Output: 9
```

## Approach

Use binary search on the answer (maximum jump distance):
- For a given max jump distance, check if the frog can complete a round trip
- The key insight: if we can go from 0 to end with max jump d, we need to check if we can return with the same constraint
- Use a greedy strategy to jump as far as possible within the constraint

## C# Solution

```csharp
public class Solution
{
    public int MaxJump(int[] stones)
    {
        int n = stones.Length;
        if (n <= 2) return stones[n - 1] - stones[0];
        
        int maxCost = 0;
        
        for (int i = 0; i < n - 2; i++)
        {
            maxCost = Math.Max(maxCost, stones[i + 2] - stones[i]);
        }
        
        return maxCost;
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of stones
- **Space:** O(1)
