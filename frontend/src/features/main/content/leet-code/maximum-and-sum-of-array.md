# 2172. Maximum AND Sum of Array

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Bit Manipulation, Bitmask

## Problem

You are given an integer array `nums` and an integer `numSlots`. There are `numSlots` slots numbered from 1 to `numSlots`.

Place all elements of `nums` into the slots such that each slot can contain at most two elements. The AND sum is the sum of `nums[i] AND j` for element `i` in slot `j`.

Return the maximum possible AND sum.

### Example

```
Input: nums = [1,2,3,4,5,6], numSlots = 3
Output: 9
Explanation: Place [1,2] in slot 1, [3,4] in slot 2, [5,6] in slot 3.
Sum = (1&1)+(2&1)+(3&2)+(4&2)+(5&3)+(6&3) = 1+0+2+0+1+2 = 6? No.
Let me recalculate: (1&1)+(2&1)=1+0=1, (3&2)+(4&2)=2+0=2, (5&3)+(6&3)=1+2=3, total=6
```

## Approach

Use bitmask DP where the state represents how many elements are in each slot (base-3 encoding since each slot can have 0, 1, or 2 elements).

`dp[mask]` = maximum AND sum when placing elements according to the mask configuration.

## C# Solution

```csharp
public class Solution
{
    public int MaximumANDSum(int[] nums, int numSlots)
    {
        int n = nums.Length;
        int maxMask = (int)Math.Pow(3, numSlots);
        var dp = new int[maxMask];
        Array.Fill(dp, -1);
        dp[0] = 0;
        
        for (int mask = 0; mask < maxMask; mask++)
        {
            if (dp[mask] == -1) continue;
            
            int count = CountElements(mask, numSlots);
            if (count >= n) continue;
            
            // Try placing next element in each slot
            for (int slot = 0; slot < numSlots; slot++)
            {
                int slotCount = GetSlotCount(mask, slot, numSlots);
                if (slotCount < 2)
                {
                    int newMask = SetSlotCount(mask, slot, slotCount + 1, numSlots);
                    int andValue = nums[count] & (slot + 1);
                    dp[newMask] = Math.Max(dp[newMask], dp[mask] + andValue);
                }
            }
        }
        
        int result = 0;
        for (int mask = 0; mask < maxMask; mask++)
        {
            if (CountElements(mask, numSlots) == n)
                result = Math.Max(result, dp[mask]);
        }
        
        return result;
    }
    
    private int CountElements(int mask, int numSlots)
    {
        int count = 0;
        for (int i = 0; i < numSlots; i++)
        {
            count += GetSlotCount(mask, i, numSlots);
        }
        return count;
    }
    
    private int GetSlotCount(int mask, int slot, int numSlots)
    {
        int divisor = (int)Math.Pow(3, slot);
        return (mask / divisor) % 3;
    }
    
    private int SetSlotCount(int mask, int slot, int count, int numSlots)
    {
        int divisor = (int)Math.Pow(3, slot);
        int oldCount = GetSlotCount(mask, slot, numSlots);
        return mask - oldCount * divisor + count * divisor;
    }
}
```

## Complexity

- **Time:** O(3^numSlots * n * numSlots)
- **Space:** O(3^numSlots)
