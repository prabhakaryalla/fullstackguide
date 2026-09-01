# 1387. Sort Integers by The Power Value

**Difficulty:** Medium
**Category:** Sorting, Memoization

## Problem

The power of an integer `x` is the number of Collatz-style steps (`x/2` if even, `3x+1` if odd) needed to reach `1`. Given `lo`, `hi`, and `k`, return the `k`-th smallest integer in `[lo, hi]` sorted by power value, breaking ties by numeric value.

### Example

```
Input: lo = 12, hi = 15, k = 2
Output: 13
```

## Approach

Compute the power (step count) of every integer in `[lo, hi]` using memoized recursion, since many values share sub-chains. Sort the range by power ascending, breaking ties by value, and return the `k`-th entry.

## C# Solution

```csharp
public class Solution
{
    private readonly Dictionary<long, int> memo = new();

    public int GetKth(int lo, int hi, int k)
    {
        var values = Enumerable.Range(lo, hi - lo + 1)
            .OrderBy(x => Power(x))
            .ThenBy(x => x)
            .ToArray();

        return values[k - 1];
    }

    private int Power(long x)
    {
        if (x == 1) return 0;
        if (memo.TryGetValue(x, out int cached)) return cached;

        int steps = 1 + (x % 2 == 0 ? Power(x / 2) : Power(3 * x + 1));
        memo[x] = steps;
        return steps;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sort, with memoized power computation.
- **Space:** `O(n)` for the memo table.
