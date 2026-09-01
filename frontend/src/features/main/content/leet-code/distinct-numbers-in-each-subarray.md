# 1852. Distinct Numbers in Each Subarray

**Difficulty:** Medium
**Category:** Array, Hash Table, Sliding Window

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array `nums` and an integer `k`, return an array where the `i`-th element is the number of distinct values in the window `nums[i..i+k-1]`, for every valid window.

### Example

```
Input: nums = [1,2,3,2,2,1,3], k = 3
Output: [3,2,2,2,3]
```

## Approach

Slide a window of size `k` across the array while maintaining a frequency map of the values currently inside it. As the window advances, increment the count for the newly included value and decrement (removing the key entirely once it hits zero) the count for the value that just fell out of the window. Once the window reaches size `k`, the number of keys in the map is the distinct count for that window.

## C# Solution

```csharp
public class Solution
{
    public int[] DistinctNumbers(int[] nums, int k)
    {
        var freq = new Dictionary<int, int>();
        var result = new int[nums.Length - k + 1];

        for (int i = 0; i < nums.Length; i++)
        {
            freq[nums[i]] = freq.GetValueOrDefault(nums[i]) + 1;

            if (i >= k)
            {
                int outVal = nums[i - k];
                freq[outVal]--;
                if (freq[outVal] == 0) freq.Remove(outVal);
            }

            if (i >= k - 1) result[i - k + 1] = freq.Count;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(k)` for the sliding-window frequency map.
