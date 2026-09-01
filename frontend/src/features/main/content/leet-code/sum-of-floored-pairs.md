# 1862. Sum of Floored Pairs

**Difficulty:** Hard
**Category:** Array, Math, Prefix Sum

## Problem

Given an integer array `nums`, return the sum of `floor(nums[i] / nums[j])` over every pair of indices `i, j` (including `i == j`), modulo `1e9 + 7`.

### Example

```
Input: nums = [2,5,9]
Output: 10
```

## Approach

Build a frequency array `count[v]` for each distinct value and its prefix sum. For every distinct divisor value `d` that actually appears, walk through multiples of `d` (`d, 2d, 3d, ...`) up to the maximum value; for the range `[k*d, (k+1)*d - 1]`, every number in `nums` that falls in that range contributes exactly `k` when divided by `d` and floored. Using the prefix sum to count how many numbers land in each such range, accumulate `count[d] * k * (numbers in range)` into the total. Iterating this way over all divisors and their multiples runs in harmonic-series time.

## C# Solution

```csharp
public class Solution
{
    public int SumOfFlooredPairs(int[] nums)
    {
        const int Mod = 1_000_000_007;
        int maxVal = nums.Max();
        var count = new int[maxVal + 1];
        foreach (int n in nums) count[n]++;

        var prefix = new int[maxVal + 2];
        for (int i = 1; i <= maxVal; i++) prefix[i] = prefix[i - 1] + count[i];

        long total = 0;

        for (int d = 1; d <= maxVal; d++)
        {
            if (count[d] == 0) continue;

            long multiplier = 1;
            for (int low = d; low <= maxVal; low += d, multiplier++)
            {
                int high = Math.Min(low + d - 1, maxVal);
                long inRange = prefix[high] - prefix[low - 1];
                total = (total + (long)count[d] * multiplier % Mod * inRange) % Mod;
            }
        }

        return (int)total;
    }
}
```

## Complexity

- **Time:** `O(maxVal log maxVal)` from the harmonic sum over divisors and their multiples.
- **Space:** `O(maxVal)` for the count and prefix arrays.
