# 3595. Once Twice

**Difficulty:** Easy
**Category:** Array, Bit Manipulation
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given an integer array `nums` where every element appears exactly twice except for two elements which appear exactly once, return the two elements that appear only once. You may return the answer in any order.

## Approach
XOR all numbers together; the result equals the XOR of the two unique numbers (all duplicated values cancel out). Find any set bit in this XOR result (e.g., the lowest set bit) — this bit differs between the two unique numbers. Partition all numbers into two groups based on whether that bit is set, and XOR each group separately. Each group's XOR yields one of the two unique numbers, since duplicates fall into the same group and cancel out.

## C# Solution

```csharp
public class Solution 
{
    public int[] SingleNumbers(int[] nums) 
    {
        int xorAll = 0;
        foreach (int n in nums)
            xorAll ^= n;

        int diffBit = xorAll & (-xorAll);

        int a = 0, b = 0;
        foreach (int n in nums)
        {
            if ((n & diffBit) != 0)
                a ^= n;
            else
                b ^= n;
        }

        return new int[] { a, b };
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
