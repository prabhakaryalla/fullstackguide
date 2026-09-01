# 1460. Make Two Arrays Equal by Reversing Sub-arrays

**Difficulty:** Easy
**Category:** Array, Hash Table, Sorting

## Problem

Given two integer arrays `target` and `arr` of the same length, determine whether `arr` can be transformed into `target` using any number of subarray reversals.

### Example

```
Input: target = [1,2,3,4], arr = [2,4,1,3]
Output: true
```

## Approach

Subarray reversals can rearrange elements into any permutation of the array (repeated adjacent swaps can be simulated via short reversals), so the transformation is possible if and only if both arrays contain exactly the same multiset of values. Sort both arrays and compare them element by element.

## C# Solution

```csharp
public class Solution
{
    public bool CanBeEqual(int[] target, int[] arr)
    {
        var t = (int[])target.Clone();
        var a = (int[])arr.Clone();
        Array.Sort(t);
        Array.Sort(a);

        return t.SequenceEqual(a);
    }
}
```

## Complexity

- **Time:** `O(n log n)` for sorting.
- **Space:** `O(n)` for the sorted copies.
