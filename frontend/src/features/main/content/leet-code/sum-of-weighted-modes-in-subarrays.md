# 3672. Sum of Weighted Modes in Subarrays

**Difficulty:** Hard
**Category:** Array, Sliding Window, Hash Table
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given an integer array `nums` and an integer `k`. For every contiguous subarray of length `k`, define its **weighted mode** as `value * frequency`, where `value` is the element that occurs most frequently in that window (ties are broken by choosing the smallest value).

Return the sum of the weighted modes over all subarrays of length `k`.

## Approach
Slide a window of length `k` across the array. For each window, rebuild the frequency count of every element inside it and track the current mode: a new value becomes the mode if it strictly exceeds the current best frequency, or ties the best frequency with a smaller value.

Because the mode and its frequency are only known once the whole window has been scanned, this approach recomputes frequencies for every window rather than incrementally updating between windows, trading efficiency for a simple and clearly correct implementation.

## C# Solution

```csharp
public class Solution
{
    public long SumWeightedModes(int[] nums, int k)
    {
        long total = 0;
        int n = nums.Length;
        var freq = new Dictionary<int, int>();

        for (int start = 0; start + k <= n; start++)
        {
            freq.Clear();
            int modeValue = int.MaxValue;
            int modeFreq = 0;

            for (int i = start; i < start + k; i++)
            {
                freq.TryGetValue(nums[i], out int c);
                c++;
                freq[nums[i]] = c;

                if (c > modeFreq || (c == modeFreq && nums[i] < modeValue))
                {
                    modeFreq = c;
                    modeValue = nums[i];
                }
            }

            total += (long)modeValue * modeFreq;
        }

        return total;
    }
}
```

## Complexity

- **Time:** O(n * k)
- **Space:** O(k)
