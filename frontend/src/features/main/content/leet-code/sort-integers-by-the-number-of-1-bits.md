# 1356. Sort Integers by The Number of 1 Bits

**Difficulty:** Easy
**Category:** Array, Bit Manipulation, Sorting, Counting

## Problem

Given an array `arr`, sort it in ascending order by the number of `1` bits in each element's binary representation, breaking ties by numeric value.

### Example

```
Input: arr = [0,1,2,3,4,5,6,7,8]
Output: [0,1,2,4,8,3,5,6,7]
```

## Approach

Sort the array using a comparator that first compares the population count (number of set bits) of each value, and falls back to comparing the values themselves when the bit counts are equal.

## C# Solution

```csharp
public class Solution
{
    public int[] SortByBits(int[] arr)
    {
        var sorted = arr.OrderBy(x => System.Numerics.BitOperations.PopCount((uint)x))
                        .ThenBy(x => x)
                        .ToArray();
        return sorted;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the sorted output.
