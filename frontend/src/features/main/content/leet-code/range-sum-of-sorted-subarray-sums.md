# 1508. Range Sum of Sorted Subarray Sums

**Difficulty:** Medium
**Category:** Array, Sorting

## Problem

Given an array `nums` of `n` positive integers, compute the sums of all `n * (n + 1) / 2` non-empty subarrays, sort those sums, and return the sum of the sums between indices `left` and `right` (1-indexed), modulo `10^9 + 7`.

### Example

```
Input: nums = [1,2,3,4], n = 4, left = 1, right = 5
Output: 13
```

## Approach

Since `n` is small (at most 1000), it's acceptable to generate all `O(n^2)` subarray sums directly, sort them, and sum the requested 1-indexed range with modulo arithmetic.

## C# Solution

```csharp
public class Solution
{
    public int RangeSum(int[] nums, int n, int left, int right)
    {
        const int Mod = 1_000_000_007;
        var sums = new List<long>();

        for (int i = 0; i < n; i++)
        {
            long running = 0;
            for (int j = i; j < n; j++)
            {
                running += nums[j];
                sums.Add(running);
            }
        }

        sums.Sort();

        long total = 0;
        for (int i = left - 1; i <= right - 1; i++)
        {
            total = (total + sums[i]) % Mod;
        }

        return (int)total;
    }
}
```

## Complexity

- **Time:** `O(n^2 log n)` — generating `O(n^2)` sums and sorting them.
- **Space:** `O(n^2)` for the list of subarray sums.
