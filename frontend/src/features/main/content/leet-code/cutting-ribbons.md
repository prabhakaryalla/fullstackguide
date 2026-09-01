# 1891. Cutting Ribbons

**Difficulty:** Medium
**Category:** Array, Binary Search, Greedy

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given ribbon lengths `ribbons[i]` and an integer `k`, you may cut each ribbon into any number of equal-length integer pieces (or leave it uncut) and discard leftovers. Return the maximum possible piece length such that at least `k` pieces of that length can be obtained in total, or `0` if impossible.

### Example

```
Input: ribbons = [9,7,5], k = 3
Output: 5
```

## Approach

Binary search the answer length between `1` and the longest ribbon. For a candidate length, the number of usable pieces from ribbon `r` is `r / length` (integer division); summing this across all ribbons and checking whether the total reaches `k` gives a monotonic feasibility test, so binary search finds the maximum feasible length.

## C# Solution

```csharp
public class Solution
{
    public int MaxLength(int[] ribbons, int k)
    {
        int lo = 1, hi = ribbons.Max();
        int best = 0;

        while (lo <= hi)
        {
            int mid = lo + (hi - lo) / 2;
            long pieces = 0;
            foreach (int r in ribbons) pieces += r / mid;

            if (pieces >= k)
            {
                best = mid;
                lo = mid + 1;
            }
            else
            {
                hi = mid - 1;
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n log(maxLength))`.
- **Space:** `O(1)`.
