# 1865. Finding Pairs With a Certain Sum

**Difficulty:** Medium
**Category:** Design, Hash Table

## Problem

Design a class initialized with two integer arrays `nums1` and `nums2` that supports `Add(index, val)` (adds `val` to `nums2[index]`) and `Count(tot)` (returns the number of pairs `(i, j)` such that `nums1[i] + nums2[j] == tot`).

### Example

```
Input: ["FindSumPairs","count","add","count"], [[[1,1,2,2,2,3],[1,4,5,2,5,4]],[7],[3,2],[8]]
Output: [null,8,null,2]
```

## Approach

Since `nums1` is only ever read (per the problem's constraints, updates happen on `nums2`), keep a frequency map of `nums2`'s values. `Add` adjusts the map by decrementing the old value's count and incrementing the new value's count after applying the delta. `Count(tot)` iterates `nums1` (kept small relative to `nums2` per constraints) and, for each element `a`, looks up how many `nums2` entries equal `tot - a`, summing these lookups.

## C# Solution

```csharp
public class FindSumPairs
{
    private readonly int[] _nums1;
    private readonly int[] _nums2;
    private readonly Dictionary<int, int> _count2 = new();

    public FindSumPairs(int[] nums1, int[] nums2)
    {
        _nums1 = nums1;
        _nums2 = nums2;
        foreach (int n in nums2) _count2[n] = _count2.GetValueOrDefault(n) + 1;
    }

    public void Add(int index, int val)
    {
        _count2[_nums2[index]]--;
        _nums2[index] += val;
        _count2[_nums2[index]] = _count2.GetValueOrDefault(_nums2[index]) + 1;
    }

    public int Count(int tot)
    {
        int result = 0;
        foreach (int a in _nums1)
        {
            result += _count2.GetValueOrDefault(tot - a);
        }
        return result;
    }
}
```

## Complexity

- **Time:** `O(1)` for `Add`; `O(|nums1|)` for `Count`.
- **Space:** `O(|nums2|)` for the frequency map.
