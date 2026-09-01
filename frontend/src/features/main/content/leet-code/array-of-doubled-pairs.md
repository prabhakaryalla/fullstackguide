# 954. Array of Doubled Pairs

**Difficulty:** Medium
**Category:** Array, Hash Table, Greedy, Sorting

## Problem

Given an integer array `arr` of even length, return `true` if it's possible to reorder it so that `arr[2*i+1] == 2 * arr[2*i]` for every `i`.

### Example

```
Input: arr = [4,-2,2,-4]
Output: true
```

## Approach

Count occurrences of each value. Process values in order of increasing absolute value — this guarantees that when handling a value `x`, any smaller-magnitude value it could pair with as a "double" has already been resolved. For each unresolved `x`, its partner `2x` must have at least as many remaining occurrences; consume matching counts from both, or fail immediately if insufficient.

## C# Solution

```csharp
public class Solution
{
    public bool CanReorderDoubled(int[] arr)
    {
        var count = new Dictionary<int, int>();
        foreach (var a in arr) count[a] = count.GetValueOrDefault(a) + 1;

        var keys = count.Keys.OrderBy(Math.Abs).ToList();

        foreach (var x in keys)
        {
            if (count[x] == 0) continue;
            if (count.GetValueOrDefault(2 * x) < count[x]) return false;

            count[2 * x] -= count[x];
            count[x] = 0;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for sorting distinct values.
- **Space:** `O(n)`.
