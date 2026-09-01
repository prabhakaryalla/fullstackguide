# 1762. Buildings With an Ocean View

**Difficulty:** Medium
**Category:** Array, Stack, Monotonic Stack

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array `heights` representing buildings in a row (ocean to the right), a building has an ocean view if all buildings to its right are strictly shorter. Return the indices of buildings with an ocean view, sorted in increasing order.

### Example

```
Input: heights = [4,2,3,1]
Output: [0,2,3]
```

## Approach

Scan from right to left while tracking the tallest building seen so far. A building has an ocean view exactly when it is taller than everything seen to its right (i.e., taller than the running maximum), so add its index and update the maximum whenever this holds.

## C# Solution

```csharp
public class Solution
{
    public int[] FindBuildings(int[] heights)
    {
        var result = new List<int>();
        int maxSoFar = 0;

        for (int i = heights.Length - 1; i >= 0; i--)
        {
            if (heights[i] > maxSoFar)
            {
                result.Add(i);
                maxSoFar = heights[i];
            }
        }

        result.Reverse();
        return result.ToArray();
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the output.
