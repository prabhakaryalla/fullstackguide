# 3011. Find if Array Can Be Sorted

**Difficulty:** Medium
**Category:** Array, Bit Manipulation, Sorting

## Problem

You are given a 0-indexed array of positive integers `nums`. In one operation you may swap two **adjacent** elements if they have the **same number of set bits** (1s) in their binary representation. Return `true` if `nums` can be sorted in non-decreasing order using any number of such operations, otherwise `false`.

### Example

```
Input: nums = [8,4,2,30,15]
Output: true
Explanation: 8, 4, 2 all have exactly one set bit and can be freely reordered among themselves via
adjacent swaps; 30 and 15 aren't adjacent to anything with a matching popcount, but the array already
allows a valid ordering: [2,4,8,15,30].
```

## Approach

Group the array into maximal contiguous runs where every element has the same popcount. Within a run, adjacent swaps let you achieve **any** permutation of that run (it behaves like bubble sort restricted to equal-popcount neighbors), so only the run's min/max values matter, not the internal order.

Since elements can never cross between different runs, the array can be sorted **only if** every run's maximum is less than or equal to the next run's minimum. Track the previous run's max and the current run's min/max in one linear scan.

## C# Solution

```csharp
public class Solution {
    public bool CanSortArray(int[] nums) {
        int prevSetBits = 0;
        int prevMax = int.MinValue;
        int currMax = int.MinValue;
        int currMin = int.MaxValue;

        foreach (int num in nums) {
            int setBits = System.Numerics.BitOperations.PopCount((uint)num);
            if (setBits != prevSetBits) {
                // Starting a new run: the previous run's max must not exceed this run's min so far.
                if (prevMax > currMin)
                    return false;
                prevSetBits = setBits;
                prevMax = currMax;
                currMax = num;
                currMin = num;
            } else {
                currMax = Math.Max(currMax, num);
                currMin = Math.Min(currMin, num);
            }
        }

        return prevMax <= currMin;
    }
}
```

## Complexity

- Time: O(n) — one pass, with O(1) popcount per element.
- Space: O(1).
