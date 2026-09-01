# 3301. Maximize the Total Height of Unique Towers

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting

## Problem

You are given an array `maximumHeight`, where `maximumHeight[i]` denotes the maximum height allowed for the `i`-th tower. Assign each tower a positive integer height no greater than its maximum, such that all assigned heights are distinct, maximizing the total sum. Return the maximum possible total sum, or `-1` if it is impossible to assign a valid distinct positive height to every tower.

### Example

```
Input: maximumHeight = [2,3,4,3]
Output: 10
```

## Approach

Sort the maximum heights in descending order. Greedily assign each tower the largest height it can have without colliding with the previous tower's assigned height: `assigned = min(maximumHeight[i], previousAssigned - 1)`. If at any point the computed height is less than or equal to `0`, no valid assignment exists, so return `-1`. Otherwise accumulate the sum of assigned heights.

## C# Solution

```csharp
public class Solution 
{
    public long MaximumTotalSum(int[] maximumHeight) 
    {
        int[] heights = (int[])maximumHeight.Clone();
        Array.Sort(heights);
        Array.Reverse(heights);

        long total = 0;
        long prev = long.MaxValue;

        foreach (int h in heights) 
        {
            long assigned = Math.Min(h, prev - 1);
            if (assigned <= 0) return -1;

            total += assigned;
            prev = assigned;
        }

        return total;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
