# 2044. Count Number of Maximum Bitwise-OR Subsets

**Difficulty:** Medium
**Category:** Array, Bit Manipulation, Backtracking, Enumeration

## Problem

Given an integer array `nums`, find the maximum possible bitwise **OR** of any non-empty subset of `nums`, and return *the number of different non-empty subsets that achieve this maximum OR value*.

## Approach

Since `nums.Length <= 16`, every subset can be represented as a bitmask from `1` to `2^n - 1`. Compute the OR value for every mask incrementally: `orValues[mask] = orValues[mask without its lowest set bit] | nums[index of that lowest bit]`. Track the maximum OR value seen. Finally, count how many masks achieve that maximum.

## C# Solution

```csharp
public class Solution
{
    public int CountMaxOrSubsets(int[] nums)
    {
        int n = nums.Length;
        int maxOr = 0;
        var orValues = new int[1 << n];

        for (int mask = 1; mask < (1 << n); mask++)
        {
            int lowBit = mask & (-mask);
            int idx = System.Numerics.BitOperations.TrailingZeroCount(lowBit);
            orValues[mask] = orValues[mask ^ lowBit] | nums[idx];
            maxOr = Math.Max(maxOr, orValues[mask]);
        }

        int count = 0;
        for (int mask = 1; mask < (1 << n); mask++)
            if (orValues[mask] == maxOr) count++;

        return count;
    }
}
```

## Complexity

- **Time:** `O(2^n)`.
- **Space:** `O(2^n)` for the OR-value table.
