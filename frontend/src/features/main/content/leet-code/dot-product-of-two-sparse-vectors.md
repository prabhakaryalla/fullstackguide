# 1570. Dot Product of Two Sparse Vectors

**Difficulty:** Medium
**Category:** Array, Hash Table, Two Pointers, Design

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a vector `nums` with many zero entries (a sparse vector), design a class that stores it efficiently and supports computing the dot product against another sparse vector of the same length.

### Example

```
Input: v1 = [1,0,0,2,3], v2 = [0,3,0,4,0]
Output: 8
```

## Approach

Instead of storing every element, store only the `(index, value)` pairs for non-zero entries. To compute the dot product between two such sparse vectors, use two pointers walking each vector's non-zero-entry list simultaneously: advance whichever pointer has the smaller index, and whenever both pointers reference the same index, multiply the values together and add to the running total, then advance both.

## C# Solution

```csharp
public class SparseVector
{
    private readonly List<(int Index, int Value)> entries = new List<(int, int)>();

    public SparseVector(int[] nums)
    {
        for (int i = 0; i < nums.Length; i++)
        {
            if (nums[i] != 0)
            {
                entries.Add((i, nums[i]));
            }
        }
    }

    public int DotProduct(SparseVector vec)
    {
        int i = 0, j = 0;
        int result = 0;

        while (i < entries.Count && j < vec.entries.Count)
        {
            if (entries[i].Index == vec.entries[j].Index)
            {
                result += entries[i].Value * vec.entries[j].Value;
                i++;
                j++;
            }
            else if (entries[i].Index < vec.entries[j].Index)
            {
                i++;
            }
            else
            {
                j++;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n + m)` for the dot product, where `n` and `m` are the number of non-zero entries in each vector; `O(n)` to construct.
- **Space:** `O(n)` to store the non-zero entries.
