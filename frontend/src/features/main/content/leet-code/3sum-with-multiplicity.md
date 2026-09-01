# 923. 3Sum With Multiplicity

**Difficulty:** Medium
**Category:** Array, Hash Table, Two Pointers, Sorting, Counting

## Problem

Given an integer array `arr` and an integer `target`, return the number of index triples `i < j < k` such that `arr[i] + arr[j] + arr[k] == target`, modulo `10^9 + 7`.

### Example

```
Input: arr = [1,1,2,2,3,3,4,4,5,5], target = 8
Output: 20
```

## Approach

Count occurrences of every value. For every pair of distinct values `(x, y)` with `x <= y`, the required third value `z = target - x - y` is determined; combine counts combinatorially depending on whether `x == y == z`, `x == y != z`, or `x < y < z`, to avoid over/under counting.

## C# Solution

```csharp
public class Solution
{
    public int ThreeSumMulti(int[] arr, int target)
    {
        const long MOD = 1_000_000_007;
        var count = new Dictionary<int, long>();
        foreach (var a in arr) count[a] = count.GetValueOrDefault(a) + 1;

        var keys = count.Keys.ToList();
        long result = 0;

        for (int i = 0; i < keys.Count; i++)
        {
            int x = keys[i];
            for (int j = i; j < keys.Count; j++)
            {
                int y = keys[j];
                int z = target - x - y;
                if (z < y || !count.ContainsKey(z)) continue;

                if (x == y && y == z)
                    result += count[x] * (count[x] - 1) * (count[x] - 2) / 6;
                else if (x == y)
                    result += count[x] * (count[x] - 1) / 2 * count[z];
                else if (y < z)
                    result += count[x] * count[y] * count[z];
            }
        }

        return (int)(result % MOD);
    }
}
```

## Complexity

- **Time:** `O(d^2)` where `d` is the number of distinct values.
- **Space:** `O(d)`.
