# 3795. Minimum Subarray Length With Distinct Sum At Least K

**Difficulty:** Medium
**Category:** Array, Hash Table, Sliding Window

## Problem

Given an integer array `nums` and integer `k`, return the minimum length of a subarray whose sum of values that occur **exactly once** within it is at least `k`. If no such subarray exists, return `-1`.

### Example

Input: `nums = [2,2,3,1], k = 4`
Output: `2`

The subarray `[2,3]` has the value `2` and `3` each occurring once, summing to `5 >= 4`.

## Approach

Use a sliding window with a frequency map and a running `uniqueSum` (sum of values whose current window frequency is exactly 1). Expand the right pointer, updating `uniqueSum` whenever a frequency transitions to/from 1. Whenever `uniqueSum >= k`, shrink from the left (updating `uniqueSum` similarly) while tracking the minimum window length.

## C# Solution

```csharp
public class Solution 
{
    public int MinSubarrayLength(int[] nums, int k) 
    {
        var freq = new Dictionary<int, int>();
        long uniqueSum = 0;
        int left = 0;
        int minLen = int.MaxValue;

        for (int right = 0; right < nums.Length; right++)
        {
            int v = nums[right];
            freq.TryGetValue(v, out int f);
            f++;
            freq[v] = f;
            if (f == 1) uniqueSum += v;
            else if (f == 2) uniqueSum -= v;

            while (uniqueSum >= k)
            {
                minLen = Math.Min(minLen, right - left + 1);
                int lv = nums[left];
                int lf = freq[lv];
                if (lf == 1) uniqueSum -= lv;
                else if (lf == 2) uniqueSum += lv;
                freq[lv] = lf - 1;
                left++;
            }
        }
        return minLen == int.MaxValue ? -1 : minLen;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
