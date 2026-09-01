# 528. Random Pick with Weight

**Difficulty:** Medium
**Category:** Array, Math, Binary Search, Randomization, Prefix Sum

## Problem

Given an array of positive integers `w` where `w[i]` describes the weight of index `i`, implement `PickIndex()` that randomly picks an index in proportion to its weight.

### Example

```
Input:
["Solution", "pickIndex"]
[[[1, 3]], []]
Output:
[null, 1] (index 1 is picked with probability 3/4)
```

### Constraints

- `1 <= w.length <= 10^4`
- `1 <= w[i] <= 10^5`
- At most `10^4` calls will be made to `PickIndex`.

## Approach

Precompute a prefix sum of weights, so the cumulative weight up to each index defines a contiguous range proportional to that index's weight. To pick, generate a uniformly random integer within the total weight, then binary search the prefix sums for the first index whose cumulative weight covers that random value.

## C# Solution

```csharp
public class Solution
{
    private readonly int[] prefixSums;
    private readonly Random random = new();

    public Solution(int[] w)
    {
        prefixSums = new int[w.Length];
        int sum = 0;

        for (int i = 0; i < w.Length; i++)
        {
            sum += w[i];
            prefixSums[i] = sum;
        }
    }

    public int PickIndex()
    {
        int target = random.Next(prefixSums[^1]) + 1;
        return LowerBound(target);
    }

    private int LowerBound(int target)
    {
        int lo = 0, hi = prefixSums.Length;
        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (prefixSums[mid] < target) lo = mid + 1;
            else hi = mid;
        }

        return lo;
    }
}
```

## Complexity

- **Time:** `O(n)` construction, `O(log n)` per `PickIndex` call.
- **Space:** `O(n)` for the prefix sums.
