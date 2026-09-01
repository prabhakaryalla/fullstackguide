# 2274. Maximum Consecutive Floors Without Special Floors

**Difficulty:** Medium
**Category:** Array, Sorting

## Problem

You are given two integers `bottom` and `top` representing a range of floor numbers, and an integer array `special` representing special floor numbers in that range. Return the maximum number of consecutive floors without a special floor.

### Example

```
Input: bottom = 2, top = 9, special = [4,6]
Output: 3
Explanation: Floors 7, 8, 9 are consecutive without special floors
```

## Approach

Sort the special floors. Check the gap from bottom to the first special floor, between consecutive special floors, and from the last special floor to top. Return the maximum gap.

## C# Solution

```csharp
public class Solution
{
    public int MaxConsecutive(int bottom, int top, int[] special)
    {
        Array.Sort(special);
        int maxGap = special[0] - bottom;
        
        for (int i = 1; i < special.Length; i++)
        {
            maxGap = Math.Max(maxGap, special[i] - special[i - 1] - 1);
        }
        
        maxGap = Math.Max(maxGap, top - special[special.Length - 1]);
        return maxGap;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(1)
