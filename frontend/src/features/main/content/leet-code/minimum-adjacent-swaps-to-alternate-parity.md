# 3587. Minimum Adjacent Swaps to Alternate Parity

**Difficulty:** Medium
**Category:** Array, Greedy, Two Pointers

## Problem
You are given an integer array `nums`. Using only adjacent swaps, rearrange the array so that parities alternate (each element's parity differs from its neighbors'). Return the minimum number of adjacent swaps required, or `-1` if it is impossible.

## Approach
Rearranging into an alternating-parity array is impossible unless the counts of odd and even numbers differ by at most 1. When it is possible, there are up to two valid target patterns: odd numbers at even indices (`0, 2, 4, ...`) with even numbers at odd indices, or the reverse — try whichever patterns are count-compatible.

For a chosen pattern, adjacent swaps preserve the relative order of same-parity elements (like bubble sort), so the minimum number of swaps to move one parity group's elements (in their current relative order) into their target slots (`0, 2, 4, ...` or `1, 3, 5, ...`, matched in order) equals the sum of absolute differences between each element's current index and its assigned target index. Try both feasible patterns and return the smaller total.

## C# Solution

```csharp
public class Solution 
{
    public int MinSwaps(int[] nums)
    {
        var oddPositions = new List<int>();
        var evenPositions = new List<int>();
        for (int i = 0; i < nums.Length; i++)
        {
            if ((nums[i] & 1) == 1) oddPositions.Add(i);
            else evenPositions.Add(i);
        }

        int oddCount = oddPositions.Count;
        int evenCount = evenPositions.Count;

        if (Math.Abs(oddCount - evenCount) > 1) return -1;

        long best = long.MaxValue;

        // Pattern A: odd values occupy indices 0,2,4,... 
        if (oddCount == evenCount || oddCount == evenCount + 1)
        {
            best = Math.Min(best, Cost(oddPositions));
        }
        // Pattern B: even values occupy indices 0,2,4,...
        if (oddCount == evenCount || evenCount == oddCount + 1)
        {
            best = Math.Min(best, Cost(evenPositions));
        }

        return (int)best;
    }

    private long Cost(List<int> positions)
    {
        long cost = 0;
        int target = 0;
        foreach (var p in positions)
        {
            cost += Math.Abs(p - target);
            target += 2;
        }
        return cost;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
