# 1713. Minimum Operations to Make a Subsequence

**Difficulty:** Hard
**Category:** Array, Binary Search, Greedy

## Problem

Given an array `target` of distinct integers and an array `arr`, in one operation you may insert any integer anywhere into `arr`. Return the minimum number of operations needed to make `target` a subsequence of `arr`.

### Example

```
Input: target = [5,1,3], arr = [9,4,2,3,4]
Output: 2
```

## Approach

Map each value in `target` to its index. Filter `arr` to the values that appear in `target`, replacing each by its target index; the longest strictly increasing subsequence of this mapped sequence represents the longest run of `target` elements already in the correct relative order inside `arr`. The answer is `target.Length` minus that length, computed with the standard O(n log n) patience-sorting technique.

## C# Solution

```csharp
public class Solution
{
    public int MinOperations(int[] target, int[] arr)
    {
        var indexOf = new Dictionary<int, int>();
        for (int i = 0; i < target.Length; i++) indexOf[target[i]] = i;

        var tails = new List<int>();
        foreach (int x in arr)
        {
            if (!indexOf.TryGetValue(x, out int mapped)) continue;

            int pos = tails.BinarySearch(mapped);
            if (pos < 0) pos = ~pos;
            if (pos == tails.Count) tails.Add(mapped);
            else tails[pos] = mapped;
        }

        return target.Length - tails.Count;
    }
}
```

## Complexity

- **Time:** `O((n + m) log n)` where `n = target.Length`, `m = arr.Length`.
- **Space:** `O(n)`.
