# 2080. Range Frequency Queries

**Difficulty:** Medium
**Category:** Array, Hash Table, Binary Search, Design

## Problem

Design a data structure that answers range frequency queries over a fixed array. Implement the `RangeFreqQuery` class:

- `RangeFreqQuery(int[] arr)` — initializes the object with the given array.
- `Query(int left, int right, int value)` — returns the frequency of `value` within the subarray `arr[left..right]` (inclusive).

## Approach

Precompute, for every distinct value in `arr`, a sorted list of the indices where it occurs (built by scanning the array once — indices are naturally added in increasing order). For a query, look up the index list for `value` (if it doesn't occur at all, the answer is `0`), then binary search for the count of indices falling within `[left, right]`: this equals `upperBound(right) - lowerBound(left)`.

## C# Solution

```csharp
public class RangeFreqQuery
{
    private readonly Dictionary<int, List<int>> indicesByValue = new();

    public RangeFreqQuery(int[] arr)
    {
        for (int i = 0; i < arr.Length; i++)
        {
            if (!indicesByValue.TryGetValue(arr[i], out var list))
            {
                list = new List<int>();
                indicesByValue[arr[i]] = list;
            }
            list.Add(i);
        }
    }

    public int Query(int left, int right, int value)
    {
        if (!indicesByValue.TryGetValue(value, out var indices)) return 0;

        int lower = LowerBound(indices, left);
        int upper = UpperBound(indices, right);
        return upper - lower;
    }

    private int LowerBound(List<int> indices, int target)
    {
        int lo = 0, hi = indices.Count;
        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (indices[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }

    private int UpperBound(List<int> indices, int target)
    {
        int lo = 0, hi = indices.Count;
        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (indices[mid] <= target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}
```

## Complexity

- **Time:** `O(n)` to build; `O(log n)` per query.
- **Space:** `O(n)` for the index lists.
