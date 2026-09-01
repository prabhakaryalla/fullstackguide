# 1231. Divide Chocolate

**Difficulty:** Hard
**Category:** Array, Binary Search
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array `sweetness` describing consecutive chunks of a chocolate bar, cut it into `k + 1` contiguous pieces (using `k` cuts) to share among `k + 1` people. Maximize the minimum total sweetness among the pieces, and return that maximum-minimum value.

### Example

```
Input: sweetness = [1,2,3,4,5,6,7,8,9], k = 5
Output: 6
```

## Approach

Binary search on the candidate minimum sweetness value `x`, between the smallest chunk's sweetness and the average total sweetness. For a given `x`, greedily scan the bar left to right, cutting a new piece as soon as the accumulated sweetness reaches `x`; this maximizes the number of pieces achievable for that minimum. If the resulting piece count is at least `k + 1`, `x` is achievable, so search higher; otherwise search lower.

## C# Solution

```csharp
public class Solution
{
    public int MaximizeSweetness(int[] sweetness, int k)
    {
        int lo = sweetness.Min();
        int hi = sweetness.Sum() / (k + 1);

        while (lo < hi)
        {
            int mid = lo + (hi - lo + 1) / 2;
            if (CanDivide(sweetness, k, mid)) lo = mid;
            else hi = mid - 1;
        }

        return lo;
    }

    private bool CanDivide(int[] sweetness, int k, int minSweetness)
    {
        int pieces = 0, current = 0;

        foreach (int s in sweetness)
        {
            current += s;
            if (current >= minSweetness)
            {
                pieces++;
                current = 0;
            }
        }

        return pieces >= k + 1;
    }
}
```

## Complexity

- **Time:** `O(n log(sum / n))`, where `n` is the number of chunks.
- **Space:** `O(1)`.
