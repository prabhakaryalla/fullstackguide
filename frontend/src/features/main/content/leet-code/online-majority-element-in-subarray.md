# 1157. Online Majority Element In Subarray

**Difficulty:** Hard
**Category:** Array, Binary Search, Design, Segment Tree, Randomized Algorithm

## Problem

Design a `MajorityChecker` class that, given an array, supports repeated queries `Query(left, right, threshold)` asking for an element that appears strictly more than `threshold` times within `arr[left..right]`. Return `-1` if no such element exists.

### Example

```
Input:
["MajorityChecker","query","query","query"]
[[[1,1,2,2,1,1]],[0,5,4],[0,3,3],[2,3,2]]
Output:
[null,1,-1,2]
```

## Approach

Precompute a sorted list of indices for every distinct value in the array. For each query, repeatedly pick a uniformly random index within `[left, right]` and check the actual element there. Since any element satisfying `count > threshold` occupies more than half of a large-enough fraction of the range, random sampling combined with a binary search on that value's index list (to count how many of its occurrences fall inside `[left, right]`) finds a valid answer with very high probability within a handful of attempts; if none of the sampled attempts succeed, return `-1`.

## C# Solution

```csharp
public class MajorityChecker
{
    private readonly int[] arr;
    private readonly Dictionary<int, List<int>> positions = new();
    private readonly Random random = new();

    public MajorityChecker(int[] arr)
    {
        this.arr = arr;
        for (int i = 0; i < arr.Length; i++)
        {
            if (!positions.TryGetValue(arr[i], out var list))
            {
                list = new List<int>();
                positions[arr[i]] = list;
            }
            list.Add(i);
        }
    }

    public int Query(int left, int right, int threshold)
    {
        int length = right - left + 1;

        for (int attempt = 0; attempt < 20; attempt++)
        {
            int candidate = arr[left + random.Next(length)];
            var list = positions[candidate];

            int lo = LowerBound(list, left);
            int hi = UpperBound(list, right);
            int count = hi - lo;

            if (count >= threshold) return candidate;
        }

        return -1;
    }

    private int LowerBound(List<int> list, int value)
    {
        int lo = 0, hi = list.Count;
        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (list[mid] < value) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }

    private int UpperBound(List<int> list, int value)
    {
        int lo = 0, hi = list.Count;
        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (list[mid] <= value) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}
```

## Complexity

- **Time:** `O(log n)` expected per query.
- **Space:** `O(n)` for the position lists.
