# 1838. Frequency of the Most Frequent Element

**Difficulty:** Medium
**Category:** Array, Binary Search, Sliding Window, Sorting, Greedy

## Problem

Given an array `nums` and an integer `k`, you may increment any element by `1` up to a total of `k` increments across all operations. Return the maximum possible frequency of any single value achievable this way.

### Example

```
Input: nums = [1,2,4], k = 5
Output: 3
Explanation: Increment nums[0] three times and nums[1] twice to get [4,4,4].
```

## Approach

Sort the array. Use a sliding window `[left, right]`: to make every element in the window equal to `nums[right]` (the largest in the window), the total cost is `nums[right] * windowSize - sum(window)`. Expand `right` one step at a time, adding to the running sum; while the cost exceeds `k`, shrink from the left (removing `nums[left]` from the sum and advancing `left`). Track the maximum window size seen — since costs only need to be non-increasing as we shrink and the window never needs to shrink below its best-so-far length, the loop runs in linear amortized time.

## C# Solution

```csharp
public class Solution
{
    public int MaxFrequency(int[] nums, int k)
    {
        Array.Sort(nums);
        long sum = 0;
        int left = 0;
        int best = 1;

        for (int right = 0; right < nums.Length; right++)
        {
            sum += nums[right];

            while ((long)nums[right] * (right - left + 1) - sum > k)
            {
                sum -= nums[left];
                left++;
            }

            best = Math.Max(best, right - left + 1);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sort plus a linear sliding-window pass.
- **Space:** `O(1)` extra.
