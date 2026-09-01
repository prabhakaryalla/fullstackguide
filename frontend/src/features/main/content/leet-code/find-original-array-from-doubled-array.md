# 2007. Find Original Array From Doubled Array

**Difficulty:** Medium
**Category:** Array, Hash Table, Greedy, Sorting

## Problem

An integer array `original` is transformed into a `changed` array by appending `2 * x` for every `x` in `original`, then shuffling the combined array. Given `changed`, return `original` if it is possible to recover it; otherwise return an empty array. There may be repeated values in `changed`.

### Example

```
Input: changed = [1,3,4,2,6,8]
Output: [1,3,4]
Explanation: One possible original array is [1,3,4]:
- 1 doubled is 2.
- 3 doubled is 6.
- 4 doubled is 8.
Combining these together gives [1,3,4,2,6,8], which matches changed after shuffling.
```

## Approach

If `changed.Length` is odd, it can never be split into value/double pairs, so return an empty array immediately.

Count occurrences of every value in `changed` using a sorted map (so we can iterate values in ascending order). Process values from smallest to largest:
- If the value is `0`, its occurrences must pair up among themselves (0 doubled is 0); an odd count of zeros makes the array invalid.
- Otherwise, for value `x` with count `c`, there must be at least `c` copies of `2x` remaining; consume `c` from both buckets and append `x` to the result `c` times.

Processing in ascending order guarantees that when we reach a value, it hasn't already been "used up" as someone else's double, and any deductions we make from `2x`'s bucket are correctly reflected before that bucket is processed in its own turn.

## C# Solution

```csharp
public class Solution
{
    public int[] FindOriginalArray(int[] changed)
    {
        int n = changed.Length;
        if (n % 2 != 0) return Array.Empty<int>();

        var count = new SortedDictionary<int, int>();
        foreach (var num in changed)
            count[num] = count.GetValueOrDefault(num) + 1;

        var result = new List<int>();
        foreach (var key in new List<int>(count.Keys))
        {
            if (!count.TryGetValue(key, out var c) || c == 0) continue;

            if (key == 0)
            {
                if (c % 2 != 0) return Array.Empty<int>();
                result.AddRange(Enumerable.Repeat(0, c / 2));
                count[key] = 0;
                continue;
            }

            int doubleKey = key * 2;
            if (!count.TryGetValue(doubleKey, out var dc) || dc < c)
                return Array.Empty<int>();

            count[doubleKey] = dc - c;
            result.AddRange(Enumerable.Repeat(key, c));
            count[key] = 0;
        }

        return result.Count == n / 2 ? result.ToArray() : Array.Empty<int>();
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sorted map operations.
- **Space:** `O(n)` for the map and result array.
