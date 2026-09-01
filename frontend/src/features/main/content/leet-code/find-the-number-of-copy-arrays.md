# 3468. Find the Number of Copy Arrays

**Difficulty:** Medium
**Category:** Array, Math

## Problem

You are given an integer array `original` of length `n` and a 2D array `bounds` of length `n`, where `bounds[i] = [low_i, high_i]`. An array `derived` of length `n` is called a **copy array** of `original` if it satisfies both: `derived[i] - derived[i - 1] == original[i] - original[i - 1]` for every `i` from `1` to `n - 1`, and `low_i <= derived[i] <= high_i` for every valid `i`. Return the number of distinct copy arrays.

### Example

`original = [1,2,3,4], bounds = [[1,6],[2,7],[3,8],[4,9]]` → any copy array is just `original` shifted by a constant `c`, so this counts how many shifts `c` keep every shifted value inside its bound.

## Approach

Because consecutive differences must match `original` exactly, every valid `derived` array is simply `original[i] + c` for some constant shift `c`. For each index `i`, the bound `[low_i, high_i]` restricts `c` to the range `[low_i - original[i], high_i - original[i]]`. Intersecting these ranges across all indices gives the overall feasible range for `c`; the answer is the size of that range (or `0` if it's empty).

## C# Solution

```csharp
public class Solution 
{
    public int CountArrays(int[] original, int[][] bounds) 
    {
        long lo = long.MinValue;
        long hi = long.MaxValue;

        for (int i = 0; i < original.Length; i++)
        {
            lo = Math.Max(lo, bounds[i][0] - (long)original[i]);
            hi = Math.Min(hi, bounds[i][1] - (long)original[i]);
        }

        return (int)Math.Max(0, hi - lo + 1);
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
