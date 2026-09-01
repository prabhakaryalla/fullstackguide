# 1426. Counting Elements

**Difficulty:** Easy
**Category:** Array, Hash Table, Counting

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an integer array `arr`, count the number of elements `x` such that `x + 1` also occurs in `arr`. If duplicates of `x` exist, each occurrence counts separately.

### Example

```
Input: arr = [1,2,3]
Output: 2
```

## Approach

Build a hash set of all values in `arr` for O(1) membership checks. Then iterate through the original array (preserving duplicates) and count every element `x` for which `x + 1` is present in the set.

## C# Solution

```csharp
public class Solution
{
    public int CountElements(int[] arr)
    {
        var set = new HashSet<int>(arr);
        int count = 0;

        foreach (var x in arr)
            if (set.Contains(x + 1))
                count++;

        return count;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the hash set.
